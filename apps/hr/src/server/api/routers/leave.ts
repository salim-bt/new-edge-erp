import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const leaveRouter = createTRPCRouter({
  getAllLeaves: publicProcedure.query(({ ctx }) => {
    return ctx.db.leave.findMany();
  }),
  applyLeave: publicProcedure
      .input(z.object({
        startDate: z.string(),
        endDate: z.string(),
        reason: z.string(),
        leaveTypeId: z.string(),
        staffId: z.string(),
      }))
      .mutation(({ ctx, input }) => {
          // @ts-ignore
        return ctx.db.leave.create({
          data: {
            from: input.startDate,
            to: input.endDate,
            reason: input.reason,
            LeaveType:{
                connect: {
                    id: input.leaveTypeId,
                },
            },
            Staff:{
                connect: {
                    id: input.staffId,
                },
            },
          }},
        );
      }),
  approveLeave: publicProcedure
      .input(z.object({
        id: z.string(),
      }))
      .mutation(({ ctx, input }) => {
        // @ts-ignore
        return ctx.db.leave.update({
          where: {
            id: input.id,
          },
          data: {
            status: "APPROVED",
          }},
        );
      }),
  rejectLeave: publicProcedure
      .input(z.object({
        id: z.string(),
      }))
      .mutation(({ ctx, input }) => {
        // @ts-ignore
        return ctx.db.leave.update({
          where: {
            id: input.id,
          },
          data: {
            status: "REJECTED",
          }},
        );
      }),
    getAllLeavesByStaffId: publicProcedure
        .input(z.object({
            id: z.string(),
        }))
        .query(({ ctx, input }) => {
            // @ts-ignore
            return ctx.db.leave.findMany({
                // get leaves with staffId
                where: {
                    Staff:{
                        id: input.id,
                    },
                },
            });
        }),
});

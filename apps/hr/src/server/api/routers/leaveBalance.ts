import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const leaveBalanceRouter = createTRPCRouter({
    assignLeaveBalance:publicProcedure
        .input(z.object({
            staffId: z.string(),
            leaveTypeId: z.string(),
            balance: z.number(),
        }))
        .mutation(({ ctx, input }) => {
            // @ts-ignore
            return ctx.db.leaveBalance.create({
                data: {
                    leaveBalance: input.balance,
                    Staff:{
                        connect: {
                            id: input.staffId,
                        },
                    },
                    LeaveType:{
                        connect: {
                            id: input.leaveTypeId,
                        },
                    },
                }},
            );
        }),
    getAllLeaveBalancesByStaffId: publicProcedure
        .input(z.object({
            staffId: z.string(),
        }))
        .query(({ ctx, input }) => {
            // @ts-ignore
            return ctx.db.leaveBalance.findMany({
                // where staffId = input.staffId and status is ONGOING
                where: {
                    Staff:{
                        id: input.staffId,
                    },
                    status: "ONGOING",
                },
            });
        }),
});

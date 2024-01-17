import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const leaveSchema = z.object({
    userId: z.string(),
    leaveTypeId: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    reason: z.string(),
    files: z.array(z.string()),
});

export const leaveRouter = createTRPCRouter({
    applyLeave: protectedProcedure
        .input(leaveSchema)
        .mutation(async ({ ctx, input }) => {
            const { userId, leaveTypeId, startDate, endDate, reason, files } = input;
            console.log(input);
            const {db} = ctx;

            return await db.leave.create({
                data: {
                    userId,
                    leaveTypeId,
                    startDate,
                    endDate,
                    reason,
                    attachments:files
                }
            });
        }),
    getLeaveTypes: publicProcedure
        .query(async ({ ctx }) => {
            const {db} = ctx;
            return db.leaveType.findMany();
        }),
    getLeaves: protectedProcedure
        .query(async ({ ctx }) => {
            const {db} = ctx;
            return db.leave.findMany();
        }),
    getLeaveByUserId: protectedProcedure
    .input(z.object({
        userId: z.string().uuid(),
        }))    
    .query(async ({ ctx, input }) => {
            const {db} = ctx;
            const {userId} = input;
            return db.leave.findMany(
                {
                    where:{
                        userId
                    }
                }
            );
        }),
    
});
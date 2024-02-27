import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const leaveSchema = z.object({
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
            const { leaveTypeId, startDate, endDate, reason, files } = input;
            const userId = ctx.session.user.id;
            console.log(input);
            const {db} = ctx;

            return await db.leave.create({
                data: {
                    userId,
                    leaveTypeId,
                    startDate,
                    // @ts-expect-error -- TSCONVERSION
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
    .query(async ({ ctx }) => {
            const {db} = ctx;
            const userId = ctx.session.user.id;
            return db.leave.findMany(
                {
                    where:{
                        userId
                    },
                    orderBy:{
                        createdAt:'asc'
                    }
                }
            )
        }),
    getActiveLeaves: protectedProcedure
    .query(async ({ ctx }) => {
            const {db} = ctx;
            const {user} = ctx.session;
            return db.leave.findMany(
                {
                    where:{
                        userId:user.id,
                        status: {
                            in: ['PENDING', 'APPROVED']
                        }
                    },
                    select:{
                        id:true,
                        startDate:true,
                        endDate:true,
                        reason:true,
                        status:true,
                        createdAt:true,
                        userId:true,
                        leaveType:{
                            select:{
                                name:true
                            }
                        },
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                }
            );
        }),
    getArchivedLeaves: protectedProcedure
    .query(async ({ ctx }) => {
            const {db} = ctx;
            const {user} = ctx.session;
            return db.leave.findMany(
                {
                    where:{
                        userId:user.id,
                        status: {
                            in: ['REJECTED', 'COMPLETED']
                        }
                    },
                    select:{
                        id:true,
                        startDate:true,
                        endDate:true,
                        reason:true,
                        status:true,
                        createdAt:true,
                        userId:true,
                        leaveType:{
                            select:{
                                name:true
                            }
                        },
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                }
            );
        }),
    getPendingLeaves: protectedProcedure
    .query(async ({ ctx }) => {
            const {db} = ctx;
            return db.leave.findMany(
                {
                    where:{
                        status: {
                            in: ['PENDING']
                        }
                    },
                    orderBy:{
                        createdAt:'desc'
                    },
                    select:{
                        id:true,
                        startDate:true,
                        endDate:true,
                        reason:true,
                        status:true,
                        createdAt:true,
                        userId:true,
                        leaveType:{
                            select:{
                                name:true
                            }
                        },
                    }
                }
            );
        }),
    approveLeave: protectedProcedure
    .input(z.object({
        leaveId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
            const {db} = ctx;
            const { leaveId } = input;
            return db.leave.update({
                where:{
                    id:leaveId
                },
                data:{
                    status:'APPROVED'
                }
            });
        }),
    rejectLeave: protectedProcedure
    .input(z.object({
        leaveId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
            const {db} = ctx;
            const { leaveId } = input;
            return db.leave.update({
                where:{
                    id:leaveId
                },
                data:{
                    status:'REJECTED'
                }
            });
        }),
});

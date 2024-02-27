import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const leaveTypeSchema = z.object({
    name: z.string(),
    allowedDays: z.number(),
    description: z.string(),
});

export const leaveTypeRouter = createTRPCRouter({
    createLeaveType: protectedProcedure
        .input(leaveTypeSchema)
        .mutation(async ({ ctx, input }) => {
            const { name, allowedDays, description } = input;
            const {db} = ctx;
            return db.leaveType.create({
                data:{
                    name,
                    allowedDays,
                    description
                }
            });
        }),
    getLeaveTypes: publicProcedure
        .query(async ({ ctx }) => {
            const {db} = ctx;
            return db.leaveType.findMany();
        }),
    getLeaveTypeById: protectedProcedure
        .input(z.object({
            leaveTypeId: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            const { leaveTypeId } = input;
            const {db} = ctx;
            return db.leaveType.findUnique({
                where:{
                    id:leaveTypeId
                }
            });
        }),
    updateLeaveType: protectedProcedure
        .input(leaveTypeSchema)
        .mutation(async ({ ctx, input }) => {
            const { name, allowedDays, description } = input;
            const {db} = ctx;
            return db.leaveType.update({
                where:{
                    name
                },
                data:{
                    allowedDays,
                    description
                }
            });
        }),
    deleteLeaveType: protectedProcedure
        .input(z.object({
            leaveTypeId: z.string().uuid(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { leaveTypeId } = input;
            const {db} = ctx;
            return db.leaveType.delete({
                where:{
                    id:leaveTypeId
                }
            });
        }),
});
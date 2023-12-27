import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const leaveTypeRouter = createTRPCRouter({
    createLeaveType:publicProcedure
        .input(z.object({
            name: z.string(),
            description: z.string(),
        }))
        .mutation(({ ctx, input }) => {
            // @ts-ignore
            return ctx.db.leaveType.create({
                data: {
                    name: input.name,
                    description: input.description,
                }},
            );
        }),
    getAllLeaveTypes: publicProcedure.query(({ ctx }) => {
        return ctx.db.leaveType.findMany();
    }),
    getLeaveTypeById: publicProcedure
        .input(z.object({
            id: z.string(),
        }))
        .query(({ ctx, input }) => {
            // @ts-ignore
            return ctx.db.leaveType.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),
    updateLeaveType: publicProcedure
        .input(z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
        }))
        .mutation(({ ctx, input }) => {
            // @ts-ignore
            return ctx.db.leaveType.update({
                where: {
                    id: input.id,
                },
                data: {
                    name: input.name,
                    description: input.description,
                }},
            );
        }),
    deleteLeaveType: publicProcedure
        .input(z.object({
            id: z.string(),
        }))
        .mutation(({ ctx, input }) => {
            // @ts-ignore
            return ctx.db.leaveType.delete({
                where: {
                    id: input.id,
                }},
            );
        }),

});

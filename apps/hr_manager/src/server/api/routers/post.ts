import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({
            fname: z.string().min(1),
            lname: z.string().min(1),
            mname: z.string().min(1),
            email: z.string().email(),
            cid: z.string().min(1),
            address: z.string().min(1),
            phone_number: z.string().min(1),
            joining_date: z.string().min(1),
            dob: z.string().min(1),

        }))
        .mutation(async ({ ctx, input }) => {

            return ctx.db.staff.create({
                data: {
                    first_name: input.fname,
                    last_name: input.lname,
                    middle_name: input.mname,
                    password: "123456",
                    email: input.email,
                    cid: input.cid,
                    address: input.address,
                    phone_number: input.phone_number,
                    joining_date: input.joining_date,
                    dob: input.dob,
                },
            });
        }),

    update: publicProcedure
        .input(z.object({
            id: z.number(),
            fname: z.string().min(1),
            lname: z.string().min(1),
            mname: z.string().min(1),
            email: z.string().email(),
            cid: z.string().min(1),
            address: z.string().min(1),
            phone_number: z.string().min(1),
            joining_date: z.string().min(1),
            dob: z.string().min(1),
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.staff.update({
                where: {
                    staff_ID: input.id,
                },
                data: {
                    first_name: input.fname,
                    last_name: input.lname,
                    middle_name: input.mname,
                    email: input.email,
                    cid: input.cid,
                    address: input.address,
                    phone_number: input.phone_number,
                    joining_date: input.joining_date,
                    dob: input.dob,
                },
            });
        }),

});

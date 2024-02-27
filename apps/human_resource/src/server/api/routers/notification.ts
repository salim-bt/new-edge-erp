import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

const notificationSingleSchema = z.object({
    title: z.string(),
    description: z.string(),
    userId: z.string(),
});

const notificationRouter = createTRPCRouter({
    createNotification: protectedProcedure
        .input(notificationSingleSchema)
        .mutation(async ({ ctx, input }) => {
            const { title, description, userId } = input;
            const {db} = ctx;
            return db.notification.create({
                data:{
                    title,
                    description,
                    users:{
                        connect:{
                            id:userId
                        }
                    }
                }
            });
        }),
    getNotifications: protectedProcedure
        .query(async ({ ctx }) => {
            const {db} = ctx;
            const userId = ctx.session.user.id;
            return await db.notification.findMany(
                {
                    where:{
                        users:{
                            every:{
                                id:userId
                            }
                        }
                    }
                }
            );
        }),
    deleteNotification: protectedProcedure
        .input(z.object({
            notificationId: z.string().uuid(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { notificationId } = input;
            const userId = ctx.session.user.id;
            const {db} = ctx;
            return db.notification.delete({
                where:{
                    id:notificationId,
                    users:{
                        some:{
                            id:userId
                        }
                    }
                }
            });
        }),
    // create notification for all users
    createNotificationAll: protectedProcedure
        .input(notificationSingleSchema)
        .mutation(async ({ ctx, input }) => {
            const { title, description } = input;
            const {db} = ctx;
            return db.notification.create({
                data:{
                    title,
                    description,
                    users:{
                        connect:{
                            id:"*"
                        }
                    }
                }
            });
        }),
});

export {notificationRouter};
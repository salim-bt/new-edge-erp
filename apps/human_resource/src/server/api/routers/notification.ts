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
            return db.notification.findMany();
        }),
    getNotificationByUserId: protectedProcedure
        .input(z.object({
            userId: z.string().uuid(),
        }))
        .query(async ({ ctx, input }) => {
            const { userId } = input;
            const {db} = ctx;
            return db.notification.findMany({
                where:{
                    users:{
                        some:{
                            id:userId
                        }
                    }
                }
            });
        }),
    deleteNotification: protectedProcedure
        .input(z.object({
            notificationId: z.string().uuid(),
            userId: z.string().uuid(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { userId, notificationId } = input;
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

export default notificationRouter;
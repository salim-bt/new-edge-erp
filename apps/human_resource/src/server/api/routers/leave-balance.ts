import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

const leaveBalanceSchema = z.object({
  id: z.string().uuid(),
  balance: z.number(),
  userId: z.string(),
  leaveTypeId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const leaveBalanceRouter = createTRPCRouter({
  getLeaveBalance: protectedProcedure
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const userId = ctx.session.user.id;
      const data = await db.leaveBalance.findMany({
        where: {
          userId,
        },
      });
      console.log(data);
      return data;
    }),
  getLeaveBalanceById: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const { db } = ctx;
      return db.leaveBalance.findUnique({
        where: {
          id,
        },
      });
    }),
  getLeaveBalanceByLeaveTypeId: protectedProcedure
    .input(z.object({
      leaveTypeId: z.string().uuid(),
    }))
    .query(async ({ ctx, input }) => {
      const { leaveTypeId } = input;
      const { db } = ctx;
      return db.leaveBalance.findMany({
        where: {
          leaveTypeId,
        },
      });
    }),
  getLeaveBalanceByUserIdAndLeaveTypeId: protectedProcedure
    .input(z.object({
      userId: z.string().uuid(),
      leaveTypeId: z.string().uuid(),
    }))
    .query(async ({ ctx, input }) => {
      const { userId, leaveTypeId } = input;
      const { db } = ctx;
      return db.leaveBalance.findMany({
        where: {
          userId,
          leaveTypeId,
        },
      });
    }),
  createLeaveBalance: protectedProcedure
    .input(leaveBalanceSchema)
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { balance, userId, leaveTypeId } = input;
      return db.leaveBalance.create({
        data: {
          balance,
          userId,
          leaveTypeId,
        },
      });
    }),
  updateLeaveBalance: protectedProcedure
    .input(leaveBalanceSchema)
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const {id, balance, userId, leaveTypeId } = input;
      return db.leaveBalance.update({
        where: {
          id,
        },
        data: {
          balance,
          userId,
          leaveTypeId,
        },
      });
    }),
  deleteLeaveBalance: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { id } = input;
      return db.leaveBalance.delete({
        where: {
          id,
        },
      });
    }),
});

export { leaveBalanceRouter };
import { leaveRouter } from "@/server/api/routers/leave";
import { createTRPCRouter } from "@/server/api/trpc";
import {leaveTypeRouter} from "@/server/api/routers/leaveTypeRouter";
import {leaveBalanceRouter} from "@/server/api/routers/leaveBalance";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  leave: leaveRouter,
  leaveType: leaveTypeRouter,
  leaveBalance: leaveBalanceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

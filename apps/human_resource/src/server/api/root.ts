import { createTRPCRouter } from "@/server/api/trpc";
import { leaveRouter } from "./routers/leave";
import { leaveTypeRouter } from "./routers/leaveType";
import { leaveBalanceRouter } from "./routers/leave-balance";
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

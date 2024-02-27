/* eslint-disable @next/next/no-img-element */
"use client"
import { api } from "@/trpc/react";
import LeaveCard from "./leave-card";
import { CircleDashedIcon } from "lucide-react";

const ActiveLeaves = () => {
  const { data: leave, isFetching } = api.leave.getActiveLeaves.useQuery();

  return (
    <div className="mb-10 flex w-11/12 flex-col items-start justify-between rounded-lg p-5">
      <h1 className={"my-3 text-2xl"}>Active Leaves</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-8">
        {isFetching ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-900"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          leave?.map((leave) => <LeaveCard leave={leave} />)
        )}
      </div>
    </div>
  );
};

export default ActiveLeaves;

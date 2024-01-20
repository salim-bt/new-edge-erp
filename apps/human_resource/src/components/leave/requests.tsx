"use client";
import { api } from "@/trpc/react";
import React from "react";
import RequestCard from "./request-card";

function LeaveRequest() {
  const { data, isFetching } = api.leave.getPendingLeaves.useQuery();

  return isFetching ? (
    <div className="flex items-center justify-center my-10 w-full">
      <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-900"></div>
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <div className="mb-10 flex w-11/12 flex-col items-start justify-between rounded-lg p-5">
      <div className="grid grid-flow-cols grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
        {data?.map((leave) => (
          <RequestCard leave={leave} />
        ))}
      </div>
    </div>
  );
}

export default LeaveRequest;

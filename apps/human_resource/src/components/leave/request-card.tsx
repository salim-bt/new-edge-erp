"use client";
import { api } from "@/trpc/react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardTitle } from "../ui/card";

function RequestCard({
  leave,
}: {
  leave: {
    leaveType: {
      name: string;
    };
    status: string;
    startDate: Date;
    endDate: Date;
    reason: string;
    id: string;
    userId: string | null;
    createdAt: Date;
  };
}) {
  const approveLeave = api.leave.approveLeave.useMutation();
    const rejectLeave = api.leave.rejectLeave.useMutation();
  const {
    isSuccess: isApproved,
    isError: isApproveError,
    error: approveError,
  } = approveLeave;

  const {
    isSuccess: isRejected,
    isError: isRejectError,
    error: rejectError,
  } = rejectLeave;

  return (
    <Card
      key={leave.id}
      className="mb-10 flex flex-col items-start justify-between"
    >
        <CardHeader>
          <CardTitle>{leave.leaveType.name} Leave</CardTitle>
        </CardHeader>
      <CardContent>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Start Date:</span>
            <span className="text-sm">{leave.startDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">End Date:</span>
            <span className="text-sm">{leave.endDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Reason:</span>
            <span className="text-sm">{leave.reason}</span>
          </div>
        </div>

      </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between">
            {isApproved ? (
              <span className="text-green-500">Approved</span>
            ) : isApproveError ? (
              <span className="text-red-500">{approveError?.message}</span>
            ) : isRejected?<span className="text-red-500">Rejected</span>
            : isRejectError ? (
                <span className="text-red-500">{rejectError?.message}</span>
                ) :
            (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  color="primary"
                  className="text-sm font-medium"
                  onClick={() => {
                    approveLeave.mutate({
                      leaveId: leave.id,
                    });
                  }}
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  color="error"
                  className="text-sm font-medium"
                  onClick={() => {
                    rejectLeave.mutate({
                      leaveId: leave.id,
                    });
                  }}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        </CardFooter>
    </Card>
  );
}

export default RequestCard;

"use client";
import React from 'react'
import { api } from '@/trpc/react';
export const ViewLeave = (props : {
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
}) => {
    const {leave} = props;
    return (
        <div>

        </div>
    )
}

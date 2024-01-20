"use client";
import { LeafIcon, HeartIcon, TimerIcon, TreePineIcon, IceCream, Edit2Icon, Trash2Icon, EyeIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'

function LeaveCard({leave}:{
    leave: {
        id: string;
        startDate: Date;
        endDate: Date;
        status: string;
        leaveType: {
        name: string;
        };
    }
}) {
  return (
    <Card
            className="flex justify-between rounded-lg bg-white p-2 shadow-md dark:bg-gray-800/10"
            key={leave.id}
          >
            <CardHeader className="flex flex-col items-center justify-center p-0 w-full">
              <CardTitle className="flex items-center text-lg">
                <span className="mx-2">{leave.leaveType.name} Leave</span>
              </CardTitle>
              <CardDescription>
                {leave.status === "APPROVED" ? (
                  <span className="text-green-500">{leave.status}</span>
                ) : leave.status === "PENDING" ? (
                  <span className="text-yellow-500">{leave.status}</span>
                ) : (
                  <span className="text-red-500">{leave.status}</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent
              className="flex flex-col items-center justify-center w-full py-2"
            >
                <div className="my-1 flex items-center justify-center rounded-md bg-gray-200 p-2 text-xs dark:bg-gray-800">
                  <span className="mx-2">
                    {/** remove the two digits from year */}
                    {leave.startDate.toDateString()}
                  </span>
                  <span className="mx-2">-</span>
                  <span className="mx-2">{leave.endDate.toDateString()}</span>
                </div>
                <div className="flex w-full items-center justify-center">
                  <Button
                    variant="ghost"
                    className="w-full text-sm text-blue-600 hover:bg-blue-500 hover:text-white mr-2"
                  >
                    {
                        leave.status === "APPROVED" ? (
                            <EyeIcon className="mr-2 h-3 w-3" />
                        ) : leave.status === "PENDING" ? (
                            <Edit2Icon className="mr-2 h-3 w-3" />
                        ) : (
                            <EyeIcon className="mr-2 h-3 w-3" />
                        )
                    }
                    {leave.status === "APPROVED" ? (
                        <span>view</span>
                    ) : leave.status === "PENDING" ? (
                        <span>edit</span>
                    ) : (
                        <span>View</span>
                    )}
                  </Button>
                  {leave.status === "APPROVED" ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full text-sm text-red-500 hover:bg-red-500 hover:text-white"
                    
                  >
                    <Trash2Icon className="mr-2 h-3 w-3" />
                    cancel
                  </Button>) : leave.status === "PENDING" ? (
                    <Button
                    size="sm"
                    variant="ghost"
                    className="w-full text-sm text-red-500 hover:bg-red-500 hover:text-white"
                    >
                    <Trash2Icon className="mr-2 h-3 w-3" />
                    delete
                    </Button>
                    ) : null}
                </div>
            </CardContent>
          </Card>
  )
}

export default LeaveCard
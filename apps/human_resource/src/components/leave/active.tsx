/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Lemon } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CheckCircle2Icon, PaperclipIcon, TimerIcon } from "lucide-react";
const lemon = Lemon({
    subsets: ['latin-ext'],
    weight: '400'
});

const ActiveLeaves = async () => {
  type Leave = {
    id: string;
    userId: string;
    leaveType: string;
    leaveTypeId: string;
    startDate: Date;
    endDate: Date;
    status: string;
    reason: string;
    attachments: string[];
  };

  const leaves: Leave[] = [
    {
      id: "abcdefgh",
      userId: "user1",
      title: "Annual Leave",
      type: "Paid",
      from: new Date("2022-01-01"),
      to: new Date("2022-01-05"),
      status: "Approved",
      reason: "Vacation",
    },
    {
      id: "ijklmnop",
      userId: "user2",
      title: "Sick Leave",
      type: "Paid",
      from: new Date("2022-02-01"),
      to: new Date("2022-02-03"),
      status: "Pending",
      reason: "Illness",
    },
  ];

  return (
    <div className="w-11/12 flex flex-col items-start justify-between p-5 rounded-lg bg-gray-100 dark:bg-gray-900 mb-10 shadow-md">
      <h1 className={cn(lemon.className," text-2xl my-3")}>Active Leaves</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {leaves.map((leave) => (
          <Card key={leave.id}>
            <CardHeader>
              <CardTitle>{leave.title}</CardTitle>
              <CardDescription>{leave.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                className="w-full rounded-md object-cover"
                src={`https://source.unsplash.com/random/300x200?sig=${leave.id+leave.reason}`}
                alt="avatar"
              />
              <hr className="my-2" />
              <CardDescription>
                {leave.from.toLocaleDateString()} -{" "}
                {leave.to.toLocaleDateString()}
              </CardDescription>
              <CardDescription>{leave.reason}</CardDescription>
            </CardContent>
            <CardFooter
              className="flex flex-col gap-2"
            >
              <Button
                className="w-full"
                variant={
                  leave.status === "Approved" ? "secondary" : "destructive"
                }
              >
                {leave.status === "Approved" ? <CheckCircle2Icon /> : <TimerIcon />}
                <span className="ml-2">{leave.status}</span>
              </Button>
              {
                leave.status === "Pending" && <Button
                  className="w-full"
                  variant="secondary"
                >
                  <PaperclipIcon />
                  <span className="ml-2">Attach</span>
                </Button>
              }
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActiveLeaves;

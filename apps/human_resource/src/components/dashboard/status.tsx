/* eslint-disable @next/next/no-img-element */
type ILeaveStatus = {
  title: string;
  allowed: number;
  balance: number;
  image: string;
};

import { Lemon } from "next/font/google";
import { api } from "@/trpc/server";
import { auth } from "@/server/auth";

const lemon = Lemon({
  subsets: ["latin-ext"],
  weight: "400",
});

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";

const Status = async () => {

  const session = await auth();

  const leaveBalances = await api.leaveBalance.getLeaveBalance.query({
    // @ts-expect-error - session is not null
    userId: session?.user?.id,
  })

  const leaveTypes = await api.leaveType.getLeaveTypes.query();

  const leaves: ILeaveStatus[] = leaveBalances.map((leaveBalance) => ({
    title: leaveTypes.find((leaveType) => leaveType.id === leaveBalance.leaveTypeId)?.name ?? "",
    allowed: leaveTypes.find((leaveType) => leaveType.id === leaveBalance.leaveTypeId)?.allowedDays ?? 0,
    balance: leaveBalance.balance,
    image: "https://source.unsplash.com/random",
  }));

  return (
    <div className="bg-transparent w-full mt-5 flex flex-col items-center justify-center">
      <h1
        className={`text-2xl font-semibold text-gray-800 my-10 ${lemon.className}`}
      >
        Leave Status
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {leaves.map((leave, index) => {
            if (leave.allowed === 0) {
                return null;
            }
          return (
            <Card
              key={`leave-${index}`}
              className="w-full flex items-center justify-center flex-col"
            >
              <CardHeader>
                <img
                  className="w-36 h-36 object-cover rounded-full"
                  src={leave.image}
                  alt="Unsplash Image"
                />
              </CardHeader>
              <CardContent>
                <CardTitle
                    className={`text-xl font-semibold text-gray-800 ${lemon.className}`}
                >{leave.title} Leave</CardTitle>
                <Progress
                  className="my-5"
                  value={(leave.allowed-leave.balance)*100 / leave.allowed}
                />
                <span className="text-gray-400">
                  Remaining : {leave.balance} days
                </span>
              </CardContent>
              <CardFooter className="flex items-center justify-between w-full">
                <CardDescription>
                  <span className="text-gray-400">Taken: </span>
                  {leave.allowed - leave.balance}
                </CardDescription>

                <CardDescription>
                  <span className="text-gray-400">Allowed: </span>
                  {leave.allowed}
                </CardDescription>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Status;

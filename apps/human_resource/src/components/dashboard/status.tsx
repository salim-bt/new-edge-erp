/* eslint-disable @next/next/no-img-element */
type ILeaveStatus = {
    title: string;
    allowed: number;
    balance: number;
    image: string;
};

import { Manrope } from "next/font/google";
import { api } from "@/trpc/server";
import { auth } from "@/server/auth";

const manrope = Manrope({
    subsets: ["latin"],
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

    const leaveBalances = await api.leaveBalance.getLeaveBalance.query();

    const leaveTypes = await api.leaveType.getLeaveTypes.query();

    const leaves: ILeaveStatus[] = leaveBalances.map((leaveBalance) => ({
        title: leaveTypes.find((leaveType) => leaveType.id === leaveBalance.leaveTypeId)?.name ?? "",
        allowed: leaveTypes.find((leaveType) => leaveType.id === leaveBalance.leaveTypeId)?.allowedDays ?? 0,
        balance: leaveBalance.balance,
        image: "https://source.unsplash.com/random",
    }));

    return (
        <div className="bg-transparent w-full mt-5 flex flex-col items-center justify-center">
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
                                <CardTitle
                                    className={`text-xl font-semibold text-gray-800 ${manrope.className}`}
                                >{leave.title} Leave</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Progress
                                    className="my-5"
                                    value={(leave.allowed - leave.balance) * 100 / leave.allowed}
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

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
const lemon = Lemon({
        subsets: ['latin-ext'],
        weight: '400'
});

const ArchivedLeaves = async () => {
    type Leave = {
        id: string;
        userId: string;
        title: string;
        type: string;
        from: Date;
        to: Date;
        status: string;
        reason: string;
    };

    const leaves: Leave[] = [
        {
            id: "abcdefgh",
            userId: "user1",
            title: "Annual Leave",
            type: "Paid",
            from: new Date("2022-01-01"),
            to: new Date("2022-01-05"),
            status: "Completed",
            reason: "Vacation",
        },
        {
            id: "ijklmnop",
            userId: "user2",
            title: "Sick Leave",
            type: "Paid",
            from: new Date("2022-02-01"),
            to: new Date("2022-02-03"),
            status: "Completed",
            reason: "Illness",
        },
        // Additional leaves
        {
            id: "qrstuvwxyz",
            userId: "user3",
            title: "Maternity Leave",
            type: "Paid",
            from: new Date("2022-03-01"),
            to: new Date("2022-03-31"),
            status: "Completed",
            reason: "Pregnancy",
        },
        {
            id: "12345678",
            userId: "user4",
            title: "Study Leave",
            type: "Unpaid",
            from: new Date("2022-04-01"),
            to: new Date("2022-04-05"),
            status: "Completed",
            reason: "Exam preparation",
        },
        {
            id: "abcdefghi",
            userId: "user5",
            title: "Personal Leave",
            type: "Paid",
            from: new Date("2022-05-01"),
            to: new Date("2022-05-02"),
            status: "Completed",
            reason: "Family event",
        },
        {
            id: "ijklmnopq",
            userId: "user6",
            title: "Bereavement Leave",
            type: "Paid",
            from: new Date("2022-06-01"),
            to: new Date("2022-06-03"),
            status: "Completed",
            reason: "Loss of a loved one",
        },
        {
            id: "rstuvwxyz",
            userId: "user7",
            title: "Parental Leave",
            type: "Paid",
            from: new Date("2022-07-01"),
            to: new Date("2022-07-31"),
            status: "Completed",
            reason: "Childcare",
        },
        {
            id: "123456789",
            userId: "user8",
            title: "Sabbatical Leave",
            type: "Unpaid",
            from: new Date("2022-08-01"),
            to: new Date("2022-08-31"),
            status: "Completed",
            reason: "Personal development",
        },
        {
            id: "abcdefghij",
            userId: "user9",
            title: "Emergency Leave",
            type: "Paid",
            from: new Date("2022-09-01"),
            to: new Date("2022-09-02"),
            status: "Completed",
            reason: "Urgent situation",
        },
        {
            id: "klmnopqrst",
            userId: "user10",
            title: "Volunteer Leave",
            type: "Paid",
            from: new Date("2022-10-01"),
            to: new Date("2022-10-05"),
            status: "Completed",
            reason: "Community service",
        },
    ];

    return (
        <div className="w-11/12 flex flex-col items-start justify-between p-5 rounded-lg bg-gray-100 dark:bg-gray-900 mb-10 shadow-md">
            <h1 className={cn(lemon.className," text-2xl my-3")}>Archived Leaves</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {leaves.map((leave) => (
                    <Card key={leave.id}>
                        <CardHeader>
                            <CardTitle>{leave.title}</CardTitle>
                            <CardDescription>{leave.type}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                className="w-full rounded-md object-cover"
                                src={`https://source.unsplash.com/random/300x200?sig=${leave.id}`}
                                alt="avatar"
                            />
                            <hr className="my-2" />
                            <CardDescription>
                                {leave.from.toLocaleDateString()} -{" "}
                                {leave.to.toLocaleDateString()}
                            </CardDescription>
                            <CardDescription>{leave.reason}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                variant={
                                    leave.status === "Approved" ? "secondary" : leave.status === "Pending" ? "destructive" : "outline"
                                }
                            >
                                {leave.status}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ArchivedLeaves;
  
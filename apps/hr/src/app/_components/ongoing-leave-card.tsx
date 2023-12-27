"use client"
import { cn } from "@/lib/utils"
import dayjs from 'dayjs'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type OngoingLeaveCardProps = React.ComponentProps<typeof Card> & {
    title: string
    startDate: string
    endDate: string
    status: string
}

export function OngoingLeaveStatusCard({ className, ...props }: OngoingLeaveCardProps) {

    const {
        title,
        startDate,
        endDate,
        status,
    } = props;

    return (
        <Card className={cn("", className)} {...props}>
            <CardHeader
                className={`flex items-center justify-between`}
            >
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-sm font-semibold">
                        {dayjs(startDate).format('DD MMM YYYY')} - {dayjs(endDate).format('DD MMM YYYY')}
                    </p>
                </div>
                <CircularProgressbar
                    value={dayjs().diff(dayjs(startDate), 'day') / dayjs(endDate).diff(dayjs(startDate), 'day') * 100}
                />
                <Progress
                    className={`w-full ${dayjs().diff(dayjs(startDate), 'day') / dayjs(endDate).diff(dayjs(startDate), 'day') * 100 > 50 ? "bg-red-100" : "bg-green-100"}`}
                    value={dayjs().diff(dayjs(startDate), 'day') / dayjs(endDate).diff(dayjs(startDate), 'day') * 100}
                    style={{ height: 10 }}
                />
            </CardContent>
            <CardFooter className="grid gap-4">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-xl font-bold">
                        {dayjs().diff(dayjs(startDate), 'day') > dayjs(endDate).diff(dayjs(startDate))
                            ? "Completed"
                            : <span className="text-green-500">
                                {dayjs(endDate).diff(dayjs(), 'day')} days left
                                {dayjs().diff(dayjs(startDate), 'day') > dayjs(endDate).diff(dayjs(startDate))
                                    ? "Completed"
                                    : <span className="text-green-500">
                                        {dayjs(endDate).diff(dayjs(), 'day')} days left
                                    </span>
                                }
                            </span>
                        }
                    </p>
                </div>
            </CardFooter>
        </Card>
    )
}


"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {api} from "@/trpc/react";
import {
    CircleDashedIcon
} from "lucide-react";
import {CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import dayjs from "dayjs";
import {Progress} from "@/components/ui/progress";

function LeaveType({leaveTypeId}:{leaveTypeId: string}) {
    const {data:leaveType, isLoading,error} = api.leaveType.getLeaveTypeById.useQuery({
        id:leaveTypeId
    });

    if (isLoading){
        return <div
            className="flex items-center justify-center">
            <CircleDashedIcon className="animate-spin" size={64} />
        </div>
    }

    // @ts-ignore
    return (<CardHeader className="flex flex-col items-center justify-center"><CardTitle className="text-xl font-bold">{leaveType.name}</CardTitle><CardDescription className="text-sm text-gray-500">{leaveType.description}</CardDescription></CardHeader>)
}

export function LeaveStatusCard() {
    const {data:leaves, isLoading,error} = api.leave.getAllLeavesByStaffId.useQuery({
        // @ts-ignore
        id:"3b49565e-86ee-4c42-8faa-65bbbe69cc3b"
    });

    if (isLoading){
        return <div
                className="flex items-center justify-center">
           <CircleDashedIcon className="animate-spin" size={64} />
        </div>
    }

    // @ts-ignore
    return (leaves.map((leave,index)=>{
           // console.log(dayjs().diff(dayjs(new Date(leave.from)),'day')*100/dayjs(new Date(leave.to)).diff(dayjs(new Date(leave.from)),'day'))
            return <Card
                key = {`${leave.id}-${index}`}
            >
                <LeaveType leaveTypeId={leave.leaveTypeId}/>
                <CardContent
                    className="flex flex-col items-center justify-center"
                >
                    <p className="text-4xl my-10 font-bold">
                        {dayjs(new Date(leave.to)).diff(dayjs(new Date(leave.from)), 'day')
                            - dayjs().diff(dayjs(new Date(leave.from)), 'day') < 0
                            ? "completed"
                            : dayjs(new Date(leave.to)).diff(dayjs(new Date(leave.from)), 'day')
                            - dayjs().diff(dayjs(new Date(leave.from)), 'day')}
                    </p>
                    <Progress
                        value={dayjs().diff(dayjs(new Date(leave.from)), 'day') * 100 / dayjs(new Date(leave.to)).diff(dayjs(new Date(leave.from)), 'day')}
                    />
                    <p
                        className="text-lg text-center my-4 text-gray-500"
                    >
                        of
                        <br/>
                        {dayjs(new Date(leave.to)).diff(dayjs(new Date(leave.from)),"day")} days left
                    </p>
                    <p className="text-xl font-bold">{leave.status}</p>
                    <p className="text-sm text-gray-500">{leave.reason}</p>
                </CardContent>
            </Card>
        })
    );
}

import {LeaveStatusCard} from "@/app/_components/leave-status-cards";

export default function Home() {
    // const cardDetails: CardDetails[] = [
    //     {
    //         title: "Annual Leave",
    //         current: 12,
    //         allowed: 30,
    //         footer: "Days"
    //     },
    //     {
    //         title: "Medical Leave",
    //         current: 2,
    //         allowed: 5,
    //         footer: "Days"
    //     },
    //     {
    //         title: "Maternity Leave",
    //         current: 47,
    //         allowed: 90,
    //         footer: "Days"
    //     },
    //     {
    //         title: "Paternity Leave",
    //         current: 4,
    //         allowed: 10,
    //         footer: "Days"
    //     },
    //     {
    //         title: "Casual Leave",
    //         current: 12,
    //         allowed: 20,
    //         footer: "Days"
    //     },
    // ]
    //
    // const ongoingLeaveDetails: OngoingLeaveDetails[] = [
    //     {
    //         title: "Annual Leave",
    //         startDate: "2023-09-01",
    //         endDate: "2024-09-05",
    //         status: "Approved"
    //     },
    // ];



    return (
        <div className="flex min-h-screen w-full flex-col items-center mt-24 justify-start bg-white">
           <div className="flex flex-col items-center justify-center">
               <img src="/hero2.jpeg" alt="logo" className="w-32 h-32"/>
           </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Welcome back, John Doe</h1>
                <p className="text-xl text-gray-500">Leave status</p>
                <br/>
           </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-5/6">
                <LeaveStatusCard />
            </div>
        </div>
    );
}


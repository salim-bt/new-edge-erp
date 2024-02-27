import { Main } from "@/components/layout/main";
import LeaveRequest from "@/components/leave/requests";

export default function page() {
  return (
    <Main>
        <h1 className="text-2xl my-3 w-full text-start px-5">Leave Requests</h1>
        <LeaveRequest />
    </Main>
  )
}

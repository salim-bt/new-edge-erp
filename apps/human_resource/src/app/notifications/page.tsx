import {Main} from "@/components/layout/main";
import Greeting from "@/components/dashboard/greeting";
import {NotificationTable} from "@/components/notifications/table";

export default function Notifications(){
    return (
        <Main>
            <Greeting />
            <NotificationTable/>
        </Main>
    );
}

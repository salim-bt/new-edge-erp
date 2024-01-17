import { Main } from '@/components/layout/main';
import ActiveLeaves from '@/components/leave/active';
import ArchivedLeaves from '@/components/leave/archived';
import { LeaveActions } from '@/components/leave/actions';

export default async function Leave(){
    return (
        <Main>
            <LeaveActions />
            <ActiveLeaves />
            <ArchivedLeaves />
        </Main>
    );
}

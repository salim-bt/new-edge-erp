import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
export const LeaveHistory = () => {
    return <div
        className='flex flex-col w-full items-center justify-start my-5 p-5 w-full h-96 bg-white/40 dark:text-white  dark:bg-gray-700 rounded-md'
    >
        <DataTable
            // @ts-ignore
            columns={columns}
            data={[
            {
                id: "1",
                type: "Annual Leave",
                reason: "Going to the beach",
                from: "2021-07-01",
                to: "2021-07-02",
                status: "approved",
            },
        ]} />
    </div>
}

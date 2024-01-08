import React from 'react'
import { LeaveHistory } from './_components/leave-history'
import { Button } from '@/components/ui/button'

export default async function Leave() {

    return <div className="flex flex-col w-full pl-60 pr-2 h-full items-start justify-start py-2">
        <div className="flex flex-col w-full items-center justify-start p-5 shadow-xl w-full h-full bg-white dark:text-white  dark:bg-gray-700 rounded-md">
            <Button
                variant="outline"
                className="w-1/4"
            >
                Apply for Leave
            </Button>
            <h1 className="text-2xl font-bold">Leave History</h1>
            <LeaveHistory />
        </div>
    </div>
}

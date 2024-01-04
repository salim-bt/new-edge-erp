import { Card, CardFooter, CardHeader, CardBody, Progress } from '@nextui-org/react';
import React from 'react'
import Image from 'next/image';
// there are five types of leave:
// paternal - 10 days
// maternal - 90 days
// medical - 5 days
// annual - 15 days
// casual - 10 days
//
type CardDetails = {
    title: string;
    current: number;
    allowed: number;
    footer: string;
    image: string;
}


const leaves: CardDetails[] = [
    {
        title: "Annual Leave",
        current: 12,
        allowed: 30,
        footer: "Days",
        image: "/annual.jpeg"
    },
    {
        title: "Medical Leave",
        current: 2,
        allowed: 5,
        footer: "Days",
        image: "/medical.jpg"
    },
    {
        title: "Maternity Leave",
        current: 47,
        allowed: 90,
        footer: "Days",
        image: "/maternal.jpg"
    },
    {
        title: "Paternity Leave",
        current: 4,
        allowed: 10,
        footer: "Days",
        image: "/paternal.jpg"
    },
    {
        title: "Casual Leave",
        current: 18,
        allowed: 20,
        footer: "Days",
        image: "/casual.jpg"
    },
]

export default function StatusCards() {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
            {
                leaves.map((leave, index) => {
                    const progress = leave.current / leave.allowed * 100;
                    return <Card
                        isBlurred
                        isFooterBlurred
                        className="py-4 px-2 font-sans bg-black/20 backdrop-blur-lg rounded-xl hover:bg-white/20"
                        key={index}>
                        <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-center">
                            <h2 className=" text-black dark:text-white font-bold text-xl">{leave.title}</h2>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt="Card background"
                                className="rounded-xl"
                                src={leave.image}
                                width={250}
                                height={200}
                            />
                        </CardBody>
                        <CardFooter className="flex flex-col items-center rounded-2xl justify-between px-4">
                            <Progress
                                value={progress}
                                color={progress < 50 ? 'success' : progress < 80 ? 'warning' : 'danger'}
                            />
                            <div className="flex justify-between w-full px-2">
                                <span className="text-md font-bold">{leave.current} Days</span>
                                <span className="text-md font-bold">{leave.allowed} Days</span>
                            </div>
                        </CardFooter>
                    </Card>
                })
            }
        </div>
    )
}


import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IceCreamIcon } from "lucide-react";
import Image from "next/image";
type CardDetails = {
    title: string;
    current: number;
    allowed: number;
    footer: string;
}

export default async function Home() {
    const cardDetails:CardDetails[] = [
        {
            title: "Annual Leave",
            current: 12,
            allowed: 30,
            footer: "Days"
        },
        {
            title: "Medical Leave",
            current: 2,
            allowed: 5,
            footer: "Days"
        },
        {
            title: "Maternity Leave",
            current: 47,
            allowed: 90,
            footer: "Days"
        },
        {
            title: "Paternity Leave",
            current: 4,
            allowed: 10,
            footer: "Days"
        },
        {
            title: "Casual Leave",
            current: 12,
            allowed: 20,
            footer: "Days"
        },
    ]

  return (
    <main className="flex min-h-screen w-full flex-col items-center mt-1000 lg:pl-96 justify-start bg-white/20">
       <div
           className="flex flex-row items-center p-4 justify-center w-11/12 lg:w-5/6 rounded-lg shadow-md"
           >
            <Image
                className={"rounded-lg"}
                width={200}
                height={200}
                src={"/hero.svg"}
                alt={"hero"} />
           <div
               className="flex flex-col items-center justify-center">
                <h1 className="mt-4 text-4xl font-semibold">
                    Welcome back!
                </h1>
                <p className="mt-4 text-xl font-bold">
                    Tenzin Yoezer
                </p>
           </div>
       </div>
       <div
            className="flex flex-col items-center justify-center w-11/12 lg:w-5/6 mt-8 rounded-lg">
            <div
                className="flex flex-col items-start justify-start w-full p-4 rounded-t-lg">
                <p className="text-xl text-start font-semibold">
                    Leave Balances
                </p>
                <div
                   className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-32 w-full mt-4">
                   {
                       cardDetails.map((cardDetail, index) => (
                           <Card
                               key={index}
                               className="flex p-4 flex-col items-center justify-center shadow-sm">
                               <CardTitle>
                                    {cardDetail.title}
                                 </CardTitle>
                               <CardContent>
                                   <div
                                       className="flex flex-col items-center justify-center mt-4">
                                       <IceCreamIcon size={80} className="my-2" />
                                       <p className="text-4xl font-semibold">
                                           {cardDetail.allowed - cardDetail.current}
                                       </p>
                                       <p className="text-xl font-semibold">
                                           {cardDetail.footer}
                                       </p>
                                   </div>
                                 </CardContent>
                                 <CardFooter
                                    className="flex flex-col w-4/5"
                                 >
                                      <Progress
                                          max={cardDetail.allowed}
                                          className="my-4"
                                          value={cardDetail.current/ cardDetail.allowed * 100}
                                        />
                                        <p className="text-md font-semibold text-right">
                                            {cardDetail.current} / {cardDetail.allowed}
                                        </p>
                                    </CardFooter>
                            </Card>
                       ))
                   }
                </div>
            </div>
        </div>
    </main>
  );
}

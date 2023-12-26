import {Card, CardFooter, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@radix-ui/react-select";

const portal = () => {

    const apps = [
        {
            name: "Inventory Management System",
            description: "A simple inventory management system",
            url: "/inventory",
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyZFk-Mb8kQd8v-BJbW7HXj6889qs_P96XKQ&usqp=CAU"
        },
        {
            name: "HR Management System",
            description: "A simple HR management system",
            url: "/hr",
            icon: "https://pyjamahr.com/wp-content/uploads/2021/11/hrm.jpg"
        }
    ];

    return (
        <main className="flex flex-col py-4 items-center justify-center w-full h-full">
            <header className="flex flex-col md:flex-row p-2 md:px-5 lg:px-20 shadow-lg items-center mb-10 md:mb-20 justify-center md:justify-between w-full h-full">
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full lg:w-3/5 xl:w-2/5 h-full">
                    <p className="text-2xl font-serif text-center">Welcome to New Edge Portal</p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full lg:w-2/5 xl:w-1/5 h-full">
                    <Button variant={"outline"} className="m-2 w-full">Dashboard</Button>
                    <Button variant={"destructive"} className="m-2 w-full">Logout</Button>
                </div>
            </header>
            <div
                className="w-full px-10 h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
                {apps.map((app,index) => (
                    <Card
                        key={`app-${index}`}
                        className="w-full h-full flex flex-col justify-center">
                        <CardTitle className="flex flex-col p-2 mt-8 items-center justify-center">
                            <img src={app.icon} className="w-full h-32 md:h-56 lg:h-64 rounded-lg" alt={app.name}/>
                            <Separator className={"my-4"}/>
                            <span className="px-8 text-xl font-bold text-center">{app.name}</span>
                        </CardTitle>
                        <Separator className={"my-4"}/>
                        {/*<CardContent>*/}
                        {/*    <p className="text-sm text-gray-500">{app.description}</p>*/}
                        {/*</CardContent>*/}
                        <CardFooter>
                            <Separator className={"my-4"}/>
                            <Button className="w-full">Open</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    );
}

export default portal;
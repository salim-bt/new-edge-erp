import {Button} from "@/components/ui/button.tsx";

const dashboard = () =>{

    return(
            <main className="flex flex-col py-4 items-center justify-center w-full h-full">
                <header
                    className="flex flex-col md:flex-row p-2 md:px-5 lg:px-20 shadow-lg items-center mb-10 md:mb-20 justify-center md:justify-between w-full h-full"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full lg:w-3/5 xl:w-2/5 h-full">
                        <p className="text-2xl font-serif text-center">Welcome to New Edge Portal</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full lg:w-2/5 xl:w-1/5 h-full">
                        <Button variant={"outline"} className="m-2 w-full">Dashboard</Button>
                        <Button variant={"destructive"} className="m-2 w-full">Logout</Button>
                    </div>
                </header>
            </main>
    );
}

export default dashboard;
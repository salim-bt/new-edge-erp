import {createBrowserRouter} from "react-router-dom";
import pages from "@/pages";
import {Toaster} from "@/components/ui/toaster.tsx";


const router = createBrowserRouter( [
        {
            path: "/",
            Component: () => (
                <div>
                    <pages.portal/>
                    <Toaster/>
                </div>),
        },
        {
            path: "/login",
            Component: ()=>(
                <div>
                    <pages.login/>
                    <Toaster/>
                </div>),
        },
        {
            path: "/dashboard",
            Component: ()=>(
                <div>
                    <pages.dashboard/>
                    <Toaster/>
                </div>),
        }
    ],
);

export default router;
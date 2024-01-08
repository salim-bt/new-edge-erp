import { getServerAuthSession } from "@/server/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboardIcon, CogIcon, MailOpen, SearchIcon, BellIcon, Users2, NewspaperIcon, Calendar, Newspaper, PersonStanding, BookX, GroupIcon, ShoppingBagIcon, LogOutIcon } from "lucide-react";
import { ModeToggle } from "./dark-mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { NavLink } from "./navlink";
import { AuthButton } from "./auth-button";
export async function Navbar() {
    const session = await getServerAuthSession();

    const sidelinks = [
        {
            title: "Dashboard",
            href: "/",
            icon: <LayoutDashboardIcon className="w-6 h-6" />,
        },
        {
            title: "Notifications",
            href: "/notifications",
            icon: <BellIcon className="w-6 h-6" />,
        },
        {
            title: "Employees",
            href: "/employees",
            icon: <Users2 className="w-6 h-6" />,
        },
        {
            title: "Leave",
            href: "/leave",
            icon: <MailOpen className="w-6 h-6" />,
        },
        {
            title: "Teams",
            href: "/teams",
            icon: <GroupIcon className="w-6 h-6" />,
        },
        {
            title: "Projects",
            href: "/projects",
            icon: <BookX className="w-6 h-6" />,
        },
        {
            title: "Clients",
            href: "/clients",
            icon: <PersonStanding className="w-6 h-6" />,
        },
    ];

    const footerlinks = [
        {
            title: "Reports",
            href: "/reports",
            icon: <Newspaper className="w-6 h-6" />,
        },
        {
            title: "Settings",
            href: "/settings",
            icon: <CogIcon className="w-6 h-6" />,
        },
    ];

    return (<div className="fixed left-1 top-0 w-56 mt-2 bg-white dark:bg-gray-900 dark:text-white shadow-md rounded-xl">
        <div className="flex flex-col h-full">
            <div className="flex items-center text-purple-500 dark:text-white justify-start px-2 py-2 my-3">
                <NewspaperIcon className="w-8 h-8" />
                <div className="flex flex-col items-start justify-center mr-3">
                    <em className="text-xl font-serif font-bold ml-2">New Edge</em>
                    <em className="text-xs ml-2">Technologies Pvt Ltd</em>
                </div>
                <ModeToggle />
            </div>
            <div className="flex items-center justify-center w-11/12 px-2 py-1 rounded-md my-3 mx-2 bg-black/10 dark:bg-white/20">
                <SearchIcon className="w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent dark:text-white w-full px-2 py-1 outline-none"
                />
            </div>
            <ScrollArea
                className="flex flex-col flex-grow items-center justify-start max-h-1/4">
                {sidelinks.map((link) => (
                    <NavLink
                        exact
                        key={link.href}
                        href={link.href}
                        className="flex items-center justify-start p-2 w-11/12 rounded-md dark:text-gray-400 mx-2 my-6 hover:text-white hover:text-purple-500 dark:hover:text-white  dark:hover:bg-white/20 transition-colors duration-300"

                    >
                        {link.icon}
                        <span className="text-md ml-2">{link.title}</span>
                    </NavLink>
                ))}
            </ScrollArea>
            <Separator className="w-11/12 mx-auto my-3" />
            <div className="flex flex-col items-center justify-center">
                {footerlinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="flex items-center justify-start p-2 w-11/12 rounded-md dark:text-gray-400 mx-2 my-3 hover:text-white hover:bg-purple-500  dark:hover:bg-white/20 transition-colors duration-500"
                    >
                        {link.icon}
                        <span className="text-md ml-2">{link.title}</span>
                    </a>
                ))}
                <AuthButton />
                <div className="flex items-center justify-start p-2 w-11/12 rounded-md dark:text-gray-400 mx-2 my-3 dark:bg-black/10 darkL:hover:text-white dark:hover:bg-white/20 transition-colors duration-500">
                    <Avatar
                        className="w-10 h-10 rounded-md"
                    >
                        {/* @ts-ignore */}
                        <AvatarImage src={session?.user?.image} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col ml-4">
                        <span className="font-bold">{session?.user?.name}</span>
                        <span className="text-xs text-gray-400">@{session?.user?.name}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

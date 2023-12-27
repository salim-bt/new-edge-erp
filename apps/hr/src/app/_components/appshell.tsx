"use client"
import { BookOpenCheck, LayoutDashboard, SidebarOpenIcon } from "lucide-react";
import React, { useState } from "react";
type AppShellProps = {
    children: React.ReactNode;
};

import {useRouter} from "next/navigation"

export default function AppShell({
    children,
}: AppShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarItems = [
        {
            name: "Dashboard",
            path: "/",
            icon: <LayoutDashboard
                size={24}
                className="text-white mr-4"
            />
        },
        {
            name: "Leave",
            path: "/leave",
            icon: <BookOpenCheck
                size={24}
                className="text-white mr-4"
            />
        },
    ];

    const router = useRouter();

    return (
        <div className="w-full h-full">
            <main className={`w-full select-none h-full flex ease-in-out duration-300 ${sidebarOpen? "pl-72":""} `}>
                {children}
            </main>
            <div className={`fixed left-0 top-0 pt-20 w-72 h-full bg-gray-700 flex items-center justify-between px-4 ${!sidebarOpen ? "-translate-x-full" : "translate-x-0"} ease-in-out duration-300`}>
                <nav className="flex flex-col w-full h-full justify-start items-start">
                    <div className="flex flex-col w-full h-full justify-start items-start">
                        {sidebarItems.map((item, index) => (
                            <a
                                key={`sidebarItems--${index}`}
                                onTouchStart={() => router.push(item.path)}
                                onClick={() => {
                                    router.push(item.path)
                                    setSidebarOpen(false)
                                    }}
                                className="flex justify-between m-4 p-4 items-center select-none rounded-lg hover:bg-gray-800 cursor-pointer"
                            >
                                {item.icon}
                                <div className="text-white font-semibold text-lg">{item.name}</div>
                            </a>
                        ))}
                    </div>
                </nav>
            </div>
            <header className="fixed top-0 w-full h-16 bg-gray-800 flex items-center justify-between px-4">
                <div className="flex items-center select-none space-x-4">
                    <SidebarOpenIcon
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-white" size={24} />
                    <img src="/logo.svg" alt="logo" className="w-8 h-8 bg-white" />
                    <div className="text-white font-semibold text-lg">HR Dashboard</div>
                </div>
            </header>
        </div>
    );
}

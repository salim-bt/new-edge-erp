import React, { type ReactNode } from 'react'
import Image from 'next/image'
import {SidebarCloseIcon, SidebarOpenIcon} from 'lucide-react';
import {Button} from "@/components/ui/button";

export type HeaderProps = {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void
};

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 flex items-center justify-start px-2 py-4 w-full h-16 shadow-2xl bg-black/80 backdrop-blur-2xl dark:bg-gray-800">
            <Button
                variant={"outline"}
                className={`p-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple bg-transparent border-transparent border-2 text-white hover:text-gray-400 hover:border-gray-400 hover:bg-gray-900`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Menu">
                {
                    sidebarOpen ? <SidebarOpenIcon /> : <SidebarCloseIcon />
                }
            </Button>
        </header>
    );
}

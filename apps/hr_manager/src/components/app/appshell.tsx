"use client";
import React from 'react'
import { type ReactNode } from "react";
import Sidebar from '@/components/app/sidebar';
import { type SideLink } from '@/components/app/sidebar';
import { BookHeart, BookTemplate } from "lucide-react";
import Header from '@/components/app/header';
export type ShellProps = {
    children: ReactNode;
};

export default function AppShell({ children }: ShellProps) {

    const links: SideLink[] = [
        { href: "/", label: "Home", icon:<BookHeart /> },
        { href: "/about", label: "About", icon: <BookTemplate /> },
    ];
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    return (
        <div
            className='flex flex-col h-screen w-screen'
        >
            <div
                className="flex h-full w-full">
                {children}
            </div>
            <Sidebar
                links={links}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
        </div>
    );
}


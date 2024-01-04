"use client";
import Header from '@/components/app/header';
import Sidebar, { type SideLink } from '@/components/app/sidebar';
import { ClipboardSignature, Cog, LayoutGrid, LogOut, UsersRound } from "lucide-react";
import React, { type ReactNode } from 'react';
export type ShellProps = {
    children: ReactNode;
};

export default function AppShell({ children }: ShellProps) {

    const links: SideLink[] = [
        { href: "/", label: "Dash Board", icon:<LayoutGrid/> },
        { href: "/employeeSearch", label: "Employee", icon: <UsersRound/> },
        { href: "/leave", label: "Leave", icon: <ClipboardSignature/> },
        { href: "/admin", label: "Setting", icon: <Cog/> },   
        { href: "/logout", label: "Logout", icon: <LogOut/> },  
        
    ];
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    return (
        <div
            className='flex flex-col h-screen w-screen'
        >
            <div
                style={{ marginTop: '150px' }} className="flex items-center justify-center h-full w-full">
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


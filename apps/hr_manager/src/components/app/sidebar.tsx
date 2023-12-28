import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode } from 'react';

export type SideLink = {
    href: string;
    label: string;
    icon: ReactNode;
}

type sidebarProps = {
    links: SideLink[];
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ links, sidebarOpen}: sidebarProps) {
    return (
        <div
            className={`bg-black/80 backdrop-blur-2xl w-96 transition-[margin-left] ease-in-out duration-500 fixed top-0 bottom-0 left-0 lg:ml-0 ${sidebarOpen ? " -ml-96" : " ml-0"}`
            } >
            <div
                className="relative flex-1 flex flex-col min-h-full max-w-xs w-full">
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto w-full">
                    <div className="flex-shrink-1 flex items-center px-4">
                        <Image
                            className="rounded-full mt-32"
                            src="https://avatars.githubusercontent.com/u/25105891?s=200&v=4"
                            alt="Workflow"
                            width={50}
                            height={50}
                        />
                        <p className="ml-2 mt-32 text-lg font-semibold">
                            <a className="text-sm font-bold text-white">
                                Human Resource Management System
                            </a>
                        </p>
                    </div>

                    <nav className="mt-5 px-2 space-y-1">
                        {links.map((link) => (
                            <Link href={link.href} key={link.href}>
                                <Button
                                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                >
                                    {link.icon}
                                    {link.label}
                                </Button>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}

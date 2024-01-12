import React from 'react';
import { MenuIcon, MountainIcon, BellIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import Link from 'next/link';
import { getServerAuthSession } from "@/server/auth";
import AuthButton from '../auth/auth-button';

const Header= async () => {
    const session = await getServerAuthSession();
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center space-x-4 lg:space-x-0 lg:block">
                <button className="lg:hidden">
                    <MenuIcon className="h-6 w-6" />
                </button>
                <Link className="hidden lg:flex items-center space-x-2" href="#">
                    <MountainIcon className="h-6 w-6" />
                    <span className="text-lg font-semibold">Dashboard</span>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <button>
                    <BellIcon className="h-6 w-6" />
                </button>
                <AuthButton />
            </div>
        </header>
    );
};

export default Header;

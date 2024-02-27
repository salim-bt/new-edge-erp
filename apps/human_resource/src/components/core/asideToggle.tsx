"use client";
import { SidebarOpenIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SidebarToggle = () => {

    return <Button 
        onClick={() => {
            document.querySelector('aside')?.classList.toggle('hidden')
            document.querySelector('main')?.classList.toggle('lg:pl-72')
        }}
        className="mr-2" 
        size="icon" 
        variant="ghost"
    >
        <SidebarOpenIcon className="h-6 w-6" />
    </Button>;
}
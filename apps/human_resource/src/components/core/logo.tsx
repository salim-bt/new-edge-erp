"use client";
import { Package2Icon } from 'lucide-react';
import React from 'react';
import { Lemon } from "next/font/google";

const lemon = Lemon({
    subsets: ['latin-ext'],
    weight: '400'
});

const Logo: React.FC = () => {
    return (
        <div
            className={`flex items-center gap-3 ${lemon.className}`}
        >
            <Package2Icon className="h-6 w-6" />
            <span
                className='overflow-hidden text-sm font-semibold whitespace-nowrap overflow-ellipsis'
            >New Edge Tech</span>
        </div>
    );
};

export default Logo;

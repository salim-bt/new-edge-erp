'use client';

import React from 'react'
import Header from './header';

export function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    return (
        <div className="min-h-screen bg-gray-100">
        <Header
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
        />
        <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
        </div>
    );
}

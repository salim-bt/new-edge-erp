import React from 'react'
import Link from 'next/link';
import { getServerAuthSession } from '@/server/auth';
export async function AuthButton() {

    const session = await getServerAuthSession();

    return (<div className="flex flex-col items-center justify-center gap-4">
        <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
            {session ? "Sign out" : "Sign in"}
        </Link>
    </div>);
}

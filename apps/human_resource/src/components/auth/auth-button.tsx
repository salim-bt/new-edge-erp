import React from 'react';
import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu, DropdownMenuGroup } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

const AuthButton = async () => {
    const session = await getServerAuthSession();
    return (session&&session.user&&session.user.name?<DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer border border-gray-100 rounded-md py-1 px-2">
                  <Avatar>
                    {session.user.image&&<AvatarImage src={session.user.image} />}
                    <AvatarFallback>{
                      session.user.name.split(" ").map((n) => n[0]).join("")
                    }</AvatarFallback>
                  </Avatar>
                  <span className="text-lg font-semibold">{session.user.name.split(" ")[0]}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='center'
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem
                  className="text-red-600 font-semibold no-underline transition"
                >
                <Link
                  href={session ? "/api/auth/signout" : "/api/auth/signin"}
                >
                  {session ? "Sign out" : "Sign in"}
                </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>:<Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
            >
                {session ? "Sign out" : "Sign in"}
            </Link>
    );
};

export default AuthButton;
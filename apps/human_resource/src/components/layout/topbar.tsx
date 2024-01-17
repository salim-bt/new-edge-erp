/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Logo from "@/components/core/logo";
import UserDropdown from "../core/user";
import { SidebarToggle } from "@/components/core/asideToggle";
import SearchBar from "@/components/core/search";

export const Topbar = async () => {

  return (
    <header className="fixed top-0 flex w-full h-14 lg:h-[60px] items-center justify-between px-10 border-b bg-white dark:bg-gray-800/40">
          <SidebarToggle />
          <Logo />
          <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <SearchBar />
            <UserDropdown />
          </div>
        </header>
  )
}
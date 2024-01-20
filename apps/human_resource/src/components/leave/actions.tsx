import React from "react";
import { Lemon, Montserrat, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  ArrowUpRight,
  EyeIcon,
  HelpingHandIcon,
  MessageCirclePlus,
} from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import ApplyLeave from "./apply";
import Link from "next/link";
const mon = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const LeaveActions = () => {

  return (
    <div className="w-11/12 flex flex-col items-start justify-between p-5 rounded-lg bg-white dark:bg-gray-900 mb-10 shadow-md">
      <h1 className={cn(mon.className," text-2xl my-3")}>Leave Actions</h1>
      <div className="flex items-center justify-center">
        <ApplyLeave />
        
          <Link
            className="flex items-center justify-between mx-3 px-4 py-2 bg-blue-600 rounded-lg shadow-md text-white text-sm font-medium" 
            href="/leave/requests">
            <span className="mr-2">Leave Requests</span>
            <HelpingHandIcon className="w-5 h-5 text-white" />
          </Link>
      </div>
    </div>
  );
};

"use client";
import React from 'react'
import { signOut } from "next-auth/react"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
const Logout = () => {
  return (
    <DropdownMenuItem
        onClick={() => {
            signOut(
                {
                    callbackUrl: "/",
                    redirect: true
                }
            )
        }}
    >
        Logout
    </DropdownMenuItem>
  )
}

export default Logout
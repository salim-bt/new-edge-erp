'use client'

/*

NavLink: by default the active class is added when the href matches the start of the URL pathname.
Use the exact property to change it to an exact match with the whole URL pathname.

*/
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type NavLinkProps = {
  href: string
  exact?: boolean
  children: React.ReactNode
  className?: string
}

export const NavLink = ({ href, exact, children, ...props }:NavLinkProps) => {
  const pathname = usePathname()
  const active = ' dark:bg-gray-700 bg-purple-400  dark:text-gray-200 text-white'
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  if (isActive) {
    props.className += active
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}

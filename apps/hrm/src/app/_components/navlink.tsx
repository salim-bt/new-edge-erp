'use client'

/*

NavLink: by default the active class is added when the href matches the start of the URL pathname.
Use the exact property to change it to an exact match with the whole URL pathname.

*/
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const NavLink = ({ href, exact, children, ...props }) => {
  const pathname = usePathname()
  const active = ' dark:bg-gray-700 bg-gray-100  dark:text-gray-200 text-gray-900'
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

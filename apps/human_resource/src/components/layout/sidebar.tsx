import {
    LayoutDashboardIcon,
    MailboxIcon,
    BellElectricIcon
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Navlink from '@/components/core/navlink'
import UserDropdown from '@/components/core/user'
import { auth } from '@/server/auth'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'

const poppins = Poppins({
    weight: '400',
    subsets: ['latin']
})
export const Sidebar = async() => {

    const session = await auth()
    const sidelinks = [
        {
            href: "/",
            icon: LayoutDashboardIcon,
            label: "Dashboard",
            badge: undefined
        },
        {
            href: "/notifications",
            icon: BellElectricIcon,
            label: "Notifications",
            badge: undefined
        },
        {
            href: "/leave",
            icon: MailboxIcon,
            label: "Leaves",
            badge: undefined
        },
    ]

  return (
    <aside className={cn(poppins.className,"fixed top-0 left-0 pt-10 flex flex-col h-screen justify-betweem items-center w-64 bg-white dark:bg-gray-800 px-2 py-5")}>
        <nav className="flex flex-col my-10 px-4 text-sm font-medium py-2">
            {sidelinks.map((link, index) => (
                <Navlink
                    href={link.href}
                    key={index}>
                    <span className="flex items-center gap-4 py-2 text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-100">
                        <link.icon className="w-5 h-5" />
                        <span
                            className={cn("text-sm font-medium")}
                        >{link.label}</span>
                        {link.badge && (
                        <Badge
                            color="blue"
                            className="ml-auto"
                        >
                            {link.badge}
                        </Badge>
                        )}
                    </span>
                </Navlink>
            ))}
        </nav>
        {/* <div className="flex items-center justify-center border w-3/4 rounded-full my-10">
            <UserDropdown />
            <div className="flex flex-col items-center justify-start px-2">
                <span className="text-sm font-medium">
                    {session?.user?.name}
                </span>
                <span className="text-xs font-normal text-gray-500">Admin</span>
            </div>
        </div> */}
      </aside>
  )
}

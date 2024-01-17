import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { auth } from "@/server/auth"
import { redirect } from "next/navigation"
import { SessionProvider } from 'next-auth/react'
type Props = {
    children: React.ReactNode
}

export const Shell =async ({children}:Props) => {
  const session = await auth()
  if (!session) {
    redirect('/api/auth/signin')
  }
  return (
    <div
        className="w-full bg-gray-50 dark:bg-gray-800"
    >
      <SessionProvider session={session}>
        {children}
        <Sidebar />
        <Topbar />
      </SessionProvider>
    </div>
  )
}

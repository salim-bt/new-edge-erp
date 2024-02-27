import React from "react"

export const Main = async(
    {children}:{children:React.ReactNode}
) => {
    return (
        <main className="flex min-h-screen w-full flex-col items-start justify-start lg:pl-80 px-10 py-24 overflow-y-auto">
            {children}
        </main>
  )
}

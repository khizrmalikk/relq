'use client'

import { SessionProvider } from 'next-auth/react'

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <SessionProvider>
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
    // </SessionProvider>
  )
}

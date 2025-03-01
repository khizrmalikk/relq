'use client'

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      {children}
    </main>
  )
}

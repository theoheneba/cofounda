import { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="p-5 space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="ghost" className="w-full justify-start">Users</Button>
          </Link>
          <Link href="/admin/pitches">
            <Button variant="ghost" className="w-full justify-start">Pitches</Button>
          </Link>
          <Link href="/admin/projects">
            <Button variant="ghost" className="w-full justify-start">Projects</Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start">Settings</Button>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  )
}


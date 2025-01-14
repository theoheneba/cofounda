'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-semibold text-xl text-[#4A2515]">Co-Founder <span className="px-1.5 py-0.5 text-sm bg-[#F3D5CB] rounded">HUB</span></span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-[#4A2515] hover:text-[#B85C3C]">About</Link>
            <Link href="/projects" className="px-3 py-2 rounded-md text-sm font-medium text-[#4A2515] hover:text-[#B85C3C]">Projects</Link>
            {session ? (
              <>
                <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-[#4A2515] hover:text-[#B85C3C]">Dashboard</Link>
                <Button onClick={() => signOut()} variant="ghost" className="text-[#4A2515]">Sign Out</Button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium text-[#4A2515] hover:text-[#B85C3C]">Sign In</Link>
                <Link href="/signup" className="px-3 py-2 rounded-md text-sm font-medium text-[#4A2515] hover:text-[#B85C3C]">Sign Up</Link>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#4A2515] hover:text-[#B85C3C] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#B85C3C]"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-[#4A2515] hover:text-[#B85C3C]">About</Link>
            <Link href="/projects" className="block px-3 py-2 rounded-md text-base font-medium text-[#4A2515] hover:text-[#B85C3C]">Projects</Link>
            {session ? (
              <>
                <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-[#4A2515] hover:text-[#B85C3C]">Dashboard</Link>
                <Button onClick={() => signOut()} variant="ghost" className="w-full text-left px-3 py-2 text-base font-medium text-[#4A2515] hover:text-[#B85C3C]">Sign Out</Button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-[#4A2515] hover:text-[#B85C3C]">Sign In</Link>
                <Link href="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-[#4A2515] hover:text-[#B85C3C]">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}


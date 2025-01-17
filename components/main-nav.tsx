"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MoreHorizontal } from 'lucide-react'

export function MainNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Cofoundar Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-semibold text-primary">
              Cofoundar
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/how-it-works" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              How It Works
            </Link>
            <Link 
              href="/success-stories" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Success Stories
            </Link>
            <Link 
              href="/explore-startups" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Explore Startups
            </Link>
            <Link href="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button 
                variant="default" 
                size="sm"
              >
                Join Cofoundar
              </Button>
            </Link>
          </nav>
          <div className="hidden md:flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin/login" aria-label="Admin Login">
                <MoreHorizontal className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}


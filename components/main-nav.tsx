"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function MainNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="CoFounder Hub Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-semibold text-primary">
              Co-Founder
              <span className="ml-1 bg-primary text-primary-foreground px-1 rounded text-sm align-text-top">
                HUB
              </span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/learn-more" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Learn More
            </Link>
            <Link 
              href="/pricing" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <Link 
              href="/explore-pitches" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Explore Pitches
            </Link>
            <Link href="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/create-profile">
              <Button 
                variant="default" 
                size="sm"
              >
                Create Profile
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}


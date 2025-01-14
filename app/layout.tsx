import "./globals.css"
import { Inter } from 'next/font/google'
import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Co-Founder Hub - Find Your Perfect Co-Founder",
  description: "Connect with passionate entrepreneurs and professionals who share your vision and complement your skills.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainNav />
        <main>{children}</main>
      </body>
    </html>
  )
}


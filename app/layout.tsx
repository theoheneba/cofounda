import "./globals.css"
import { Inter } from 'next/font/google'
import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cofoundar - Find Your Perfect Co-Founder Match",
  description: "Connect with passionate entrepreneurs and skilled professionals. Cofoundar helps you find the ideal co-founder to bring your startup vision to life.",
  keywords: "co-founder, startup, entrepreneur, networking, business partnership, tech startup, innovation",
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


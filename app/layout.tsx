import "./globals.css"
import { Inter } from 'next/font/google'
import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CoFounderHub",
  description: "Find your perfect cofounder match",
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
        {children}
      </body>
    </html>
  )
}


import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <h1 className="text-5xl font-bold mb-6 text-primary">Welcome to CoFounderHub</h1>
      <p className="text-xl mb-8 text-muted-foreground max-w-2xl text-center">Find your perfect cofounder and start your entrepreneurial journey today!</p>
      <div className="space-x-4">
        <Button asChild size="lg">
          <Link href="/signup">Create Account</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/signin">Sign In</Link>
        </Button>
      </div>
    </div>
  )
}


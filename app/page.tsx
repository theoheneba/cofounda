import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to CoFounderHub</h1>
      <p className="text-xl mb-8">Find your perfect cofounder and start your entrepreneurial journey today!</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/signup">Create Account</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/signin">Sign In</Link>
        </Button>
      </div>
    </div>
  )
}


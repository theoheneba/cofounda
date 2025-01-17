import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">Find Your Perfect Co-Founder with Cofoundar</h1>
      <p className="text-xl text-muted-foreground mb-6">Connect with passionate entrepreneurs and bring your startup vision to life</p>
      <Link href="/join">
        <Button size="lg">Start Your Co-Founder Journey</Button>
      </Link>
    </section>
  )
}


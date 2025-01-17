import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CallToAction() {
  return (
    <section className="text-center mt-12">
      <h2 className="text-3xl font-semibold mb-4">Ready to Find Your Co-Founder?</h2>
      <p className="text-xl text-muted-foreground mb-6">Join Cofoundar today and take the first step towards startup success.</p>
      <Link href="/join">
        <Button size="lg">Join Cofoundar Now</Button>
      </Link>
    </section>
  )
}


import { FeaturedStartups } from "@/components/FeaturedStartups"
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel"
import { StatsCounter } from "@/components/StatsCounter"
import Link from "next/link"
import { Button } from "@/components/ui/button"

async function getRecentStartups() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/recent-startups`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch recent startups');
  return res.json();
}

export default async function Home() {
  const recentStartups = await getRecentStartups();

  return (
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Co-Founder with Cofoundar</h1>
          <p className="text-xl text-muted-foreground mb-6">Connect with passionate entrepreneurs and bring your startup vision to life</p>
          <Link href="/signup">
            <Button size="lg">Start Your Co-Founder Journey</Button>
          </Link>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">How Cofoundar Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">1. Create Your Profile</h3>
              <p>Showcase your skills, experience, and startup vision to attract potential co-founders.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">2. Explore Matches</h3>
              <p>Browse through curated co-founder matches based on complementary skills and shared interests.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">3. Connect and Collaborate</h3>
              <p>Engage with potential co-founders, discuss ideas, and start building your dream startup together.</p>
            </div>
          </div>
        </section>

        <FeaturedStartups startups={recentStartups} />
        <TestimonialsCarousel />
        <StatsCounter />

        <section className="text-center mt-12">
          <h2 className="text-3xl font-semibold mb-4">Ready to Find Your Co-Founder?</h2>
          <p className="text-xl text-muted-foreground mb-6">Join Cofoundar today and take the first step towards startup success.</p>
          <Link href="/signup">
            <Button size="lg">Join Cofoundar Now</Button>
          </Link>
        </section>
      </div>
  )
}


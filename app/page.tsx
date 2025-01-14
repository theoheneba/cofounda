import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth"
import { MessageSquare, Shield, Share2, Users, Lightbulb, DollarSign } from 'lucide-react'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-[#FDF8F7]">
      <main>
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[#4A2515] mb-6">
              Find Your Perfect{" "}
              <span className="text-[#B85C3C]">
                Co-Found<span className="border-r-2 border-[#B85C3C] ml-1">|</span>
              </span>
            </h1>
            <p className="text-lg text-[#4A2515]/80 mb-8 max-w-2xl mx-auto">
              Connect with passionate entrepreneurs and professionals who share your vision and complement your skills. Build
              something amazing together.
            </p>
            <div className="flex justify-center gap-4">
              {session ? (
                <Button asChild className="bg-[#B85C3C] hover:bg-[#A34E32] text-white px-8">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild className="bg-[#B85C3C] hover:bg-[#A34E32] text-white px-8">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" className="text-[#4A2515] border-[#4A2515]">
                    <Link href="/about">Learn More</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#4A2515] mb-4">
                Everything You Need to Find the Right Co-Founder
              </h2>
              <p className="text-lg text-[#4A2515]/80 max-w-2xl mx-auto">
                Our platform provides all the tools and features necessary to connect with potential co-founders and bring
                your ideas to life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#4A2515]">
                  Secure Communication Platform
                </h3>
                <p className="text-[#4A2515]/80">
                  Our built-in messaging system ensures your conversations remain private and secure. Discuss your ideas,
                  share your vision, and plan your next steps with potential co-founders in a safe environment.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-[#B85C3C] mt-1" />
                    <div>
                      <h4 className="font-semibold text-[#4A2515]">End-to-End Security</h4>
                      <p className="text-sm text-[#4A2515]/80">
                        Your conversations are protected with enterprise-grade security.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-[#B85C3C] mt-1" />
                    <div>
                      <h4 className="font-semibold text-[#4A2515]">Real-Time Chat</h4>
                      <p className="text-sm text-[#4A2515]/80">
                        Instant messaging with typing indicators.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Share2 className="h-5 w-5 text-[#B85C3C] mt-1" />
                    <div>
                      <h4 className="font-semibold text-[#4A2515]">File Sharing</h4>
                      <p className="text-sm text-[#4A2515]/80">
                        Share documents and resources securely.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-xl p-4">
                <div className="bg-[#FDF8F7] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div>
                      <h4 className="font-semibold text-[#4A2515]">Secure Messaging</h4>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                      <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                        <p className="text-sm text-[#4A2515]">
                          Hi! I saw your EdTech project. I have ML/AI experience and would love to discuss collaboration!
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="bg-[#B85C3C] p-3 rounded-lg shadow-sm max-w-[80%]">
                        <p className="text-sm text-white">
                          Perfect! When would you be free to discuss the project?
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-[#FDF8F7]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#4A2515] mb-4">
                Key Features
              </h2>
              <p className="text-lg text-[#4A2515]/80 max-w-2xl mx-auto">
                Discover the tools and resources that will help you find the perfect co-founder and launch your startup.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Users className="h-12 w-12 text-[#B85C3C] mb-4" />
                <h3 className="text-xl font-bold text-[#4A2515] mb-2">Smart Matching</h3>
                <p className="text-[#4A2515]/80">
                  Our AI-powered algorithm connects you with potential co-founders based on complementary skills, shared interests, and compatible working styles.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Lightbulb className="h-12 w-12 text-[#B85C3C] mb-4" />
                <h3 className="text-xl font-bold text-[#4A2515] mb-2">Idea Validation</h3>
                <p className="text-[#4A2515]/80">
                  Get feedback on your startup ideas from experienced entrepreneurs and industry experts to refine your concept.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <DollarSign className="h-12 w-12 text-[#B85C3C] mb-4" />
                <h3 className="text-xl font-bold text-[#4A2515] mb-2">Funding Opportunities</h3>
                <p className="text-[#4A2515]/80">
                  Access a curated list of investors, accelerators, and grant opportunities to help kickstart your venture.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#4A2515] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Co-Founder Hub</h3>
              <p className="text-sm text-white/80">
                Connecting passionate entrepreneurs to build the next big thing.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-white/80 hover:text-white">About Us</Link></li>
                <li><Link href="/projects" className="text-sm text-white/80 hover:text-white">Projects</Link></li>
                <li><Link href="/faq" className="text-sm text-white/80 hover:text-white">FAQ</Link></li>
                <li><Link href="/contact" className="text-sm text-white/80 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-sm text-white/80 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-sm text-white/80 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="text-sm text-white/80 hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-white/80 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-sm text-white/80 hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="text-sm text-white/80 hover:text-white">Facebook</a></li>
                <li><a href="#" className="text-sm text-white/80 hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Co-Founder Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}


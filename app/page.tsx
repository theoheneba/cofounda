import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { RocketIcon, ShieldCheckIcon, MessageSquareIcon, FileIcon } from 'lucide-react'
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[#FDF8F7]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-[#4A3333]">
            Find Your Perfect{" "}
            <span className="text-[#E27D60]">Co-Founder</span>
          </h1>
          <p className="text-lg mb-8 text-[#6B5151] max-w-2xl mx-auto">
            Connect with passionate entrepreneurs and professionals who share
            your vision and complement your skills. Build something amazing
            together.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-[#E27D60] hover:bg-[#c66a51]"
            >
              <RocketIcon className="mr-2 h-4 w-4" />
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#E27D60] text-[#E27D60] hover:bg-[#E27D60] hover:text-white"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#4A3333]">
              Everything You Need to Find the Right Co-Founder
            </h2>
            <p className="text-lg text-[#6B5151] max-w-2xl mx-auto">
              Our platform provides all the tools and features necessary to connect with
              potential co-founders and bring your ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#4A3333]">
                Secure Communication Platform
              </h3>
              <p className="text-[#6B5151]">
                Our built-in messaging system ensures your conversations remain
                private and secure. Discuss your ideas, share your vision, and plan your
                next steps with potential co-founders in a safe environment.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheckIcon className="h-5 w-5 text-[#E27D60] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#4A3333]">End-to-End Security</h4>
                    <p className="text-sm text-[#6B5151]">
                      Your conversations are protected with enterprise-grade security.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquareIcon className="h-5 w-5 text-[#E27D60] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#4A3333]">Real-Time Chat</h4>
                    <p className="text-sm text-[#6B5151]">
                      Instant messaging with typing indicators.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileIcon className="h-5 w-5 text-[#E27D60] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#4A3333]">File Sharing</h4>
                    <p className="text-sm text-[#6B5151]">
                      Share documents and files securely.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-4 bg-[#FDF8F7] border-none shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <p className="text-sm text-[#4A3333]">
                      Hi! I saw your EdTech project. I have ML/AI experience and would love to
                      discuss collaboration!
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#E27D60] text-white rounded-lg ml-12">
                  <div className="flex-1">
                    <p className="text-sm">
                      Perfect! When would you be free to discuss the project?
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}


import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Rocket, Users, Target } from 'lucide-react'

export default function LearnMorePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#E27D60] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Where Great Ideas Meet Their Perfect Co-Founders
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            We're revolutionizing how entrepreneurs find their ideal business partners, combining
            advanced technology with human connection to create lasting, successful
            partnerships.
          </p>
        </div>
      </section>

      {/* Why CoFounderHub Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Why Co-Founder <span className="bg-[#E27D60] text-white px-2 rounded">HUB</span> ?
                </h2>
                <p className="text-gray-600 mb-6">
                  We created this platform because we understand the challenges of
                  building a startup alone. Research shows that solo founders take up to
                  3.6 times longer to reach scale compared to teams with co-founders.
                  Having the right partner not only accelerates growth but also brings
                  complementary skills, shared responsibility, and emotional support
                  during the entrepreneurial journey.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#E27D60] p-2 rounded-lg">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Faster Growth</h3>
                    <p className="text-gray-600">
                      Co-founded startups scale 3.6x faster than solo ventures
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#E27D60] p-2 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Shared Vision</h3>
                    <p className="text-gray-600">
                      Find partners who complement your skills and share your passion
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#E27D60] p-2 rounded-lg">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Smart Matching</h3>
                    <p className="text-gray-600">
                      Our AI-powered algorithm finds the perfect match for your startup
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-[#E27D60] hover:bg-[#c66a51]">
                Start Your Journey
              </Button>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://sjc.microlink.io/SArPdp4CnNJX_X1pg-sDlMSgXRrJaZnJOic_gdiKFj8oKZzzDPdyQt7P8a0bcef4EGhuQFPdx6wq_41RsLBhtw.jpeg"
                alt="Founders working together"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


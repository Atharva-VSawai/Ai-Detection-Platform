import { Suspense } from "react"
import Hero from "@/components/hero"
import FeatureSection from "@/components/feature-section"
import HowItWorks from "@/components/how-it-works"
import DetectionDemo from "@/components/detection-demo"
import { Loader } from "@/components/ui/loader"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeatureSection />
      <HowItWorks />
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Try It Yourself</h2>
        <Suspense fallback={<Loader className="mx-auto" />}>
          <DetectionDemo />
        </Suspense>
      </section>
    </main>
  )
}


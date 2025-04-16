import { Suspense } from "react"
import type { Metadata } from "next"
import DetectionTool from "@/components/detection-tool"
import { Loader } from "@/components/ui/loader"

export const metadata: Metadata = {
  title: "Detect AI Content | AI & Deepfake Detection Platform",
  description: "Upload images or videos to detect AI-generated content",
}

export default function DetectPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">AI Content Detection</h1>
        <p className="text-muted-foreground mb-8">
          Upload an image or video to analyze it for signs of AI generation or manipulation. Our platform uses advanced
          machine learning models to detect deepfakes and AI-generated content.
        </p>

        <Suspense fallback={<Loader className="mx-auto" />}>
          <DetectionTool />
        </Suspense>
      </div>
    </main>
  )
}


import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About | AI & Deepfake Detection Platform",
  description: "Learn about our AI detection technology and mission",
}

export default function AboutPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Our Platform</h1>
        <p className="text-muted-foreground mb-8">
          Our AI & Deepfake Detection Platform uses advanced machine learning techniques to identify AI-generated and
          manipulated content. As synthetic media becomes increasingly sophisticated, our tools help maintain trust in
          digital content.
        </p>

        <div className="grid gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>Promoting digital media literacy and authenticity</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We're committed to developing accessible tools that help people verify the authenticity of digital
                content. By making AI detection technology available to everyone, we aim to promote media literacy and
                combat misinformation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Technology</CardTitle>
              <CardDescription>State-of-the-art detection methods</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our platform combines multiple detection techniques including:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Convolutional Neural Networks for image analysis</li>
                <li>Temporal inconsistency detection for videos</li>
                <li>EXIF metadata analysis</li>
                <li>Facial feature analysis</li>
                <li>Audio-visual synchronization verification</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/detect">Try Our Detection Tool</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}


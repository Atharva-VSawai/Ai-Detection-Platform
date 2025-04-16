"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Image, Video, Mic, Camera, BarChart3, FileText } from "lucide-react"

export default function FeatureSection() {
  const features = [
    {
      icon: <Image className="h-10 w-10 text-primary" />,
      title: "Image Detection",
      description: "Identify AI-generated images from StyleGAN, MidJourney, and Stable Diffusion with high accuracy.",
    },
    {
      icon: <Video className="h-10 w-10 text-primary" />,
      title: "Video Analysis",
      description:
        "Detect deepfake videos by analyzing frame inconsistencies, lip-sync errors, and unnatural movements.",
    },
    {
      icon: <Mic className="h-10 w-10 text-primary" />,
      title: "Audio Verification",
      description: "Identify synthetic speech and voice cloning using advanced audio analysis techniques.",
    },
    {
      icon: <Camera className="h-10 w-10 text-primary" />,
      title: "Real-Time Detection",
      description: "Analyze content in real-time using your webcam for immediate feedback.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Confidence Scoring",
      description: "Get detailed confidence scores and probability metrics for detection results.",
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Detailed Reports",
      description: "Access comprehensive analysis reports explaining detection signals and confidence levels.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Detection Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform offers multiple detection capabilities to identify various types of AI-generated content.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


"use client"

import { motion } from "framer-motion"
import { Upload, Search, BarChart, Download } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="h-10 w-10" />,
      title: "Upload Content",
      description: "Upload an image or video file, or use your webcam to capture content for analysis.",
    },
    {
      icon: <Search className="h-10 w-10" />,
      title: "AI Analysis",
      description: "Our advanced models analyze the content for signs of AI generation or manipulation.",
    },
    {
      icon: <BarChart className="h-10 w-10" />,
      title: "View Results",
      description: "Get detailed results showing the likelihood of AI generation with confidence scores.",
    },
    {
      icon: <Download className="h-10 w-10" />,
      title: "Download Report",
      description: "Save a comprehensive report with detailed analysis of the detection results.",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our detection process is simple, fast, and provides accurate results in just a few steps.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-primary/20 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative z-10">
                    <div className="text-primary">{step.icon}</div>
                  </div>
                  <div
                    className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-2 border-primary/20 z-0 animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


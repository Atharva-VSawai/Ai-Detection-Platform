"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animation for the gradient background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = 600)

    const colors = ["#3b82f6", "#8b5cf6", "#ec4899"]
    const particles: { x: number; y: number; radius: number; color: string; velocity: { x: number; y: number } }[] = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      const radius = Math.random() * 20 + 5
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        },
      })
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, width, height)

      // Draw and update particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.1
        ctx.fill()

        // Update position
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y

        // Bounce off edges
        if (particle.x + particle.radius > width || particle.x - particle.radius < 0) {
          particle.velocity.x = -particle.velocity.x
        }

        if (particle.y + particle.radius > height || particle.y - particle.radius < 0) {
          particle.velocity.y = -particle.velocity.y
        }
      })
    }

    animate()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = 600
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ height: "600px" }} />

      <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Detect AI-Generated Content with Confidence</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Our advanced platform helps you identify deepfakes and AI-generated images and videos with high accuracy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg">
              <Link href="/detect">Try Detection Tool</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg border shadow-sm">
            <Shield className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Advanced Detection</h3>
            <p className="text-muted-foreground">
              Using state-of-the-art machine learning models to identify AI-generated content.
            </p>
          </div>

          <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg border shadow-sm">
            <AlertTriangle className="h-10 w-10 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Analysis</h3>
            <p className="text-muted-foreground">
              Get immediate results with detailed explanations of detection signals.
            </p>
          </div>

          <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg border shadow-sm">
            <CheckCircle className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">High Accuracy</h3>
            <p className="text-muted-foreground">
              Our models are continuously trained to detect the latest AI generation techniques.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


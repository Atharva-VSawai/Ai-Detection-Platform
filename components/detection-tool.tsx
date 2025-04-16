"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Camera, AlertTriangle, CheckCircle, X, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DetectionTool() {
  const [activeTab, setActiveTab] = useState("upload")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<null | {
    isAI: boolean
    confidence: number
    signals: string[]
  }>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [streamRef, setStreamRef] = useState<MediaStream | null>(null)

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      processFile(selectedFile)
    }
  }

  const processFile = (selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type.startsWith("image/") || droppedFile.type.startsWith("video/"))) {
      processFile(droppedFile)
    }
  }

  // Handle camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setStreamRef(stream)
        setCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const stopCamera = () => {
    if (streamRef) {
      streamRef.getTracks().forEach((track) => track.stop())
      setStreamRef(null)
      setCameraActive(false)
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw video frame to canvas
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert to file
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" })
            processFile(file)
          }
        }, "image/jpeg")
      }

      // Stop camera
      stopCamera()
    }
  }

  // Handle analysis
  const analyzeContent = () => {
    if (!file && !preview) return

    setIsAnalyzing(true)
    setResult(null)

    // Simulate analysis with random result (in a real app, this would call an API)
    setTimeout(() => {
      // Generate random result for demo purposes
      const isAI = Math.random() > 0.5
      const confidence = isAI
        ? Math.floor(Math.random() * 15) + 80
        : // 80-95% for AI
          Math.floor(Math.random() * 10) + 90 // 90-99% for real

      const aiSignals = [
        "Unnatural facial features or symmetry",
        "Inconsistent lighting and shadows",
        "Background pattern irregularities",
        "Missing or inconsistent EXIF metadata",
        "Detected GAN fingerprint patterns",
        "Unusual texture patterns in skin or hair",
      ]

      const realSignals = [
        "Natural facial features with expected asymmetry",
        "Consistent lighting and shadow patterns",
        "Expected EXIF metadata present",
        "No pixel pattern anomalies detected",
        "Natural background elements",
        "Realistic texture variations",
      ]

      // Randomly select 3-4 signals
      const numSignals = Math.floor(Math.random() * 2) + 3 // 3-4 signals
      const signalPool = isAI ? aiSignals : realSignals
      const selectedSignals: string[] = []

      while (selectedSignals.length < numSignals) {
        const randomIndex = Math.floor(Math.random() * signalPool.length)
        const signal = signalPool[randomIndex]

        if (!selectedSignals.includes(signal)) {
          selectedSignals.push(signal)
        }
      }

      setResult({
        isAI,
        confidence,
        signals: selectedSignals,
      })

      setIsAnalyzing(false)
    }, 2500)
  }

  // Reset everything
  const resetDetection = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload File</TabsTrigger>
          <TabsTrigger value="camera">Use Camera</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          {!preview ? (
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50",
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="hidden"
              />

              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload an image or video</h3>
                <p className="text-muted-foreground mb-4">Drag and drop a file here, or click to select a file</p>
                <p className="text-xs text-muted-foreground">Supports JPG, PNG, GIF, and MP4 files</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={resetDetection}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="rounded-lg overflow-hidden border">
                <Image
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  width={800}
                  height={600}
                  className="w-full object-contain max-h-[500px]"
                />
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="camera" className="mt-6">
          <div className="rounded-lg overflow-hidden border">
            {cameraActive ? (
              <div className="relative">
                <video ref={videoRef} autoPlay playsInline className="w-full max-h-[500px] object-contain" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <Button onClick={captureImage}>Capture Image</Button>
                </div>
              </div>
            ) : preview ? (
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm"
                  onClick={resetDetection}
                >
                  <X className="h-4 w-4" />
                </Button>

                <Image
                  src={preview || "/placeholder.svg"}
                  alt="Camera capture"
                  width={800}
                  height={600}
                  className="w-full object-contain max-h-[500px]"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 cursor-pointer" onClick={startCamera}>
                <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Use your camera</h3>
                <p className="text-muted-foreground">Click to activate your camera for real-time detection</p>
              </div>
            )}
          </div>

          {/* Hidden canvas for capturing images */}
          <canvas ref={canvasRef} className="hidden" />
        </TabsContent>
      </Tabs>

      {preview && !result && !isAnalyzing && (
        <div className="flex justify-center">
          <Button size="lg" onClick={analyzeContent}>
            Analyze Content
          </Button>
        </div>
      )}

      {isAnalyzing && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-6"></div>
              <h3 className="text-xl font-medium mb-2">Analyzing Content</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Our AI models are examining the content for signs of artificial generation. This may take a few
                moments...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card
              className={cn(
                "border-2",
                result.isAI ? "border-red-500 dark:border-red-700" : "border-green-500 dark:border-green-700",
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  {result.isAI ? (
                    <>
                      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-4">
                        <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
                          AI-Generated Content Detected
                        </h3>
                        <p className="text-muted-foreground">
                          This content shows signs of being artificially generated
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
                          Likely Authentic Content
                        </h3>
                        <p className="text-muted-foreground">
                          This content appears to be authentic with no signs of AI generation
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Detection Signals
                    </h4>
                    <ul className="space-y-2">
                      {result.signals.map((signal, index) => (
                        <li key={index} className="flex items-start">
                          <span
                            className={cn(
                              "p-1 rounded mr-2 text-xs",
                              result.isAI
                                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
                            )}
                          >
                            {result.isAI ? "!" : "✓"}
                          </span>
                          <span className="text-sm">{signal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Confidence Score</h4>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                            {result.confidence}%
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-muted-foreground">
                            {result.isAI ? "AI-Generated" : "Authentic"}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-muted">
                        <div
                          style={{ width: `${result.confidence}%` }}
                          className={cn(
                            "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500",
                            result.isAI ? "bg-red-500" : "bg-green-500",
                          )}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg mt-4">
                      <h5 className="text-sm font-medium mb-2">What does this mean?</h5>
                      <p className="text-sm text-muted-foreground">
                        {result.isAI
                          ? "Our analysis indicates this content was likely created using AI generation tools. The detection is based on pattern recognition and may not be 100% accurate."
                          : "Our analysis suggests this content is likely authentic. However, as AI technology evolves, detection methods may need to be updated."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <Button variant="outline" onClick={resetDetection}>
                    Analyze Another File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}


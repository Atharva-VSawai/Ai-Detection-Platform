"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"

export default function DetectionDemo() {
  const [activeTab, setActiveTab] = useState("real")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setShowResult(false)

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResult(true)
    }, 2000)
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <Tabs defaultValue="real" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Demo: Try with Sample Images</h3>
            <TabsList>
              <TabsTrigger value="real">Real Image</TabsTrigger>
              <TabsTrigger value="ai">AI-Generated</TabsTrigger>
            </TabsList>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="real" className="mt-0">
                    <div className="relative aspect-square rounded-lg overflow-hidden border">
                      <Image
                        src="/placeholder.svg?height=600&width=600"
                        alt="Real photograph"
                        width={600}
                        height={600}
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
                        Real Photo
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="ai" className="mt-0">
                    <div className="relative aspect-square rounded-lg overflow-hidden border">
                      <Image
                        src="/placeholder.svg?height=600&width=600"
                        alt="AI-generated image"
                        width={600}
                        height={600}
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                        AI-Generated
                      </div>
                    </div>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>

              <div className="mt-4">
                <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
                  {isAnalyzing ? "Analyzing..." : "Analyze This Image"}
                </Button>
              </div>
            </div>

            <div>
              <div className="h-full flex flex-col">
                <h4 className="text-lg font-medium mb-4">Detection Results</h4>

                {isAnalyzing ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                      <p>Analyzing image for AI generation signals...</p>
                    </div>
                  </div>
                ) : showResult ? (
                  <AnimatePresence>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
                      {activeTab === "real" ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                              <h5 className="font-semibold text-green-700 dark:text-green-400">Real Image Detected</h5>
                            </div>
                            <p className="text-sm text-green-700 dark:text-green-400">
                              This image appears to be a genuine photograph with no signs of AI generation.
                            </p>
                          </div>

                          <div>
                            <h5 className="font-medium mb-2">Detection Signals:</h5>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-1 rounded mr-2">
                                  ✓
                                </span>
                                <span>Natural facial features with consistent details</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-1 rounded mr-2">
                                  ✓
                                </span>
                                <span>Expected EXIF metadata present</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-1 rounded mr-2">
                                  ✓
                                </span>
                                <span>Natural lighting and shadow patterns</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-1 rounded mr-2">
                                  ✓
                                </span>
                                <span>No pixel pattern anomalies detected</span>
                              </li>
                            </ul>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Confidence Score</span>
                              <span className="text-sm font-medium">96%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "96%" }}></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                              <h5 className="font-semibold text-red-700 dark:text-red-400">
                                AI-Generated Image Detected
                              </h5>
                            </div>
                            <p className="text-sm text-red-700 dark:text-red-400">
                              This image shows multiple signs of being generated by an AI model.
                            </p>
                          </div>

                          <div>
                            <h5 className="font-medium mb-2">Detection Signals:</h5>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-1 rounded mr-2">
                                  !
                                </span>
                                <span>Unnatural facial symmetry and texture patterns</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-1 rounded mr-2">
                                  !
                                </span>
                                <span>Missing or inconsistent EXIF metadata</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-1 rounded mr-2">
                                  !
                                </span>
                                <span>Irregular background patterns typical of AI models</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-1 rounded mr-2">
                                  !
                                </span>
                                <span>Detected GAN fingerprint patterns</span>
                              </li>
                            </ul>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Confidence Score</span>
                              <span className="text-sm font-medium">92%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "92%" }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed rounded-lg p-6">
                    <div className="text-center text-muted-foreground">
                      <p>Click "Analyze This Image" to see detection results</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}


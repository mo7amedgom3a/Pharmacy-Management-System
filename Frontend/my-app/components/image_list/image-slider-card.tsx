"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"

const images = [
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
]

export default function ImageSliderCard() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slideUp = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }

  const slideDown = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="p-0 relative">
        <div className="relative h-[300px] overflow-hidden">
          <motion.div
            className="absolute w-full"
            animate={{ y: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {images.map((src, index) => (
              <div key={index} className="relative h-[300px] w-full">
                <Image src={src || "/placeholder.svg"} alt={`Slide ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 bottom-0 flex flex-col justify-center p-2 space-y-2">
          <Button size="icon" variant="secondary" onClick={slideUp} className="rounded-full">
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" onClick={slideDown} className="rounded-full">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


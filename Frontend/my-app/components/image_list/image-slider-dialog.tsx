"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, ImageIcon } from "lucide-react"
import Image from "next/image"

const images = [
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
  "/placeholder.svg?height=300&width=400",
]

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slideUp = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }

  const slideDown = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <div className="relative">
      <div className="relative h-[300px] w-full overflow-hidden">
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
    </div>
  )
}

export default function ImageSliderDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <ImageIcon className="mr-2 h-4 w-4" />
          Show Images
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <ImageSlider />
      </DialogContent>
    </Dialog>
  )
}


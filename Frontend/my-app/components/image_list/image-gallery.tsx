"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageGalleryProps {
  imageUrls: string[]
}

export default function ImageGallery({ imageUrls }: ImageGalleryProps) {
  const [showImages, setShowImages] = useState(false)
  const [selectedUrls, setSelectedUrls] = useState<string[]>([])

  const handleShowImages = () => {
    setShowImages(!showImages)
    if (!showImages) {
      setSelectedUrls(imageUrls)
    } else {
      setSelectedUrls([])
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Button onClick={handleShowImages} className="mb-4">
        {showImages ? "Hide Images" : "Show Images"}
      </Button>

      {showImages && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedUrls.map((url, index) => (
            <div key={index} className="relative h-48">
              <Image
                src={url || "/placeholder.svg"}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      {showImages && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Stored Image URLs:</h2>
          <ul className="list-disc pl-5">
            {selectedUrls.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

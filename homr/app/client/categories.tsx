"use client"

import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Sliders } from "lucide-react"

const categories = [
  {
    label: "Fitness Center",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    label: "Swimming Pool",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    label: "Basketball",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    label: "Tennis Court",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    label: "Dining Area",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    label: "BBQ Spots",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    label: "Dog Park",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    label: "Lounge",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    label: "Game Room",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    label: "Parking",
    icon: "/placeholder.svg?height=24&width=24",
  },
]

export function Categories() {
  return (
    <div className="flex items-center gap-2 py-2 sm:gap-4 sm:py-4">
      <ScrollArea className="flex-1 w-full">
        <div className="flex gap-4 sm:gap-8 pb-4">
          {categories.map((category) => (
            <Button 
              key={category.label} 
              variant="ghost" 
              className="flex flex-col items-center gap-1 sm:gap-2 hover:opacity-70 px-2 sm:px-4"
            >
              <Image
                src={"/placeholder.svg"}
                alt={category.label}
                width={20}
                height={20}
                className="aspect-square sm:w-6 sm:h-6"
              />
              <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">{category.label}</span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Button variant="outline" className="rounded-full gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm">
        <Sliders className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">Filters</span>
      </Button>
    </div>
  )
}


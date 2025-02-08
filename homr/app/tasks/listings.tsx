"use client"

import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Home, Hotel } from "lucide-react"

const listings = [
    {
      id: 1,
      title: "Premium Badminton Courts",
      rating: 4.92,
      description: "4 Professional Courts",
      dates: "2 hours · Feb 26, 2-4pm",
      price: "$80 total before taxes",
      icon: Building2,
      isFavorite: false,
      isGuestFavorite: true,
    },
    {
      id: 2,
      title: "Indoor Tennis Center",
      rating: 4.82,
      description: "Climate controlled courts",
      dates: "1.5 hours · Feb 9, 7-8:30pm",
      price: "$65 total before taxes",
      icon: Home,
      isFavorite: false,
      isGuestFavorite: true,
    },
    {
      id: 3,
      title: "Skyview Private Dining Room",
      rating: 4.82,
      description: "Panoramic city views",
      dates: "3 hours · Feb 24, 6-9pm",
      price: "$250 total before taxes",
      icon: Hotel,
      isFavorite: false,
      isGuestFavorite: false,
    },
    // ... rest of your listings data
  ] 

interface ListingsProps {
  searchQuery?: string
}

export function Listings({ searchQuery = "" }: ListingsProps) {
  const filteredListings = listings.filter(listing => {
    const search = searchQuery.toLowerCase()
    return (
      listing.title.toLowerCase().includes(search) ||
      listing.description.toLowerCase().includes(search)
    )
  })

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
      {filteredListings.map((listing) => (
        <div key={listing.id} className="group relative">
          <div className="aspect-square overflow-hidden rounded-xl">
            <Image
              src={"/placeholder.svg"}
              alt={listing.title}
              width={720}
              height={480}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-white hover:scale-110 transition-transform duration-200"
            >
              <Heart className="h-6 w-6" />
            </Button>
            {listing.isGuestFavorite && (
              <Badge variant="secondary" className="absolute left-4 top-4">
                Guest favorite
              </Badge>
            )}
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{listing.title}</h3>
              <div className="flex items-center gap-1">
                <span>★</span>
                <span>{listing.rating}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{listing.description}</p>
            <p className="text-sm text-muted-foreground">{listing.dates}</p>
            <p className="font-medium">{listing.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


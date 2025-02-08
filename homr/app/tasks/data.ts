import { Building2, Home, Hotel } from "lucide-react"

export const listings = [
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
    image: "/images/badminton-courts.jpg",
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
    image: "/images/tennis-center.jpg",
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
    image: "/images/dining-room.jpg",
  },
  // ... rest of your listings data
] 
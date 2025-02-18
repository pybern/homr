import Link from "next/link"
import {
  Car,
  Truck,
  Caravan,
  Ship,
  TractorIcon as HeavyMachinery,
  Package,
  TruckIcon as Trailer,
  MoreHorizontal,
} from "lucide-react"
import { Header } from "./header"
import { Button } from "@/components/ui/button"

const vehicles = [
  { icon: Car, label: "Cars", href: "/client-home/cars" },
  { icon: Truck, label: "Trucks", href: "/trucks" },
  { icon: Caravan, label: "Caravans", href: "/caravans" },
  { icon: Ship, label: "Boats", href: "/boats" },
  { icon: HeavyMachinery, label: "Heavy Machinery", href: "/machinery" },
  { icon: Package, label: "Containers", href: "/containers" },
  { icon: Trailer, label: "Trailers", href: "/trailers" },
  { icon: MoreHorizontal, label: "Others", href: "/others" },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-24">What can I help you ship?</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {vehicles.map((vehicle, index) => (
                <Link
                  key={index}
                  href={vehicle.href}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-gray-200 hover:border-gray-300 transition-colors group"
                >
                  <vehicle.icon className="w-5 h-5 stroke-[1.5] text-gray-600 group-hover:text-gray-800" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-800">{vehicle.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-24 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ship anywhere, track everywhere.
              <span className="block text-gray-600 font-normal mt-4 text-xl md:text-2xl">
                When you ship with us, your cargo is monitored and tracked in real-time across the globe.
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button className="bg-black text-white hover:bg-gray-800">More about Tracking</Button>
              <Button variant="outline">Learn about Enterprise</Button>
            </div>
            <div className="mt-16">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t5pn3Ph2Y2dUZ7X9xghFbGpfZoKMIl.png"
                alt="Global shipping network visualization"
                className="w-full max-w-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


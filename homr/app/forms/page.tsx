"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Box,
  Truck,
  ChevronDown,
  Car,
  Gavel,
  WrenchIcon as WrenchScrewdriver,
  CheckCircle2,
  CalendarIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"

const SummaryItem = ({ label, value }: { label: string; value: string | null }) => {
  if (!value) return null
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-muted-foreground">{label}:</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}

const Summary = ({
  selectedService,
  selectedPriority,
  isOlderThan1985,
  isFromAuction,
  isSalvaged,
  isRoadworthy,
  pickupDate,
  deliveryDate,
  vehicleMake,
  vehicleModel,
  vehicleYear,
}: {
  selectedService: string | null
  selectedPriority: string
  isOlderThan1985: boolean | null
  isFromAuction: boolean | null
  isSalvaged: boolean | null
  isRoadworthy: boolean | null
  pickupDate: Date | undefined
  deliveryDate: Date | undefined
  vehicleMake: string
  vehicleModel: string
  vehicleYear: string
}) => {
  return (
    <div className="bg-white border-b p-4 space-y-2">
      <h3 className="font-semibold text-sm mb-2">Summary</h3>
      <SummaryItem label="Service Type" value={selectedService} />
      <SummaryItem label="Priority" value={selectedPriority} />
      <SummaryItem label="Older than 1985" value={isOlderThan1985 === null ? null : isOlderThan1985 ? "Yes" : "No"} />
      <SummaryItem label="From Auction" value={isFromAuction === null ? null : isFromAuction ? "Yes" : "No"} />
      {isFromAuction && <SummaryItem label="Salvaged" value={isSalvaged === null ? null : isSalvaged ? "Yes" : "No"} />}
      <SummaryItem label="Roadworthy" value={isRoadworthy === null ? null : isRoadworthy ? "Yes" : "No"} />
      <SummaryItem label="Pickup Date" value={pickupDate ? format(pickupDate, "PPP") : null} />
      <SummaryItem label="Delivery Date" value={deliveryDate ? format(deliveryDate, "PPP") : null} />
      <SummaryItem
        label="Vehicle"
        value={vehicleMake && vehicleModel && vehicleYear ? `${vehicleYear} ${vehicleMake} ${vehicleModel}` : null}
      />
    </div>
  )
}

export default function CreateShipment() {
  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Book", href: "/forms" }
  ]


  const [selectedService, setSelectedService] = useState<"FTL" | "LTL" | null>(null)
  const [selectedPriority, setSelectedPriority] = useState<"Low" | "Normal" | "High">("Normal")
  const [isOlderThan1985, setIsOlderThan1985] = useState<boolean | null>(null)
  const [isFromAuction, setIsFromAuction] = useState<boolean | null>(null)
  const [isSalvaged, setIsSalvaged] = useState<boolean | null>(null)
  const [isRoadworthy, setIsRoadworthy] = useState<boolean | null>(null)
  const [showSummary, setShowSummary] = useState(false)
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined)
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined)
  const [vehicleMake, setVehicleMake] = useState<string>("")
  const [vehicleModel, setVehicleModel] = useState<string>("")
  const [vehicleYear, setVehicleYear] = useState<string>("")
  const [vehicleVIN, setVehicleVIN] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowSummary(scrollPosition > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header items={breadcrumbItems} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-semibold">Create shipment</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <Box className="h-4 w-4 stroke-[1.5]" />
            Get bulk quotes
          </Button>
        </div>

        {/* Service Type and Pickup/Delivery Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Service Type */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Choose your service type</h2>
            <div className="flex flex-col gap-4">
              <Card
                className={`cursor-pointer transition-all ${
                  selectedService === "FTL"
                    ? "border-primary shadow-[0_0_0_1px_rgba(59,130,246,0.5)]"
                    : "hover:border-primary"
                }`}
                onClick={() => setSelectedService(selectedService === "FTL" ? null : "FTL")}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Truck className="h-8 w-8 stroke-[1.5]" />
                    <div>
                      <h3 className="font-semibold mb-1">Full truckload (FTL)</h3>
                      <p className="text-sm text-muted-foreground">
                        Best for shipments that are large enough to fill an entire truck
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer transition-all ${
                  selectedService === "LTL"
                    ? "border-primary shadow-[0_0_0_1px_rgba(59,130,246,0.5)]"
                    : "hover:border-primary"
                }`}
                onClick={() => setSelectedService(selectedService === "LTL" ? null : "LTL")}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Box className="h-8 w-8 stroke-[1.5]" />
                    <div>
                      <h3 className="font-semibold mb-1">Less-than-truckload (LTL)</h3>
                      <p className="text-sm text-muted-foreground">
                        Best for shipments under 12 pallets. LTL shipments can be either palletized or loose
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pickup & Delivery */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Pickup & delivery</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-black" />
                <Input placeholder="New York, NY" className="w-full" />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-black" />
                <Input placeholder="Chicago, IL" className="w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Load Priority */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Load priority</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {["Low", "Normal", "High"].map((priority) => (
              <Card
                key={priority}
                className={`cursor-pointer transition-all ${
                  selectedPriority === priority
                    ? "border-primary shadow-[0_0_0_1px_rgba(59,130,246,0.5)]"
                    : "hover:border-primary"
                }`}
                onClick={() => setSelectedPriority(priority as "Low" | "Normal" | "High")}
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{priority}</h3>
                  <p className="text-sm text-muted-foreground">
                    {priority === "Low" &&
                      "Rates are discounted, but we may move the pickup and delivery dates 1-3 days to fit carrier schedules."}
                    {priority === "Normal" &&
                      "Best option for most shippers. Book at the flat rate quoted for your pickup date in the calendar below."}
                    {priority === "High" &&
                      "For a fee you can increase the coverage of your shipment. If we don't find coverage, this fee will be refunded."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Questions */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
          <p className="text-base text-muted-foreground mb-6">Select where applicable</p>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Car Age Question */}
            <Card
              className={`cursor-pointer transition-all ${
                isOlderThan1985 !== null
                  ? "border-primary shadow-[0_0_0_1px_rgba(59,130,246,0.5)]"
                  : "hover:border-primary"
              }`}
              onClick={() => setIsOlderThan1985(isOlderThan1985 === true ? null : true)}
            >
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start">
                  <div className="flex items-center space-x-4">
                    <Car className="h-6 w-6 stroke-[1.5]" />
                    <Label className="text-base font-medium">Is your car older than 1985?</Label>
                  </div>
                  {isOlderThan1985 === true && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Yes</span>
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
                {isOlderThan1985 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Additional documentation may be required for vehicles older than 1985.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Auction House Question */}
            <Card
              className={`cursor-pointer transition-all ${
                isFromAuction !== null
                  ? "border-primary shadow-[0_0_0_1px_rgba(59,130,246,0.5)]"
                  : "hover:border-primary"
              }`}
              onClick={() => setIsFromAuction(isFromAuction === true ? null : true)}
            >
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start">
                  <div className="flex items-center space-x-4">
                    <Gavel className="h-6 w-6 stroke-[1.5]" />
                    <Label className="text-base font-medium">Is your car from an auction house?</Label>
                  </div>
                  {isFromAuction === true && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Yes</span>
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
                {isFromAuction === true && (
                  <div className="mt-2">
                    <Label className="text-sm font-medium mb-2 block">Was it salvaged?</Label>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={isSalvaged === true ? "default" : "outline"}
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsSalvaged(isSalvaged === true ? null : true)
                        }}
                      >
                        Yes
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Roadworthy Question */}
            <Card
              className={`cursor-pointer transition-all ${
                isRoadworthy !== null
                  ? "border-primary shadow-[0_0_0_1px_rgba(59,130,246,0.5)]"
                  : "hover:border-primary"
              }`}
              onClick={() => setIsRoadworthy(isRoadworthy === true ? null : true)}
            >
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start">
                  <div className="flex items-center space-x-4">
                    <WrenchScrewdriver className="h-6 w-6 stroke-[1.5]" />
                    <Label className="text-base font-medium">Is your car roadworthy?</Label>
                  </div>
                  {isRoadworthy === true && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Yes</span>
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
                {isRoadworthy === false && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Non-roadworthy vehicles may require special transportation arrangements.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="space-y-8 mt-8">
          <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="vehicle-make">Make</Label>
              <Select onValueChange={setVehicleMake} value={vehicleMake}>
                <SelectTrigger id="vehicle-make">
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                  <SelectItem value="chevrolet">Chevrolet</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  {/* Add more makes as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle-model">Model</Label>
              <Input
                id="vehicle-model"
                placeholder="Enter vehicle model"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle-year">Year</Label>
              <Select onValueChange={setVehicleYear} value={vehicleYear}>
                <SelectTrigger id="vehicle-year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle-vin">VIN (Vehicle Identification Number)</Label>
              <Input
                id="vehicle-vin"
                placeholder="Enter VIN"
                value={vehicleVIN}
                onChange={(e) => setVehicleVIN(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Pickup and Delivery Information */}
        <div className="space-y-8 mt-8">
          <h2 className="text-xl font-semibold mb-4">Pickup and Delivery Information</h2>

          {/* Pickup Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Pickup</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickup-address">Address</Label>
                <Input id="pickup-address" placeholder="Enter pickup address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickup-date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!pickupDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {pickupDate ? format(pickupDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={pickupDate} onSelect={setPickupDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickup-notes">Additional Notes</Label>
              <Textarea id="pickup-notes" placeholder="Enter any additional pickup instructions or notes" />
            </div>
          </div>

          {/* Delivery Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Delivery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="delivery-address">Address</Label>
                <Input id="delivery-address" placeholder="Enter delivery address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery-date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!deliveryDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deliveryDate ? format(deliveryDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={deliveryDate} onSelect={setDeliveryDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery-notes">Additional Notes</Label>
              <Textarea id="delivery-notes" placeholder="Enter any additional delivery instructions or notes" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


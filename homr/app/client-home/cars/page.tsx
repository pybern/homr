"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "../header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const steps = [
  { id: 1, name: "Vehicle Details" },
  { id: 2, name: "Pickup Location" },
  { id: 3, name: "Delivery Location" },
  { id: 4, name: "Review" },
]

export default function CarsForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    condition: "",
    pickupAddress: "",
    pickupCity: "",
    pickupDate: "",
    deliveryAddress: "",
    deliveryCity: "",
    deliveryDate: "",
  })

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === steps.length) {
      console.log("Form submitted:", formData)
      // Handle form submission
    } else {
      handleNext()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                    ${currentStep >= step.id ? "border-black bg-black text-white" : "border-gray-300 text-gray-300"}`}
                  >
                    {step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${currentStep > step.id ? "bg-black" : "bg-gray-300"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold">{steps[currentStep - 1].name}</h2>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    placeholder="e.g., Toyota"
                  />
                </div>
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g., Camry"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Condition</Label>
                  <RadioGroup
                    value={formData.condition}
                    onValueChange={(value) => setFormData({ ...formData, condition: value })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="running" id="running" />
                      <Label htmlFor="running">Running</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-running" id="non-running" />
                      <Label htmlFor="non-running">Non-running</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pickupAddress">Pickup Address</Label>
                  <Input
                    id="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="pickupCity">City</Label>
                  <Input
                    id="pickupCity"
                    value={formData.pickupCity}
                    onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <Input
                    id="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryCity">City</Label>
                  <Input
                    id="deliveryCity"
                    value={formData.deliveryCity}
                    onChange={(e) => setFormData({ ...formData, deliveryCity: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryDate">Preferred Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Review Your Information</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Vehicle:</span> {formData.year} {formData.make} {formData.model}
                  </p>
                  <p>
                    <span className="font-medium">Condition:</span> {formData.condition}
                  </p>
                  <p>
                    <span className="font-medium">Pickup:</span> {formData.pickupAddress}, {formData.pickupCity}
                  </p>
                  <p>
                    <span className="font-medium">Pickup Date:</span> {formData.pickupDate}
                  </p>
                  <p>
                    <span className="font-medium">Delivery:</span> {formData.deliveryAddress}, {formData.deliveryCity}
                  </p>
                  <p>
                    <span className="font-medium">Delivery Date:</span> {formData.deliveryDate}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-8">
              <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                Back
              </Button>
              <Button type="submit">{currentStep === steps.length ? "Submit" : "Next"}</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}


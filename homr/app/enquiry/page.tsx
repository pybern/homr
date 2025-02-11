"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function TasksPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [analysis, setAnalysis] = useState<null | {
        sentiment: string
        wordCount: number
        responseTime: string
    }>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock analysis generation
        setAnalysis({
            sentiment: ["Positive", "Neutral", "Negative"][Math.floor(Math.random() * 3)],
            wordCount: formData.message.split(/\s+/).length,
            responseTime: `${Math.floor(Math.random() * 24 + 1)} hours`,
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Enquiry Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
                            </div>
                            <Button type="submit">Submit Enquiry</Button>
                        </form>
                    </CardContent>
                </Card>
                <Card className="p-4"> </Card>
            </div>
        </div>
    )
}


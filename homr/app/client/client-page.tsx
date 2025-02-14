"use client"

import { useState } from "react"
import { Search } from "./search"
import { Categories } from "./categories"
import { Listings } from "./listings"
import { Card } from "@/components/ui/card"
import { TopBar } from "./top-bar"

export default function ClientPage() {
    const [searchQuery, setSearchQuery] = useState("")
    return (
        <Card className="p-4">
            <TopBar />
            <Search onSearch={setSearchQuery} />
            <Categories />
            <Listings searchQuery={searchQuery} />
        </Card>
    )
}
"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Search } from "./search"
import { Categories } from "./categories"
import { TopBar } from "./top-bar"
import { Listings } from "./listings"
import { Card } from "@/components/ui/card"
import { listings as defaultListings } from "./data"

export default function TasksPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const breadcrumbItems = [
        { title: "Tasks", href: "/tasks" },
        { title: "All Tasks" }
    ]

    return (
        <>
            <Header items={breadcrumbItems} />
            <div className="container mx-auto m-4">
                <Card className="p-4">
                    <TopBar />
                    <Search onSearch={setSearchQuery} />
                    <Categories />
                    <Listings searchQuery={searchQuery} />
                </Card>
            </div></>
    )
}


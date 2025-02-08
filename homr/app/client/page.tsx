"use client"

import { useState } from "react"
import { Search } from "./search"
import { Categories } from "./categories"
import { Listings } from "./listings"

export default function TasksPage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <>
            <Search onSearch={setSearchQuery} />
            <Categories />
            <Listings searchQuery={searchQuery} />
        </>
    )
}


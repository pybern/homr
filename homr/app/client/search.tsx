"use client"

import { useTransition } from "react"
import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { searchListings } from "./actions/search-listings"

interface SearchProps {
  onSearch: (value: string) => void
}

export function Search({ onSearch }: SearchProps) {
  const [isPending, startTransition] = useTransition()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    startTransition(async () => {
      const results = await searchListings(query)
      onSearch(query)
    })
  }

  return (
    <div className="flex justify-center py-4">
      <div className="flex items-center divide-x rounded-full border shadow-sm hover:shadow-md transition-shadow">
        <Popover>
          <PopoverTrigger asChild>
            <div className="px-6 py-2 cursor-pointer">
              <div className="text-left">
                <div className="text-sm font-semibold">Where</div>
                <input 
                  className="text-sm text-muted-foreground border-none bg-transparent outline-none"
                  placeholder="Search destinations"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            </div>
          </PopoverTrigger>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <div className="px-6 py-2 cursor-pointer">
              <div className="text-left">
                <div className="text-sm font-semibold">Check in</div>
                <div className="text-sm text-muted-foreground">Add dates</div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <div className="px-6 py-2 cursor-pointer">
              <div className="text-left">
                <div className="text-sm font-semibold">Check out</div>
                <div className="text-sm text-muted-foreground">Add dates</div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" />
          </PopoverContent>
        </Popover>
        <div className="flex items-center pl-6 pr-4 py-2">
          <div className="text-left">
            <div className="text-sm font-semibold">Who</div>
            <div className="text-sm text-muted-foreground">Add guests</div>
          </div>
          <Button size="icon" className="ml-4 rounded-full bg-primary text-primary-foreground">
            <SearchIcon className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </div>
  )
}


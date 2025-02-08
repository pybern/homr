import Link from "next/link"
import { Globe, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function TopBar() {
  return (
    <header className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" className="text-sm font-medium">
            Facilities
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            Events
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            Enquiries
          </Button>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Globe className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="rounded-full gap-2">
            <Menu className="h-4 w-4" />
            <Avatar className="h-6 w-6">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  )
}


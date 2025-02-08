import Link from "next/link"
import { Globe, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navigationItems = [
  {
    label: "Facilities",
    href: "/tasks",
  },
  {
    label: "Events",
    href: "/tasks/events",
  },
  {
    label: "Enquiries",
    href: "/tasks/enquiries",
  },
]

export function TopBar() {
  return (
    <header className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className="text-sm font-medium">
                {item.label}
              </Button>
            </Link>
          ))}
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


import Link from "next/link"
import { Globe, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { EnquiryForm } from "./enquiry-form"

const navigationItems = [
  {
    label: "Facilities",
    href: "/client",
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium">
                Enquiries
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <EnquiryForm />
            </DialogContent>
          </Dialog>
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


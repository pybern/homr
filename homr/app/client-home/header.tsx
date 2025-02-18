import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-gray-200">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold mr-8">
          Logo
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Features
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Templates
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Integrations
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Customers
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Enterprise
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="hidden md:inline-flex">
          Sign In
        </Button>
        <Button>Start Free</Button>
      </div>
    </header>
  )
}


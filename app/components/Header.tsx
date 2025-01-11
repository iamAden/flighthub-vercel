'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"

export default function Header() {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token')
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    })
    router.push('/')
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">FlightHub</Link>
        <div className="space-x-4">
          <Button asChild variant="ghost">
            <Link href="/search">Search Flights</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/bookings">My Bookings</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>
    </header>
  )
}


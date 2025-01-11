import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to FlightHub</h1>
      <p className="text-xl mb-8">Book your flights with ease and convenience</p>
      <Button asChild size="lg">
        <Link href="/search">Search Flights</Link>
      </Button>
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ToastProvider } from "@/components/ui/toast"

const searchSchema = z.object({
  date: z.string(),
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
})

type Flight = {
  id: string
  date: string
  origin: string
  destination: string
  price: number
  availableSeats: number
  airline: 'AirAsia' | 'BatikAir' | 'Malaysia Airlines'
}

export default function Search() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      date: '',
      origin: '',
      destination: '',
    },
  })

  const origins = ['Kuala Lumpur International Airport 2', 'Sultan Abdul Halim Airport']
  const destinations = ['Kuala Lumpur International Airport', 'Penang International Airport']

  const isFebruary2025 = (dateString: string): boolean => {
    const date = new Date(dateString)
    return date.getMonth() === 1 && date.getFullYear() === 2025
  }

  async function onSubmit(values: z.infer<typeof searchSchema>) {
    setIsLoading(true)
    try {
      if (!isFebruary2025(values.date)) {
        toast({
          title: "Sorry :(",
          description: "Only flights in 1 to 29 February 2025 are available",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const response = await fetch(`/api/flight?${new URLSearchParams(values)}`)
      if (response.ok) {
        const data = await response.json()
        setFlights(data)
      } else {
        throw new Error('Failed to fetch flights')
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <ToastProvider>
        <h1 className="text-2xl font-bold mb-6">Search Flights</h1>
        <div className="text-red-500">*Only flights in 1 to 29 February 2025 are available.</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-8">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origin</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border rounded-md py-2 px-3">
                      <option value="">Select Origin</option>
                      {origins.map((origin) => (
                        <option key={origin} value={origin}>
                          {origin}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border rounded-md py-2 px-3">
                      <option value="">Select Destination</option>
                      {destinations.map((destination) => (
                        <option key={destination} value={destination}>
                          {destination}
                        </option>
                      ))}  
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search Flights'}
            </Button>
          </form>
        </Form>

        {flights.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {flights.map((flight) => (
              <Card key={flight.id}>
                <CardHeader>
                  <CardTitle>{flight.origin} to {flight.destination}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Date: {flight.date}</p>
                  <p>Price: ${flight.price}</p>
                  <p>Seats available: {flight.availableSeats}</p>
                  <Button className="mt-4" onClick={() => router.push(`/book/${flight.id}`)}>
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </ToastProvider>
    </div>
  )
}


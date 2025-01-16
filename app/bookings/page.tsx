'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'react-hot-toast'

type Booking = {
  id: string
  flightId: string
  passengerName: string
  origin: string
  destination: string
  date: string
  status: 'checkedin' | 'comfirmed' | 'canceled'
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  async function fetchBookings() {
    try {
      const response = await fetch('/api/bookinghistory')
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      } else {
        throw new Error('Failed to fetch bookings')
      }
    } catch (error) {
      toast.error("Failed to fetch bookings :(")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCheckIn(bookingId: string) {
    try {
      const response = await fetch(`/api/checkin?bookingId=${bookingId}`, { method: 'POST' })
      if (response.ok) {
        toast.success("You have successfully checked in for your flight :)")
        fetchBookings()
      } else {
        throw new Error('Check-in failed')
      }
    } catch (error) {
      toast.error("Check in failed.")
    }
  }

  async function handleCancel(bookingId: string) {
    try {
      const response = await fetch(`/api/cancel?bookingId=${bookingId}`, { method: 'POST' })
      if (response.ok) {
        toast.success("Booking is cancelled successfully :)")
        fetchBookings()
      } else {
        throw new Error('Cancellation failed')
      }
    } catch (error) {
      toast.error("Failed to cancel booking :(")
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <CardTitle>{booking.flight.origin} to {booking.flight.destination}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {booking.flight.date}</p>
              <p>Passenger: {booking.passengerName}</p>
              <p>Status: {booking.bookingStatus}</p>
              {booking.bookingStatus === 'CONFIRMED' && (
                <div className="mt-4 space-x-2">
                  <Button onClick={() => handleCheckIn(booking.id)}>Check-in</Button>
                  <Button variant="destructive" onClick={() => handleCancel(booking.id)}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


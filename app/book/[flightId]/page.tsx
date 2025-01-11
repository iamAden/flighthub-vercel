'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from "@/components/ui/use-toast"

const bookingSchema = z.object({
  passengerName: z.string().min(2, 'Name must be at least 2 characters'),
  passengerContactNo: z.string().min(5, 'Contact number must be at least 5 characters'),
  passengerEmail: z.string().email('Invalid email address'),
  passengerICNo: z.string().min(5, 'IC number must be at least 5 characters'),
})

export default function BookFlight({ params }: { params: { flightId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      passengerName: '',
      passengerContactNo: '',
      passengerEmail: '',
      passengerICNo: '',
    },
  })

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/book?flightId=${params.flightId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (response.ok) {
        toast({
          title: "Booking successful",
          description: "Your flight has been booked",
        })
        router.push('/bookings')
      } else {
        throw new Error('Booking failed')
      }
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Book Flight</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="passengerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passenger Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passengerContactNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passengerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passengerICNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IC Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Booking...' : 'Book Flight'}
          </Button>
        </form>
      </Form>
    </div>
  )
}


import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const bookingId = searchParams.get('bookingId')
  
  const response = await fetch(`http://localhost:2025/checkin?bookingId=${bookingId}`, {
    method: 'POST',
  })

  const data = await response.text()

  return NextResponse.json({ message: data })
}


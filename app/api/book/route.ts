import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const flightId = searchParams.get('flightId')
  const body = await request.json()
  
  const response = await fetch(`http:/localhost:2025/book?flightId=${flightId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': request.headers.get('cookie') || '',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  })

  const data = await response.text()

  return NextResponse.json({ message: data })
}


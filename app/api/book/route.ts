import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const flightId = searchParams.get('flightId')
  const body = await request.json()
  
  try {
    const response = await fetch(`http://localhost:2025/book?flightId=${flightId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    })

    const data = await response.text()

    if (response.ok) {
      return NextResponse.json({ message: data }, { status: response.status })
    } else {
      return NextResponse.json({ error: data }, { status: response.status })
    }
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
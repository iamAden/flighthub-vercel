import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')
  const origin = searchParams.get('origin')
  const destination = searchParams.get('destination')
  
  const response = await fetch(`http://localhost:2025/flight?date=${date}&origin=${origin}&destination=${destination}`)

  const data = await response.json()

  return NextResponse.json(data)
}


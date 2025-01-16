import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  
  const response = await fetch('http://localhost:2025/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.text()

  return NextResponse.json({ message: data }, { status: response.status })
}


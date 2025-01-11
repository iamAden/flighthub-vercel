import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json()
  
  const response = await fetch('http://localhost:2025/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  if (response.ok) {
    // Set the userId in the cookie
    const responseCookies = cookies();
    responseCookies.set('userId', data.userId, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
    });
    console.log(data.userId)
  }

  return NextResponse.json({ token: data })
}


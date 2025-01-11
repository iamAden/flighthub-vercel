import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId');

  const response = await fetch('http://localhost:2025/bookinghistory', {
    credentials: 'include',
    headers: {
      'Cookie': `userId=${userId?.value || ''}`,
    },
  });
  
  const data = await response.json();
  
  return NextResponse.json(data);
}


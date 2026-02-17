import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

  try {
    const body = await request.json();

    // Use the variable + versioned path
    const response = await fetch(`${backendUrl}/api/v1/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Error joining waitlist.' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      message: 'You have successfully joined the waitlist!'
    });

  } catch (error) {
    console.error('Waitlist Proxy Error:', error);
    return NextResponse.json(
      { success: false, message: 'Service unavailable. Please try later.' },
      { status: 500 }
    );
  }
}
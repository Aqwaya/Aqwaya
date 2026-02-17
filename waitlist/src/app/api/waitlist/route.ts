import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Parse the incoming request body from your React component
    const body = await request.json();

    // 2. Forward the request to your NestJS Backend
    // Note: We use the new enterprise URL: /api/v1/waitlist
    const response = await fetch('http://localhost:3001/api/v1/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // 3. Parse the JSON response from the NestJS Backend
    const data = await response.json();

    // 4. Handle Errors from the Backend (e.g., 400 Validation or 409 Conflict)
    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: data.message || 'An error occurred while joining the waitlist.' 
        },
        { status: response.status }
      );
    }

    // 5. Return the success response back to the Frontend UI
    return NextResponse.json({
      success: true,
      id: data.id,
      message: 'You have successfully joined the waitlist!'
    });

  } catch (error) {
    console.error('Waitlist Proxy Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Could not connect to the signup service. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
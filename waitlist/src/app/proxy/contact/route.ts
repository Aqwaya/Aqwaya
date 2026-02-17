import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const backendUrl = process.env.BACKEND_INTERNAL_URL || 'http://localhost:5000';

  try {
    const body = await req.json();

    const response = await fetch(`${backendUrl}/api/v1/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to send message" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, message: data.message });
  } catch (error) {
    console.error("Contact Proxy Error:", error);
    return NextResponse.json(
      { success: false, message: "Could not connect to the server." },
      { status: 500 }
    );
  }
}
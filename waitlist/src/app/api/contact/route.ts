import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Forward the request to your NestJS Backend v1 API
    const response = await fetch("http://localhost:3001/api/v1/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // If NestJS returns an error (400, 429, 500), pass it to the UI
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to send message" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, message: data.message });
  } catch (error) {
    console.error("Frontend Proxy Error:", error);
    return NextResponse.json(
      { success: false, message: "Could not connect to the server." },
      { status: 500 }
    );
  }
}
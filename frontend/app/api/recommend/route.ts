import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, languageCode, latitude, longitude } = body

    // Replace YOUR_LOCAL_IP with your computer's local IP address (e.g., 192.168.1.5)
    // You can find this by running 'ipconfig' on Windows or 'ifconfig' on Mac/Linux
    const BACKEND_URL = "http://localhost:8080/api/recommend"

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        languageCode,
        latitude,
        longitude,
      }),
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error calling backend API:", error)
    return NextResponse.json(
      {
        error: "Failed to get recommendation",
        recommendation: "Sorry, I am unable to process your request at the moment. Please try again later.",
      },
      { status: 500 },
    )
  }
}

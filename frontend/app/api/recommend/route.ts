import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, languageCode, latitude, longitude } = body;

    // The BACKEND_URL is now set directly to your live Render service.
    const BACKEND_URL = "https://kisan-mitra-backend-eo7m.onrender.com/api/recommend";

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
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend error: ${response.status}`, errorText);
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling backend API:", error);
    return NextResponse.json(
      {
        error: "Failed to get recommendation",
        recommendation:
          "Sorry, I am unable to process your request at the moment. Please try again later.",
      },
      { status: 500 },
    );
  }
}


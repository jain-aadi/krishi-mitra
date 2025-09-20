"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Loader2 } from "lucide-react"
import { translations } from "@/lib/translations"

interface LocationButtonProps {
  onLocationSet: (coords: { latitude: number; longitude: number }) => void
  language: "en" | "hi" | "bn" | "gu" | "ml"
}

export default function LocationButton({ onLocationSet, language }: LocationButtonProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const t = translations[language]

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.")
      return
    }

    setIsGettingLocation(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        onLocationSet(coords)
        setIsGettingLocation(false)
      },
      (error) => {
        console.error("Error getting location:", error)
        setError("Unable to get your location. Please enable location services.")
        setIsGettingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4 font-sans">कृषि मित्र</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Krishi Mitra</h2>
        <p className="text-muted-foreground text-lg">{t.app_description}</p>
      </div>

      <div className="w-full max-w-sm">
        <Button
          onClick={handleGetLocation}
          disabled={isGettingLocation}
          size="lg"
          className="w-full h-16 text-lg font-semibold"
        >
          {isGettingLocation ? (
            <>
              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
              {t.getting_location}
            </>
          ) : (
            <>
              <MapPin className="mr-3 h-6 w-6" />
              {t.location_button}
            </>
          )}
        </Button>

        {error && <p className="text-destructive text-center mt-4 text-sm">{error}</p>}

        <p className="text-muted-foreground text-center mt-4 text-sm">{t.location_help}</p>
      </div>
    </div>
  )
}

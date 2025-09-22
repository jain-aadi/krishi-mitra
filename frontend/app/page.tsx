"use client"

import { useRouter } from "next/navigation"
import LocationButton from "@/components/location-button"

export default function HomePage() {
  const router = useRouter()

  const handleLocationSet = (coords: { latitude: number; longitude: number }) => {
    try {
      localStorage.setItem("km_location", JSON.stringify(coords))
    } catch (e) {
      // ignore storage errors
    }
    router.push("/home")
  }

  return (
    <div className="min-h-screen bg-background">
      <LocationButton onLocationSet={handleLocationSet} language="en" />
    </div>
  )
}

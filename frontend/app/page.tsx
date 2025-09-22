"use client"

import { useNavigate } from "react-router-dom"
import LocationButton from "@/components/location-button"

export default function HomePage() {
  const navigate = useNavigate()

  const handleLocationSet = (coords: { latitude: number; longitude: number }) => {
    try {
      localStorage.setItem("km_location", JSON.stringify(coords))
    } catch (e) {
      // ignore storage errors
    }
    navigate("/home")
  }

  return (
    <div className="min-h-screen bg-background">
      <LocationButton onLocationSet={handleLocationSet} language="en" />
    </div>
  )
}

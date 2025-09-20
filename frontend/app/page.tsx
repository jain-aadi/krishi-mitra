"use client"

import { useState } from "react"
import LocationButton from "@/components/location-button"
import { ChatScreen } from "@/components/chat-screen"
import { translations } from "@/lib/translations"

export default function KrishiMitra() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [messages, setMessages] = useState<Array<{ id: number; text: string; from: "user" | "bot" }>>([])
  const [language, setLanguage] = useState<"en" | "hi" | "bn" | "gu" | "ml">("en")
  const [isLoading, setIsLoading] = useState(false)

  const t = translations[language]

  const handleLocationSet = (coords: { latitude: number; longitude: number }) => {
    setLocation(coords)
    setMessages([
      {
        id: 1,
        text: t.welcome_message,
        from: "bot",
      },
    ])
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !location) return

    const userMessage = {
      id: Date.now(),
      text: message,
      from: "user" as const,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          languageCode: language,
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      })

      const data = await response.json()

      const botMessage = {
        id: Date.now() + 1,
        text: data.response || "Sorry, I could not process your request.",
        from: "bot" as const,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, there was an error processing your request.",
        from: "bot" as const,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-background">
        <LocationButton onLocationSet={handleLocationSet} language={language} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <ChatScreen
        messages={messages}
        onSendMessage={handleSendMessage}
        language={language}
        onLanguageChange={setLanguage}
        isLoading={isLoading}
      />
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageBubble } from "@/components/message-bubble"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Send, Mic, MicOff } from "lucide-react"
import { translations } from "@/lib/translations"

interface Message {
  id: number
  text: string
  from: "user" | "bot"
}

interface ChatScreenProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  language: "en" | "hi" | "bn" | "gu" | "ml"
  onLanguageChange: (language: "en" | "hi" | "bn" | "gu" | "ml") => void
  isLoading: boolean
}

export function ChatScreen({ messages, onSendMessage, language, onLanguageChange, isLoading }: ChatScreenProps) {
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  const t = translations[language]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    // Initialize speech recognition
    const initializeSpeechRecognition = async () => {
      if (typeof window === "undefined") {
        console.log("Window is undefined, skipping initialization");
        return;
      }

      try {
        // Check for browser support
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
          console.error("Speech Recognition API not supported in this browser");
          return;
        }

        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        console.log("Speech Recognition API is supported");

        // Clean up any existing instance
        if (recognitionRef.current) {
          console.log("Cleaning up existing recognition instance");
          recognitionRef.current.stop();
          recognitionRef.current = null;
        }

        // Create and configure new instance
        console.log("Creating new recognition instance");
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        
        const langCode = getLanguageCode(language);
        console.log(`Setting language to: ${langCode} for ${language}`);
        recognition.lang = langCode;
        
        // Verify language support
        recognition.onerror = (event: any) => {
          if (event.error === 'language-not-supported') {
            console.error(`Language ${langCode} not supported`);
            setInputValue(`Speech recognition not available for ${language}. Please try English or Hindi.`);
            setIsListening(false);
          }
        };

        // Configure event handlers
        recognition.onstart = () => {
          console.log("Recognition started");
          setIsListening(true);
          setInputValue("Listening...");
        };

        recognition.onresult = (event: any) => {
          console.log("Got recognition result");
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join("");
          console.log("Transcript:", transcript);
          setInputValue(transcript);
        };

        recognition.onerror = (event: any) => {
          console.error("Recognition error:", event.error);
          setIsListening(false);
          if (event.error === "not-allowed") {
            setInputValue("Microphone access denied. Please enable it in your browser settings.");
          }
        };

        recognition.onend = () => {
          console.log("Recognition ended");
          setIsListening(false);
        };

        // Store the configured instance
        recognitionRef.current = recognition;
        console.log("Speech recognition initialized successfully");

      } catch (error) {
        console.error("Error during speech recognition initialization:", error);
      }
    };

    initializeSpeechRecognition();

    return () => {
      if (recognitionRef.current) {
        console.log("Cleaning up recognition on unmount");
        recognitionRef.current.stop();
      }
    };
  }, [language]);

  const getLanguageCode = (lang: string) => {
    // Primary language codes
    const primaryCodes = {
      en: ["en-US", "en-GB", "en-IN"],
      hi: ["hi-IN"],
      bn: ["bn-IN", "bn-BD"],
      gu: ["gu-IN"],
      ml: ["ml-IN"]
    };

    // Get available voices to check language support
    const checkLanguageSupport = (langCodes: string[]) => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        for (const code of langCodes) {
          // Check if any voice supports this language code
          if (voices.some(voice => voice.lang.toLowerCase().startsWith(code.toLowerCase()))) {
            return code;
          }
        }
      }
      // If no matching voice found, try the base language code
      const baseCode = langCodes[0];
      console.log(`Using base language code: ${baseCode} for ${lang}`);
      return baseCode;
    };

    const langCodes = primaryCodes[lang as keyof typeof primaryCodes] || ["en-US"];
    return checkLanguageSupport(langCodes);
  }

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue)
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const checkMicrophonePermission = async () => {
    try {
      // First check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia is not supported in this browser");
      }

      console.log("Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted");
      // Stop all tracks after permission check
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error("Error checking microphone permission:", error);
      return false;
    }
  };

  const toggleListening = async () => {
    if (!recognitionRef.current) {
      console.error("Speech recognition not initialized");
      setInputValue("Speech recognition is not supported in this browser");
      return;
    }

    if (isListening) {
      console.log("Stopping speech recognition");
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      // Check microphone permission first
      console.log("Checking microphone permission...");
      const hasMicrophoneAccess = await checkMicrophonePermission();
      
      if (!hasMicrophoneAccess) {
        console.log("No microphone access, requesting permission...");
        // Force a new permission prompt
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: true,
          video: false 
        });
        stream.getTracks().forEach(track => track.stop());
      }

      console.log("Starting speech recognition...");
      // Clear any previous error messages
      setInputValue("");
      
      // Start recognition
      recognitionRef.current.start();
      setIsListening(true);
      console.log("Speech recognition started successfully");

    } catch (error: any) {
      console.error("Full error details:", error);
      setIsListening(false);
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setInputValue("Microphone access was denied. Please click the lock icon in your browser's address bar and allow microphone access.");
      } else if (error.name === 'NotFoundError') {
        setInputValue("No microphone found. Please check your microphone connection.");
      } else if (error.name === 'NotSupportedError') {
        setInputValue("Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.");
      } else {
        setInputValue(`Error: ${error.message || 'Could not start speech recognition'}`);
      }
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary">कृषि मित्र</h1>
            <p className="text-sm text-muted-foreground">Krishi Mitra</p>
          </div>
          <LanguageSwitcher currentLanguage={language} onLanguageChange={onLanguageChange} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder}
            className="flex-1 h-12 text-base"
            disabled={isLoading}
          />

          {recognitionRef.current && (
            <Button
              onClick={toggleListening}
              variant={isListening ? "destructive" : "outline"}
              size="icon"
              className="h-12 w-12"
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          )}

          <Button onClick={handleSend} disabled={!inputValue.trim() || isLoading} size="icon" className="h-12 w-12">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ServiceWorkerRegistration } from '@/components/service-worker-registration'
import { AppChrome } from '@/components/app-chrome'
import './globals.css'

export const metadata: Metadata = {
  title: 'Krishi Mitra',
  description: 'AI-powered agricultural assistant for farmers',
  manifest: '/manifest.json',
  themeColor: '#4CAF50',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: [
    { rel: 'icon', url: '/icons/icon-192x192.png' },
    { rel: 'apple-touch-icon', url: '/icons/icon-192x192.png' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AppChrome>{children}</AppChrome>
        <Analytics />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}

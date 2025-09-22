"use client"

import { Link, useLocation } from "react-router-dom"
import { ReactNode } from "react"

const navItems = [
    { href: "/home", label: "Home" },
    { href: "/soil-properties", label: "Soil Properties" },
    { href: "/weather", label: "Weather" },
    { href: "/seed-shop", label: "Seed Shop" },
    { href: "/crops", label: "Crops" },
    { href: "/chat", label: "Chatbot" },
]

export function AppChrome({ children }: { children: ReactNode }) {
    const { pathname } = useLocation()
    if (pathname === "/") {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen flex bg-background">
            <aside className="w-60 border-r bg-card">
                <div className="p-4 text-xl font-semibold">Kisan Mitra</div>
                <nav className="flex flex-col">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`px-4 py-3 hover:bg-accent ${isActive ? "font-medium text-primary" : "text-foreground"}`}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </aside>
            <main className="flex-1 p-6 md:p-8 overflow-x-hidden">{children}</main>
        </div>
    )
}



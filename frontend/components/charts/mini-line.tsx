"use client"

import { useMemo } from "react"

interface MiniLineProps {
    values: number[]
}

export function MiniLine({ values }: MiniLineProps) {
    const points = useMemo(() => {
        if (!values.length) return ""
        const width = 240
        const height = 80
        const min = Math.min(...values)
        const max = Math.max(...values)
        const range = max - min || 1
        const stepX = width / (values.length - 1 || 1)
        return values
            .map((v, i) => {
                const x = i * stepX
                const y = height - ((v - min) / range) * height
                return `${x},${y}`
            })
            .join(" ")
    }, [values])

    return (
        <svg viewBox="0 0 240 80" width="100%" height="80" className="overflow-visible">
            <polyline fill="none" strokeWidth="2" stroke="hsl(var(--primary))" points={points} />
        </svg>
    )
}



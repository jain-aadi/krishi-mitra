"use client"

import { useMemo } from "react"

interface AreaTrendProps {
    values: number[]
    height?: number
}

export function AreaTrend({ values, height = 220 }: AreaTrendProps) {
    const { width, chartH, padX, padY, lineD, areaD, ticks } = useMemo(() => {
        const width = 720
        const heightInner = height
        const padX = 24
        const padY = 24
        const chartW = width - padX * 2
        const chartH = heightInner - padY * 2
        const min = Math.min(...values)
        const max = Math.max(...values)
        const range = Math.max(1, max - min)
        const stepX = chartW / Math.max(1, values.length - 1)
        const toX = (i: number) => padX + i * stepX
        const toY = (v: number) => padY + chartH - ((v - min) / range) * chartH

        const lineD = values
            .map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`)
            .join(" ")
        const areaD = `${lineD} L ${padX + chartW},${padY + chartH} L ${padX},${padY + chartH} Z`

        const ticks = [0, 0.25, 0.5, 0.75, 1].map((p) => padY + p * chartH)
        return { width, chartH: heightInner, padX, padY, lineD, areaD, ticks }
    }, [values, height])

    return (
        <svg viewBox={`0 0 ${width} ${chartH}`} width="100%" height={chartH}>
            <g stroke="hsl(var(--muted-foreground))" opacity="0.25">
                {ticks.map((y, i) => (
                    <line key={i} x1={padX} x2={width - padX} y1={y} y2={y} />
                ))}
            </g>
            <path d={areaD} fill="url(#areaFill)" />
            <defs>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                </linearGradient>
            </defs>
            <path d={lineD} fill="none" stroke="hsl(var(--primary))" strokeWidth={3} />
        </svg>
    )
}



"use client"

interface SunArcProps {
    sunrise: string // HH:MM
    sunset: string // HH:MM
    currentProgress?: number // 0..1 position along the arc
}

export function SunArc({ sunrise, sunset, currentProgress = 0.65 }: SunArcProps) {
    const width = 320
    const height = 140
    const r = 110
    const cx = width / 2
    const cy = height + 10
    const start = Math.PI
    const end = 2 * Math.PI
    const arc = describeArc(cx, cy, r, (start * 180) / Math.PI, (end * 180) / Math.PI)
    const angle = start + (end - start) * currentProgress
    const sx = cx + r * Math.cos(angle)
    const sy = cy + r * Math.sin(angle)

    return (
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
            <path d={arc} fill="none" stroke="hsl(var(--muted-foreground))" />
            <circle cx={sx} cy={sy} r={6} fill="#ffcc00" />
            <text x={20} y={height - 8} fontSize="12" fill="currentColor">{sunrise} Sunrise</text>
            <text x={width - 20} y={height - 8} fontSize="12" fill="currentColor" textAnchor="end">{sunset} Sunset</text>
        </svg>
    )
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    }
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, radius, endAngle)
    const end = polarToCartesian(x, y, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    const d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ")
    return d
}



"use client"

interface WindCompassProps {
    directionDeg: number // 0=N
    speedKmh: number
}

export function WindCompass({ directionDeg, speedKmh }: WindCompassProps) {
    const size = 160
    const c = size / 2
    const r = 60
    const angle = ((directionDeg - 90) * Math.PI) / 180
    const x2 = c + r * Math.cos(angle)
    const y2 = c + r * Math.sin(angle)
    return (
        <div className="flex items-center gap-4">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
                <circle cx={c} cy={c} r={r} fill="none" stroke="hsl(var(--muted-foreground))" />
                <text x={c} y={c - r - 6} textAnchor="middle" fontSize="10">N</text>
                <text x={c} y={c + r + 14} textAnchor="middle" fontSize="10">S</text>
                <text x={c - r - 10} y={c + 4} textAnchor="middle" fontSize="10">W</text>
                <text x={c + r + 10} y={c + 4} textAnchor="middle" fontSize="10">E</text>
                <line x1={c} y1={c} x2={x2} y2={y2} stroke="hsl(var(--primary))" strokeWidth={4} strokeLinecap="round" />
            </svg>
            <div>
                <div className="text-lg font-semibold">{speedKmh.toFixed(1)} km/h</div>
                <div className="text-sm text-muted-foreground">Wind</div>
            </div>
        </div>
    )
}



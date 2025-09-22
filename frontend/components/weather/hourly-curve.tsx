"use client"

type HourPoint = { label: string; tempC: number }

interface HourlyCurveProps {
    points: HourPoint[]
}

export function HourlyCurve({ points }: HourlyCurveProps) {
    const width = 720
    const height = 160
    const padX = 24
    const padY = 28
    const chartW = width - padX * 2
    const chartH = height - padY * 2
    const temps = points.map((p) => p.tempC)
    const minT = Math.min(...temps) - 1
    const maxT = Math.max(...temps) + 1
    const stepX = chartW / Math.max(1, points.length - 1)
    const toX = (i: number) => padX + i * stepX
    const toY = (t: number) => padY + chartH - ((t - minT) / (maxT - minT || 1)) * chartH

    const d = points
        .map((p, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(p.tempC)}`)
        .join(" ")

    return (
        <div className="w-full">
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
                <g stroke="hsl(var(--muted-foreground))" opacity="0.25">
                    <line x1={padX} x2={padX + chartW} y1={padY + chartH} y2={padY + chartH} />
                </g>
                <path d={d} fill="none" stroke="#ff8a00" strokeWidth={3} />
                {points.map((p, i) => (
                    <g key={i}>
                        <circle cx={toX(i)} cy={toY(p.tempC)} r={4} fill="#ff8a00" />
                        <text x={toX(i)} y={toY(p.tempC) - 10} textAnchor="middle" fontSize="12" fill="currentColor">
                            {p.tempC}°
                        </text>
                        <text x={toX(i)} y={height - 6} textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.8">
                            {p.label}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    )
}



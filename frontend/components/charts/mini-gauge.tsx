"use client"

interface MiniGaugeProps {
    value: number // 0..1
    label?: string
    size?: number // diameter in px
}

export function MiniGauge({ value, label, size = 88 }: MiniGaugeProps) {
    const clamped = Math.max(0, Math.min(1, value))
    const strokeWidth = 8
    const radius = size / 2 - strokeWidth - 4
    const center = size / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference * (1 - clamped)
    const fontSize = Math.max(14, Math.round(size * 0.18))
    return (
        <div className="flex items-center gap-4 h-full">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
                <circle cx={center} cy={center} r={radius} stroke="hsl(var(--muted-foreground))" strokeWidth={strokeWidth} fill="none" />
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="hsl(var(--primary))"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${center} ${center})`}
                />
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={fontSize} fill="currentColor">
                    {Math.round(clamped * 100)}%
                </text>
            </svg>
            {label && <div className="text-sm text-muted-foreground">{label}</div>}
        </div>
    )
}



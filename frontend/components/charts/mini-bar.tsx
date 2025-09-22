"use client"

interface MiniBarProps {
    values: number[]
}

export function MiniBar({ values }: MiniBarProps) {
    const width = 240
    const height = 80
    const max = Math.max(1, ...values)
    const barWidth = width / (values.length || 1)

    return (
        <svg viewBox="0 0 240 80" width="100%" height="80">
            {values.map((v, i) => {
                const barHeight = (v / max) * height
                const x = i * barWidth + 2
                const y = height - barHeight
                return <rect key={i} x={x} y={y} width={barWidth - 4} height={barHeight} fill="hsl(var(--primary))" rx={2} />
            })}
        </svg>
    )
}



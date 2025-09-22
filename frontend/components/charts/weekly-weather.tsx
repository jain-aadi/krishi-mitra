"use client"

type DayForecast = {
    day: string
    high: number
    low: number
    rainMm?: number
}

interface WeeklyWeatherChartProps {
    data: DayForecast[]
}

export function WeeklyWeatherChart({ data }: WeeklyWeatherChartProps) {
    const width = 640
    const height = 220
    const paddingLeft = 40
    const paddingRight = 20
    const paddingTop = 10
    const paddingBottom = 24

    const highs = data.map((d) => d.high)
    const lows = data.map((d) => d.low)
    const allTemps = [...highs, ...lows]
    const minTemp = Math.min(...allTemps) - 2
    const maxTemp = Math.max(...allTemps) + 2
    const tempRange = maxTemp - minTemp || 1

    const chartW = width - paddingLeft - paddingRight
    const chartH = height - paddingTop - paddingBottom
    const stepX = chartW / (Math.max(1, data.length - 1))

    const toX = (i: number) => paddingLeft + i * stepX
    const toY = (t: number) => paddingTop + chartH - ((t - minTemp) / tempRange) * chartH

    const highsPath = data
        .map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d.high)}`)
        .join(" ")
    const lowsPath = data
        .map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d.low)}`)
        .join(" ")

    // Optional rain bars at bottom (scaled to 12mm max)
    const maxRain = Math.max(12, ...(data.map((d) => d.rainMm || 0)))
    const rainYBase = paddingTop + chartH
    const rainBarW = Math.max(6, stepX * 0.35)

    return (
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
            <defs>
                <linearGradient id="lineHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                </linearGradient>
            </defs>

            <g stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.3">
                {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
                    const y = paddingTop + p * chartH
                    return <line key={i} x1={paddingLeft} x2={paddingLeft + chartW} y1={y} y2={y} />
                })}
            </g>

            <path d={highsPath} fill="none" stroke="url(#lineHigh)" strokeWidth={3} />
            <path d={lowsPath} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth={2} />

            {data.map((d, i) => {
                const x = toX(i) - rainBarW / 2
                const rain = d.rainMm || 0
                const h = (rain / maxRain) * 28
                return (
                    <rect key={`r${i}`} x={x} width={rainBarW} y={rainYBase - h} height={h} rx={2} fill="hsl(var(--primary))" opacity={0.35} />
                )
            })}

            {/* X axis labels */}
            <g fontSize="12" fill="currentColor">
                {data.map((d, i) => (
                    <text key={d.day} x={toX(i)} y={height - 6} textAnchor="middle">
                        {d.day}
                    </text>
                ))}
            </g>

            {/* Y axis min/max */}
            <g fontSize="10" fill="currentColor" opacity={0.7} textAnchor="end">
                <text x={paddingLeft - 6} y={toY(maxTemp)}>
                    {Math.round(maxTemp)}°
                </text>
                <text x={paddingLeft - 6} y={toY(minTemp)}>
                    {Math.round(minTemp)}°
                </text>
            </g>
        </svg>
    )
}



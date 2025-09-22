"use client"

import { BentoCard } from "@/components/bento-card"
import { WeeklyWeatherChart } from "@/components/charts/weekly-weather"
import { HourlyCurve } from "@/components/weather/hourly-curve"
import { WindCompass } from "@/components/weather/wind-compass"
import { SunArc } from "@/components/weather/sun-arc"

export default function WeatherPage() {
    const data = [
        { day: "Mon", high: 32, low: 26, rainMm: 2 },
        { day: "Tue", high: 33, low: 25, rainMm: 0 },
        { day: "Wed", high: 35, low: 26, rainMm: 4 },
        { day: "Thu", high: 36, low: 27, rainMm: 6 },
        { day: "Fri", high: 35, low: 26, rainMm: 3 },
        { day: "Sat", high: 34, low: 25, rainMm: 1 },
        { day: "Sun", high: 33, low: 25, rainMm: 5 },
    ]

    return (
        <div className="min-h-screen p-6 md:p-8">
            <div className="w-full max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Weather</h1>
                <p className="text-muted-foreground mb-6">At-a-glance forecast</p>
                <div className="grid grid-cols-1 sm:grid-cols-6 auto-rows-[220px] md:auto-rows-[260px] gap-4">
                    <div className="sm:col-span-6">
                        <BentoCard title="24-hour forecast" subtitle="Hourly temperature" className="h-full">
                            <HourlyCurve points={[
                                { label: "Now", tempC: 34 },
                                { label: "15:00", tempC: 35 },
                                { label: "16:00", tempC: 35 },
                                { label: "17:00", tempC: 34 },
                                { label: "18:00", tempC: 33 },
                                { label: "19:00", tempC: 31 },
                            ]} />
                        </BentoCard>
                    </div>

                    <div className="sm:col-span-4">
                        <BentoCard title="7-day forecast" subtitle="Highs, lows and rainfall" className="h-full">
                            <WeeklyWeatherChart data={data} />
                        </BentoCard>
                    </div>

                    <div className="sm:col-span-2">
                        <BentoCard title="Wind" subtitle="Direction & speed" className="h-full">
                            <WindCompass directionDeg={315} speedKmh={18.8} />
                        </BentoCard>
                    </div>

                    <div className="sm:col-span-3">
                        <BentoCard title="Sun" subtitle="Rise & set" className="h-full">
                            <SunArc sunrise="06:10" sunset="18:19" />
                        </BentoCard>
                    </div>

                    <div className="sm:col-span-3 grid grid-cols-2 gap-4">
                        <BentoCard title="Humidity" subtitle="" className="h-full">
                            <div className="h-full flex items-center text-3xl font-semibold">49%</div>
                        </BentoCard>
                        <BentoCard title="Real feel" subtitle="" className="h-full">
                            <div className="h-full flex items-center text-3xl font-semibold">38°</div>
                        </BentoCard>
                        <BentoCard title="UV" subtitle="" className="h-full">
                            <div className="h-full flex items-center text-3xl font-semibold">5</div>
                        </BentoCard>
                        <BentoCard title="Pressure" subtitle="" className="h-full">
                            <div className="h-full flex items-center text-3xl font-semibold">1006 mbar</div>
                        </BentoCard>
                    </div>
                </div>
            </div>
        </div>
    )
}



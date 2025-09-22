"use client"

import { BentoCard } from "@/components/bento-card"
import { MiniLine } from "@/components/charts/mini-line"
import { MiniBar } from "@/components/charts/mini-bar"
import { MiniGauge } from "@/components/charts/mini-gauge"
import { AreaTrend } from "@/components/charts/area-trend"

export default function HomePage() {
    return (
        <div className="w-full max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Welcome to Kisan Mitra</h1>
            <p className="text-muted-foreground mb-6">Your field insights at a glance</p>

            <div className="grid grid-cols-1 sm:grid-cols-6 auto-rows-[160px] md:auto-rows-[190px] lg:auto-rows-[220px] gap-4">
                <div className="sm:col-span-3 sm:row-span-2">
                    <BentoCard title="Soil Quality" subtitle="Moisture & nutrients" className="h-full">
                        <AreaTrend values={[32, 40, 45, 50, 60, 55, 70, 68, 72, 75, 71, 78]} />
                        <div className="mt-3 text-sm text-muted-foreground">Last 12 days moisture trend</div>
                    </BentoCard>
                </div>

                <div className="sm:col-span-2 sm:row-span-1">
                    <BentoCard title="Weather" subtitle="Next 7 days" className="h-full">
                        <MiniBar values={[30, 28, 32, 35, 34, 31, 29]} />
                        <div className="mt-3 text-sm text-muted-foreground">Daily high temperature (°C)</div>
                    </BentoCard>
                </div>

                <div className="sm:col-span-1 sm:row-span-1">
                    <BentoCard title="Season" subtitle="Current" className="h-full items-start justify-center">
                        <div className="text-3xl font-semibold">Kharif</div>
                        <div className="text-sm text-muted-foreground mt-1">June - October</div>
                    </BentoCard>
                </div>

                <div className="sm:col-span-3 sm:row-span-1">
                    <BentoCard title="Ground Water" subtitle="Availability" className="h-full">
                        <MiniGauge value={0.64} label="Well level" size={140} />
                        <div className="mt-3">
                            <AreaTrend values={[52, 58, 60, 62, 59, 61, 64, 63, 65, 66]} height={160} />
                            <div className="mt-2 text-xs text-muted-foreground">Last 10 days groundwater index</div>
                        </div>
                    </BentoCard>
                </div>

                <div className="sm:col-span-3 sm:row-span-1">
                    <BentoCard title="Best Crops Now" subtitle="Location-based" className="h-full">
                        <ul className="list-disc pl-5 text-sm leading-7">
                            <li>Rice (IR-64)</li>
                            <li>Maize (HQPM-1)</li>
                            <li>Pigeon Pea (ICPL 87119)</li>
                        </ul>
                    </BentoCard>
                </div>

                <div className="sm:col-span-2 sm:row-span-1">
                    <BentoCard title="Soil pH" subtitle="Last readings" className="h-full">
                        <MiniLine values={[6.2, 6.3, 6.4, 6.5, 6.6, 6.55, 6.6, 6.7]} />
                        <div className="mt-3 text-sm text-muted-foreground">Target range 6.0 - 7.5</div>
                    </BentoCard>
                </div>

                <div className="sm:col-span-1 sm:row-span-1">
                    <BentoCard title="Rainfall" subtitle="Recent" className="h-full">
                        <MiniBar values={[2, 0, 8, 0, 12, 3, 0, 25, 4, 0]} />
                        <div className="mt-3 text-sm text-muted-foreground">Daily rainfall (mm)</div>
                    </BentoCard>
                </div>
            </div>
        </div>
    )
}



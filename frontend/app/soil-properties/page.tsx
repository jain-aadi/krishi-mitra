"use client"

import { BentoCard } from "@/components/bento-card"
import { MiniLine } from "@/components/charts/mini-line"
import { MiniBar } from "@/components/charts/mini-bar"
import { MiniGauge } from "@/components/charts/mini-gauge"
import { AreaTrend } from "@/components/charts/area-trend"

export default function SoilPropertiesPage() {
    return (
        <div className="min-h-screen p-6 md:p-8">
            <div className="w-full max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Soil Properties</h1>
                <p className="text-muted-foreground mb-6">Soil profile and recommendations for your location</p>

                <div className="grid grid-cols-1 sm:grid-cols-6 auto-rows-[160px] md:auto-rows-[190px] lg:auto-rows-[220px] gap-4">
                    <div className="sm:col-span-3 sm:row-span-2">
                        <BentoCard title="pH Level" subtitle="Recent readings" className="h-full">
                            <AreaTrend values={[6.2, 6.3, 6.4, 6.5, 6.6, 6.55, 6.6, 6.7]} />
                            <div className="mt-3 text-sm text-muted-foreground">Target range 6.0 - 7.5</div>
                        </BentoCard>
                    </div>

                    <div className="sm:col-span-2 sm:row-span-1">
                        <BentoCard title="Soil Type" subtitle="Classified" className="h-full">
                            <ul className="list-disc pl-5 text-sm leading-7">
                                <li>Loamy</li>
                                <li>Good drainage</li>
                                <li>Moderate organic matter</li>
                            </ul>
                        </BentoCard>
                    </div>

                    <div className="sm:col-span-1 sm:row-span-1">
                        <BentoCard title="Moisture" subtitle="Topsoil" className="h-full">
                            <MiniGauge value={0.58} label="Adequate" />
                        </BentoCard>
                    </div>

                    <div className="sm:col-span-3 sm:row-span-1">
                        <BentoCard title="Ground Water" subtitle="Well level" className="h-full">
                            <MiniGauge value={0.64} label="Stable" size={160} />
                            <div className="mt-3">
                                <AreaTrend values={[55, 57, 59, 60, 62, 61, 63, 62, 64, 65]} height={160} />
                                <div className="mt-2 text-xs text-muted-foreground">Last 10 days groundwater index</div>
                            </div>
                        </BentoCard>
                    </div>

                    <div className="sm:col-span-3 sm:row-span-1">
                        <BentoCard title="Suitable Crops" subtitle="Based on soil profile" className="h-full">
                            <ul className="list-disc pl-5 text-sm leading-7">
                                <li>Wheat (HD 2967)</li>
                                <li>Chickpea (JG 11)</li>
                                <li>Mustard (Pusa Bold)</li>
                            </ul>
                        </BentoCard>
                    </div>

                    <div className="sm:col-span-3 sm:row-span-1">
                        <BentoCard title="Moisture Trend" subtitle="Last 10 days" className="h-full">
                            <MiniBar values={[42, 44, 41, 46, 50, 48, 55, 53, 51, 49]} />
                        </BentoCard>
                    </div>
                </div>
            </div>
        </div>
    )
}



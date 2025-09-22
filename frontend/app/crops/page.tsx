"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Crop = {
    id: string
    name: string
    imageUrl: string
    soilType: string
    season: string
    durationDays: string
    phRange: string
    waterNeeds: string
    notes?: string
}

const CROPS: Crop[] = [
    {
        id: "rice",
        name: "Rice",
        imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5c7f0b2a1a?w=800&q=60&fit=crop",
        soilType: "Clayey to loamy, good water retention",
        season: "Kharif (monsoon)",
        durationDays: "110–140 days",
        phRange: "5.5 – 7.0",
        waterNeeds: "High (standing water in early growth)",
        notes: "Requires puddled fields and warm temperatures",
    },
    {
        id: "wheat",
        name: "Wheat",
        imageUrl: "https://images.unsplash.com/photo-1500937386664-56f3b2e3b319?w=800&q=60&fit=crop",
        soilType: "Well-drained loam to clay loam",
        season: "Rabi (winter)",
        durationDays: "120–150 days",
        phRange: "6.0 – 7.5",
        waterNeeds: "Moderate (4–5 irrigations)",
    },
    {
        id: "maize",
        name: "Maize",
        imageUrl: "https://images.unsplash.com/photo-1530906624919-4f57b08c6cde?w=800&q=60&fit=crop",
        soilType: "Fertile well-drained loam",
        season: "Kharif / Rabi (depending on region)",
        durationDays: "90–110 days",
        phRange: "5.8 – 7.2",
        waterNeeds: "Moderate",
    },
    {
        id: "pigeon-pea",
        name: "Pigeon Pea",
        imageUrl: "https://images.unsplash.com/photo-1602294971101-8d4f3a4e43bf?w=800&q=60&fit=crop",
        soilType: "Light to medium loam, well-drained",
        season: "Kharif",
        durationDays: "150–180 days",
        phRange: "6.0 – 7.5",
        waterNeeds: "Low to moderate (drought tolerant)",
    },
    {
        id: "mustard",
        name: "Mustard",
        imageUrl: "https://images.unsplash.com/photo-1615485737657-8a2ff4a5395d?w=800&q=60&fit=crop",
        soilType: "Sandy loam to loam, well-drained",
        season: "Rabi",
        durationDays: "100–120 days",
        phRange: "6.0 – 7.5",
        waterNeeds: "Low to moderate",
    },
]

export default function CropsPage() {
    return (
        <div className="min-h-screen p-6 md:p-8">
            <div className="w-full max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Crops</h1>
                <p className="text-muted-foreground mb-6">Recommended crop profiles with optimal conditions</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {CROPS.map((c) => (
                        <Card key={c.id} className="h-full">
                            <CardHeader className="pb-3">
                                <div className="w-full aspect-[4/3] bg-muted/40 rounded-md overflow-hidden">
                                    <img src={c.imageUrl} alt={c.name} className="h-full w-full object-cover" />
                                </div>
                                <CardTitle className="mt-3">{c.name}</CardTitle>
                                <CardDescription>{c.season}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div>
                                    <span className="font-medium">Soil:</span> {c.soilType}
                                </div>
                                <div>
                                    <span className="font-medium">Duration:</span> {c.durationDays}
                                </div>
                                <div>
                                    <span className="font-medium">pH:</span> {c.phRange}
                                </div>
                                <div>
                                    <span className="font-medium">Water:</span> {c.waterNeeds}
                                </div>
                                {c.notes && (
                                    <div className="text-muted-foreground">{c.notes}</div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}



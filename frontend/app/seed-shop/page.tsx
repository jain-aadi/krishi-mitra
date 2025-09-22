"use client"

import { SeedCard, type SeedProduct } from "@/components/seed-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const MOCK: SeedProduct[] = [
    { id: "1", name: "CFL 1522 Cauliflower Seeds – High Yield, Compact Dome", brand: "Syngenta", imageUrl: "https://images.unsplash.com/photo-1589927986089-35812388d1eb?w=640&q=60&fit=crop", price: 739, mrp: 949, discountPct: 22 },
    { id: "2", name: "Surabhi Coriander Seeds – High Yield, Multicut", brand: "Namdhari Seeds", imageUrl: "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=640&q=60&fit=crop", price: 165, mrp: 270, discountPct: 39 },
    { id: "3", name: "Saaho TO-3251 Tomato Seeds – High Yield", brand: "Syngenta", imageUrl: "https://images.unsplash.com/photo-1546470427-e31b74e8d4bc?w=640&q=60&fit=crop", price: 1049, mrp: 1525, discountPct: 31 },
    { id: "4", name: "NS 404 F1 Hybrid Cucumber Seeds – High Yield & Quality", brand: "Namdhari Seeds", imageUrl: "https://images.unsplash.com/photo-1546470422-5f26b71f1f4b?w=640&q=60&fit=crop", price: 199, mrp: 300, discountPct: 34 },
    { id: "5", name: "Papaya Hybrid Seeds", brand: "VNR", imageUrl: "https://images.unsplash.com/photo-1604908176997-4316c5f3eae9?w=640&q=60&fit=crop", price: 299, mrp: 399, discountPct: 25 },
    { id: "6", name: "Bitter Gourd Hybrid Seeds", brand: "VNR", imageUrl: "https://images.unsplash.com/photo-1590179692566-4e49a2f0a8d2?w=640&q=60&fit=crop", price: 225, mrp: 320, discountPct: 30 },
]

export default function SeedShopPage() {
    return (
        <div className="min-h-screen p-6 md:p-8">
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex items-center justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Seed Marketplace</h1>
                        <p className="text-muted-foreground">Browse and compare crop seeds and prices</p>
                    </div>
                    <div className="flex gap-2 w-full max-w-md">
                        <Input placeholder="Search seeds or brands..." />
                        <Button>Search</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {MOCK.map((p) => (
                        <SeedCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    )
}



"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export interface SeedProduct {
    id: string
    name: string
    brand: string
    imageUrl: string
    price: number
    mrp?: number
    sizeLabel?: string
    discountPct?: number
}

interface SeedCardProps {
    product: SeedProduct
}

export function SeedCard({ product }: SeedCardProps) {
    const { name, brand, imageUrl, price, mrp } = product
    const showDiscount = !!product.discountPct || (mrp && mrp > price)
    const save = mrp ? Math.max(0, mrp - price) : 0
    return (
        <Card className="relative h-full">
            {showDiscount && (
                <div className="absolute left-3 top-3 text-xs font-semibold bg-amber-400 text-amber-950 px-2 py-1 rounded">
                    {product.discountPct ? `${product.discountPct}% OFF` : `Save ₹${save}`}
                </div>
            )}
            <CardHeader className="pb-2">
                <div className="w-full aspect-[4/3] bg-muted/40 rounded-md flex items-center justify-center overflow-hidden">
                    <img src={imageUrl} alt={name} className="h-full w-full object-contain p-2" />
                </div>
                <CardTitle className="text-base line-clamp-2 min-h-[2.5rem]">{name}</CardTitle>
                <CardDescription className="mt-1">{brand}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-baseline gap-2">
                    <div className="text-lg font-semibold">₹{price}</div>
                    {mrp && mrp > price && <div className="text-sm text-muted-foreground line-through">₹{mrp}</div>}
                </div>
                {save > 0 && <div className="text-xs text-green-600">Save ₹{save}</div>}
                <div className="flex gap-2">
                    <Button className="w-full" size="sm">Add to cart</Button>
                </div>
            </CardContent>
        </Card>
    )
}



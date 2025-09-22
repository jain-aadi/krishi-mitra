import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface BentoCardProps {
    title: string
    subtitle?: string
    children: ReactNode
    className?: string
}

export function BentoCard({ title, subtitle, children, className }: BentoCardProps) {
    return (
        <Card className={`flex flex-col ${className || ""}`}>
            <CardHeader className="pb-3">
                {subtitle && <CardDescription>{subtitle}</CardDescription>}
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">{children}</CardContent>
        </Card>
    )
}



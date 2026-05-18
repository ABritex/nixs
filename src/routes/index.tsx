import { createFileRoute } from '@tanstack/react-router'
import { Hero } from "@/features/landing-page"

export const Route = createFileRoute('/')({ component: Home })

function Home() {
    return (
        <div className="text-foreground font-mono">
            <Hero />
        </div>
    )
}

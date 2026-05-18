import { createFileRoute } from '@tanstack/react-router'
import { TechStack, Achievements, ToolsGrid } from "@/features/showcase"

export const Route = createFileRoute('/show-case')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className="w-full max-w-6xl mx-auto px-4 py-20 space-y-32">
            <TechStack />
            <ToolsGrid />
            <Achievements />
        </main>
    )
}

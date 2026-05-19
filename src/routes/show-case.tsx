import { createFileRoute } from '@tanstack/react-router'
import { FeaturedWork, TechStack, ToolsGrid, GraphicsShowcase, LearningSection } from "@/features/showcase"

export const Route = createFileRoute('/show-case')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className="w-full max-w-6xl mx-auto px-4 py-20 space-y-32">
            <FeaturedWork />
            <TechStack />
            <ToolsGrid />
            <GraphicsShowcase />
            <LearningSection />
        </main>
    )
}

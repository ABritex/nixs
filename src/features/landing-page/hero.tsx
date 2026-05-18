import { Suspense, lazy } from 'react'
import HeroSection from './sections/hero-section'
import SectionDivider from './components/section-divider'

const TimelineSection = lazy(() => import('./sections/timeline-section'))
const SkillsSection = lazy(() => import('./sections/skills-section'))
const WorkSection = lazy(() => import('./sections/work-section'))
const ContactSection = lazy(() => import('./sections/contact-section'))

export default function Hero() {
    return (
        <div className="font-mono overflow-x-hidden">
            <HeroSection />
            <SectionDivider />
            <Suspense fallback={<SectionSkeleton />}>
                <TimelineSection />
            </Suspense>
            <SectionDivider text="tech stack • tools • systems" />
            <Suspense fallback={<SectionSkeleton />}>
                <SkillsSection />
            </Suspense>
            <SectionDivider text="projects • builds • open source" />
            <Suspense fallback={<SectionSkeleton />}>
                <WorkSection />
            </Suspense>
            <SectionDivider text="let&apos;s connect • collaborate • create" />
            <Suspense fallback={<SectionSkeleton />}>
                <ContactSection />
            </Suspense>
        </div>
    )
}

function SectionSkeleton() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-4xl mx-auto space-y-6 animate-pulse">
                <div className="h-4 w-32 bg-muted/30 rounded mx-auto" />
                <div className="h-10 w-64 bg-muted/20 rounded mx-auto" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-24 bg-muted/10 rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    )
}

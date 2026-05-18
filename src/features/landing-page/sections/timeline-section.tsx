import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '#/lib/gsap'
import StarLayer from '../components/star-layer'
import { TIMELINE } from '../constants/timeline'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'

function TimelineCard({ entry }: { entry: { year: string; title: string; desc: string; icon: string; tags: readonly string[] } }) {
    return (
        <div className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm p-5 hover:bg-card/80 transition-all">
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted/30 border border-border/30 overflow-hidden">
                    <img
                        src={entry.icon}
                        alt=""
                        className="h-full w-full object-cover rounded-full"
                        width={48}
                        height={48}
                        loading="lazy"
                    />
                </div>
                <div className="flex-1 space-y-1">
                    <p className="text-xs font-mono text-muted-foreground/50">{entry.year}</p>
                    <p className="text-sm font-bold text-foreground">{entry.title}</p>
                    <p className="text-xs text-muted-foreground/70 leading-relaxed">{entry.desc}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                        {entry.tags.map((t) => (
                            <span key={t} className="text-xs font-mono px-2 py-0.5 bg-muted/30 border border-border/40 rounded text-muted-foreground/60">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function TimelineSection() {
    const ref = useRef<HTMLDivElement>(null)
    const bgRef = useRef<HTMLDivElement>(null)
    const [activeTab, setActiveTab] = useState('work')

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
                yPercent: 12, scale: 1.04, ease: 'none',
                scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
            })
        }, ref)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} className="relative min-h-screen flex items-start justify-center px-6 py-24 overflow-hidden pointer-events-none">
            <div ref={bgRef} className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 30% 50%, hsl(var(--primary)) 0%, transparent 60%), radial-gradient(circle at 70% 50%, hsl(var(--accent)) 0%, transparent 60%)',
                }}
            />
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
                <StarLayer count={100} color="rgba(255,255,255,0.10)" speed={180} />
            </div>

            <div className="relative z-10 w-full max-w-3xl mx-auto space-y-10 pointer-events-auto">
                <div className="text-center space-y-3">
                    <p className="scroll-reveal text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> journey
                    </p>
                    <h2 className="scroll-reveal text-[clamp(28px,5vw,56px)] font-black leading-[1.05] tracking-tight text-foreground" data-delay="100">
                        Timeline
                    </h2>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="scroll-reveal cursor-target mx-auto w-fit" data-delay="150">
                        <TabsTrigger value="work">Work Experience</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                    </TabsList>

                    <TabsContent value="work" className="space-y-4 pt-6">
                        {TIMELINE.work.map((entry, i) => (
                            <div key={`work-${i}-${activeTab}`} className="scroll-reveal-left cursor-target" data-delay={200 + i * 100}>
                                <TimelineCard entry={entry} />
                            </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="education" className="space-y-4 pt-6">
                        {TIMELINE.education.map((entry, i) => (
                            <div key={`edu-${i}-${activeTab}`} className="scroll-reveal-right cursor-target" data-delay={200 + i * 100}>
                                <TimelineCard entry={entry} />
                            </div>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

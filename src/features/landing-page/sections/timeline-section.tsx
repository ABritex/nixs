import { useEffect, useRef } from 'react'
import { gsap } from '#/lib/gsap'
import { TIMELINE } from '../constants/timeline'
import { ExternalLink, Briefcase, GraduationCap } from 'lucide-react'

export default function TimelineSection() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const entries = ref.current?.querySelectorAll('.tl-entry')
            if (!entries) return
            gsap.fromTo(entries,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: ref.current, start: 'top 75%' },
                }
            )
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} className="relative px-6 py-24 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 30% 0%, hsl(var(--accent) / 0.03) 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, hsl(var(--primary) / 0.02) 0%, transparent 50%)',
                }}
            />

            <div className="max-w-3xl mx-auto">
                <div className="text-center space-y-3 mb-16">
                    <p className="text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> journey
                    </p>
                    <h2 className="text-[clamp(28px,5vw,56px)] font-black leading-[1.05] tracking-tight text-foreground">
                        Timeline
                    </h2>
                    <div className="flex justify-center gap-1.5 mt-3">
                        <span className="w-6 h-0.5 rounded-full bg-accent/60" />
                        <span className="w-6 h-0.5 rounded-full bg-primary/40" />
                        <span className="w-6 h-0.5 rounded-full bg-secondary/40" />
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-border/30 to-transparent" />

                    <div className="space-y-10">
                        {/* ─── Work ─── */}
                        <div className="tl-entry">
                            <div className="flex items-center gap-3 mb-4 pl-10">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 border border-accent/20">
                                    <Briefcase className="w-3 h-3 text-accent" />
                                </div>
                                <span className="text-xs font-mono text-accent/70 tracking-widest uppercase font-semibold">Work</span>
                                <div className="h-px flex-1 bg-border/10" />
                            </div>

                            <div className="space-y-6">
                                {TIMELINE.work.map((entry, i) => {
                                    const role = entry.roles[0]
                                    return (
                                        <div key={i} className="relative pl-10 group">
                                            <div className="absolute left-[13px] top-[22px] w-3 h-3 rounded-full border-2 border-accent/50 bg-background group-hover:bg-accent/20 group-hover:border-accent transition-all duration-300 z-10" />

                                            <div className="rounded-lg border border-border/20 bg-card/30 p-5 hover:bg-card/50 hover:border-border/40 transition-all duration-300">
                                                <div className="flex items-start justify-between gap-3 mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <img src={entry.icon} alt="" className="w-8 h-8 rounded-full object-cover border border-border/20" loading="lazy" decoding="async" />
                                                        <div>
                                                            <p className="text-sm font-bold text-foreground">{entry.company}</p>
                                                            {role && <p className="text-xs text-muted-foreground/60 mt-0.5">{role.title}</p>}
                                                        </div>
                                                    </div>
                                                    {role && (
                                                        <span className="shrink-0 text-[9px] font-mono text-muted-foreground/40 px-2 py-0.5 rounded-full border border-border/20 whitespace-nowrap">
                                                            {role.period}
                                                        </span>
                                                    )}
                                                </div>

                                                {entry.roles.map((r, ri) => (
                                                    <ul key={ri} className="space-y-1.5">
                                                        {r.bullets.map((b, j) => (
                                                            <li key={j} className="text-xs text-muted-foreground/60 leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-accent/40">
                                                                {b}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* ─── Education ─── */}
                        <div className="tl-entry">
                            <div className="flex items-center gap-3 mb-4 pl-10">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 border border-primary/20">
                                    <GraduationCap className="w-3 h-3 text-primary" />
                                </div>
                                <span className="text-xs font-mono text-primary/70 tracking-widest uppercase font-semibold">Education</span>
                                <div className="h-px flex-1 bg-border/10" />
                            </div>

                            <div className="space-y-6">
                                {TIMELINE.education.map((entry, i) => (
                                    <div key={i} className="relative pl-10 group">
                                        <div className="absolute left-[13px] top-[22px] w-3 h-3 rounded-full border-2 border-primary/50 bg-background group-hover:bg-primary/20 group-hover:border-primary transition-all duration-300 z-10" />

                                        <div className="rounded-lg border border-border/20 bg-card/30 p-5 hover:bg-card/50 hover:border-border/40 transition-all duration-300">
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <div className="flex items-center gap-3">
                                                    <img src={entry.icon} alt="" className="w-8 h-8 rounded-full object-cover border border-border/20" loading="lazy" decoding="async" />
                                                    <div>
                                                        <p className="text-sm font-bold text-foreground">{entry.school}</p>
                                                        <p className="text-xs text-muted-foreground/60 mt-0.5">{entry.degree}</p>
                                                    </div>
                                                </div>
                                                <span className="shrink-0 text-[9px] font-mono text-muted-foreground/40 px-2 py-0.5 rounded-full border border-border/20 whitespace-nowrap">
                                                    {entry.period}
                                                </span>
                                            </div>

                                            {entry.achievements.length > 0 && (
                                                <ul className="space-y-1.5 mt-2">
                                                    {entry.achievements.map((a, i) => (
                                                        <li key={i} className="text-xs text-muted-foreground/60 leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-primary/40">
                                                            {a}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {entry.button && (
                                                <a href={entry.button.href} target="_blank" rel="noopener noreferrer"
                                                    className="cursor-target inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:text-accent/80 transition-colors mt-3"
                                                >
                                                    {entry.button.label}
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

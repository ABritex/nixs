import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShapeGrid from '@/components/shape-grid'
import { CATEGORIES, SKILLS_BY_CAT } from '../constants'
import { LogoLoop } from '@/components/ui/logo-loop'

gsap.registerPlugin(ScrollTrigger)

export default function SkillsSection() {
    const ref = useRef<HTMLDivElement>(null)
    const bgRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const barRef = useRef<(HTMLDivElement | null)[]>([])
    const [activeCat, setActiveCat] = useState('frontend')

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
                yPercent: -12, scale: 1.04, ease: 'none',
                scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
            })

            gsap.fromTo(gridRef.current?.querySelectorAll('.skill-card')!,
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out',
                    scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'center 35%', scrub: 1 },
                }
            )
        }, ref)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, hsl(var(--background)), hsl(var(--muted) / 0.3), hsl(var(--background)))' }}
        >
            <div ref={bgRef} className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 50% 0%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 80% 100%, hsl(var(--accent)) 0%, transparent 50%)',
                }}
            />
            <div className="absolute inset-0 pointer-events-none opacity-[0.10]">
                <ShapeGrid speed={0.3} squareSize={32} borderColor="rgba(255,255,255,0.06)" shape="square" direction="right" />
            </div>
            <div className="relative z-10 w-full max-w-6xl mx-auto space-y-10 md:space-y-12">
                <div className="text-center space-y-3">
                    <p className="scroll-reveal text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> skillset
                    </p>
                    <h2 className="scroll-reveal text-[clamp(28px,5vw,56px)] font-black leading-[1.05] tracking-tight text-foreground" data-delay="100">
                        Tech Stack
                    </h2>
                </div>

                <div className="scroll-reveal flex items-center justify-center gap-2 flex-wrap" data-delay="150">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCat(cat.id)}
                            className={`px-4 py-2 rounded-xl border text-[11px] font-bold tracking-[.15em] uppercase transition-all ${activeCat === cat.id
                                    ? `${cat.bgColor} ${cat.borderColor} ${cat.color}`
                                    : 'border-border/40 text-muted-foreground/60 hover:border-border hover:text-foreground'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto w-full">
                    {SKILLS_BY_CAT[activeCat].map((skill, i) => {
                        const cat = CATEGORIES.find(c => c.id === activeCat)!
                        return (
                            <div key={skill.name}
                                className="skill-card scroll-reveal-scale rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm p-4 hover:border-primary/30 hover:bg-card/80 transition-all cursor-default"
                                data-delay={200 + i * 80}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-semibold text-foreground">{skill.name}</p>
                                    <span className={`text-[10px] tabular-nums font-bold ${cat.color}`}>{skill.pct}%</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                                    <div ref={(el) => { barRef.current[i] = el }}
                                        className={`h-full rounded-full ${cat.color.replace('text-', 'bg-')}`}
                                        style={{ width: `${skill.pct}%`, transformOrigin: 'left center', transform: 'scaleX(0)' }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="pt-8 space-y-4">
                    <p className="scroll-reveal text-center text-xs tracking-[0.2em] text-muted-foreground/30 uppercase font-mono">
                        Projects &amp; Products
                    </p>
                    <div className="scroll-reveal" data-delay="200">
                        <LogoLoop
                            logos={[
                                {
                                    node: (
                                        <div className="flex items-center gap-2">
                                            <img src="/images/projects/mindful-logo.webp" alt="Mindful Companion" className="h-5 w-5 rounded object-cover" />
                                            <span className="text-sm font-mono text-muted-foreground/60 whitespace-nowrap">Mindful Companion</span>
                                        </div>
                                    ),
                                    title: "Mindful Companion",
                                    ariaLabel: "Mindful Companion",
                                },
                                {
                                    node: (
                                        <div className="flex items-center gap-2">
                                            <div className="h-5 w-5 rounded bg-[#BA7517]/20 flex items-center justify-center text-xs">🎵</div>
                                            <span className="text-sm font-mono text-muted-foreground/60 whitespace-nowrap">Minstrel</span>
                                        </div>
                                    ),
                                    title: "Minstrel",
                                    ariaLabel: "Minstrel",
                                },
                                {
                                    node: (
                                        <div className="flex items-center gap-2">
                                            <img src="/images/projects/jndm-logo.webp" alt="JNDM Store" className="h-5 w-5 rounded object-cover" />
                                            <span className="text-sm font-mono text-muted-foreground/60 whitespace-nowrap">JNDM Sari-Sari Store</span>
                                        </div>
                                    ),
                                    title: "JNDM Sari-Sari Store",
                                    ariaLabel: "JNDM Sari-Sari Store",
                                },
                                {
                                    node: (
                                        <div className="flex items-center gap-2">
                                            <img src="/images/projects/empire-logo.png" alt="The Empire" className="h-5 w-5 rounded object-cover" />
                                            <span className="text-sm font-mono text-muted-foreground/60 whitespace-nowrap">The Empire</span>
                                        </div>
                                    ),
                                    title: "The Empire",
                                    ariaLabel: "The Empire",
                                },
                            ]}
                            speed={80}
                            direction="left"
                            logoHeight={28}
                            gap={48}
                            pauseOnHover
                            fadeOut
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

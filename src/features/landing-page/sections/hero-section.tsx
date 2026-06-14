import { useEffect, useRef } from 'react'
import { gsap, SplitText } from '#/lib/gsap'
import { PERSON } from '#/constants/personal'
import { SOCIALS } from '../constants'

const HIRE_STATS = [
    { value: 2022, suffix: '', label: 'Active Since' },
    { value: 27, suffix: '', label: 'Projects Shipped' },
    { value: 5, suffix: '+', label: 'Clients Served' },
]

const TECH = ['React', 'Node', 'TypeScript', 'Python', 'Postgres', 'Next.js']

export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const badgeRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const techRef = useRef<HTMLDivElement>(null)
    const socialsRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const avatarWrapRef = useRef<HTMLDivElement>(null)
    const orbit1Ref = useRef<HTMLDivElement>(null)
    const orbit2Ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            tl.fromTo(avatarWrapRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 })
            tl.fromTo(orbit1Ref.current, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, '-=0.4')
            tl.fromTo(orbit2Ref.current, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, '-=0.6')

            if (headingRef.current) {
                const split = new SplitText(headingRef.current, { type: 'chars' })
                tl.fromTo(split.chars,
                    { yPercent: 100, opacity: 0 },
                    { yPercent: 0, opacity: 1, duration: 0.45, stagger: 0.018 },
                    '-=0.3'
                )
            }

            tl.fromTo(badgeRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.25 }, '-=0.1')
            tl.fromTo(subtitleRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25 })
            tl.fromTo(statsRef.current?.children ?? [], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.05 }, '-=0.05')
            tl.fromTo(ctaRef.current?.children ?? [], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.05 }, '-=0.05')
            tl.fromTo(techRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 }, '-=0')
            tl.fromTo(socialsRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.25 }, '-=0')
            tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, '-=0')
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-4 pt-2 pb-16  overflow-hidden ">
            <div className="relative z-10 w-full max-w-2xl mx-auto text-center space-y-6">
                <div ref={badgeRef}
                    className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase"
                    style={{ border: '1px solid hsl(var(--accent) / 0.3)', background: 'hsl(var(--accent) / 0.06)', color: 'hsl(var(--accent))' }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Open for work — available now
                </div>

                <div className="flex justify-center">
                    <div ref={avatarWrapRef} className="relative group">
                        <div ref={orbit1Ref}
                            className="absolute inset-0 rounded-full transition-all duration-500 group-hover:scale-125 group-hover:border-accent/40"
                            style={{
                                border: '1px solid hsl(var(--accent) / 0.15)',
                                transform: 'scale(1.2)',
                            }}
                        />
                        <div ref={orbit2Ref}
                            className="absolute inset-0 rounded-full transition-all duration-500 group-hover:scale-140 group-hover:border-accent/30"
                            style={{
                                border: '1px dashed hsl(var(--primary) / 0.12)',
                                transform: 'scale(1.35)',
                            }}
                        />
                        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mx-auto transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_80px_hsl(var(--accent)/0.25)]"
                            style={{
                                border: '2px solid hsl(var(--border) / 0.3)',
                                background: 'hsl(var(--card))',
                                boxShadow: '0 0 60px hsl(var(--accent) / 0.12)',
                            }}
                        >
                            <img src="/images/1by1.png" alt={PERSON.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                loading="lazy" decoding="async"
                            />
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[8px] font-mono text-accent tracking-widest uppercase whitespace-nowrap">
                            Click to connect
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-xs font-mono text-muted-foreground/70 tracking-[0.2em] uppercase">{PERSON.name}</p>

                    <h1 ref={headingRef} className="text-[clamp(28px,5vw,52px)] font-black leading-[1.05] tracking-[-0.02em] text-foreground text-balance">
                        Full-stack builder who ships products that work.
                    </h1>

                    <p ref={subtitleRef} className="text-sm text-muted-foreground/80 max-w-md mx-auto leading-relaxed text-balance">
                        Python & TypeScript — I build things that work, from concept to deployment.
                    </p>
                </div>

                <div ref={statsRef} className="flex items-center justify-center gap-6 md:gap-10">
                    {HIRE_STATS.map((s) => (
                        <div key={s.label} className="text-center">
                            <p className="text-lg md:text-xl font-black text-foreground">
                                {s.value}<span className="text-xs text-muted-foreground/60 font-mono">{s.suffix}</span>
                            </p>
                            <p className="text-[9px] font-mono text-muted-foreground/60 tracking-wide">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div ref={ctaRef} className="flex items-center justify-center gap-3 pt-1">
                    <a href="/contact-me" className="cursor-target inline-flex px-6 py-2.5 rounded-full bg-foreground text-background text-xs font-semibold font-mono hover:opacity-90 transition-all">
                        Hire Me
                    </a>
                    <a href="/show-case" className="cursor-target inline-flex px-6 py-2.5 rounded-full bg-card text-foreground text-xs font-mono border border-border/50 hover:bg-foreground/10 transition-all">
                        View Projects
                    </a>
                    <a href="/resume-n.pdf" target="_blank" className="cursor-target inline-flex px-6 py-2.5 rounded-full bg-card text-foreground text-xs font-mono border border-border/30 hover:bg-foreground/10 transition-all">
                        ↓ Resume
                    </a>
                </div>

                <div ref={techRef} className="flex items-center justify-center gap-3 pt-1">
                    {TECH.map((t) => (
                        <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded"
                            style={{ background: 'hsl(var(--card))', color: 'hsl(var(--muted-foreground) / 0.8)', border: '1px solid hsl(var(--border) / 0.3)' }}
                        >
                            {t}
                        </span>
                    ))}
                </div>

                <div ref={socialsRef} className="flex items-center justify-center gap-4 pt-2">
                    {SOCIALS.map((s) => (
                        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                            className="text-[10px] font-mono text-muted-foreground/60 hover:text-foreground transition-colors tracking-wider uppercase"
                        >
                            <img src={s.icon} alt="" className="w-3 h-3 inline-block mr-1.5 dark:invert" />
                            {s.label}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

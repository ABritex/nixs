import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PERSON } from '@/constants/personal'
import ShapeGrid from '@/components/shape-grid'
import StarLayer from '../components/star-layer'
import { SOCIALS } from '../constants'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const badgeRef = useRef<HTMLDivElement>(null)
    const cmdRef = useRef<HTMLParagraphElement>(null)
    const bioRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
            tl.fromTo(cmdRef.current, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4 })
            tl.fromTo(imgRef.current, { opacity: 0, scale: 0.8, y: 40, rotate: -3 }, { opacity: 1, scale: 1, y: 0, rotate: 0, duration: 0.9, ease: 'back.out(1.7)' }, '-=0.2')
            tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
            tl.fromTo(bioRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
            tl.fromTo(ctaRef.current?.querySelectorAll('.btn-pop')!, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: 'back.out(2)' }, '-=0.1')
            tl.fromTo(scrollRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1')

            gsap.to(glowRef.current, {
                yPercent: 20, scale: 1.1, ease: 'none',
                scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
            })
            gsap.to(badgeRef.current, {
                yPercent: -15, ease: 'none',
                scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1 },
            })
        }, ref)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center bg-background px-6 pt-24 pb-20 overflow-hidden">
            <div ref={glowRef} className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
                style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.3), transparent)' }}
            />
            <div ref={badgeRef} className="pointer-events-none absolute top-32 left-8 text-[10px] text-muted-foreground/10 font-mono leading-loose select-none hidden lg:block">
                {'~'.repeat(30)}<br />
                {'>'.repeat(30)}<br />
                {'_'.repeat(30)}
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06]">
                <StarLayer count={200} color="rgba(255,255,255,0.12)" speed={120} />
            </div>

            <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
                <ShapeGrid speed={0.2} squareSize={48} borderColor="rgba(255,255,255,0.04)" shape="hexagon" direction="diagonal" />
            </div>

            <div className="relative w-full max-w-5xl mx-auto z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
                    <div className="lg:col-span-3 space-y-5">
                        <p ref={cmdRef} className="text-xs tracking-[0.25em] text-muted-foreground/40 uppercase font-mono">
                            <span className="text-accent">$</span> cat ~/whoami
                        </p>

                        <div>
                            <p className="text-sm text-muted-foreground/60 mb-2 font-mono">
                                <span className="text-accent">nicholas-abeleda</span> @ <span className="text-primary">fullstack</span> {'>'}
                            </p>
                            <h1 ref={titleRef} className="font-black leading-[0.9] tracking-tight text-[clamp(44px,8vw,96px)] bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                                FULLSTACK DEVELOPER + UI/UX &amp; DESIGN
                            </h1>
                        </div>

                        <p ref={bioRef} className="text-sm text-muted-foreground/60 leading-relaxed max-w-md font-mono">
                            I build full-stack systems with clean architecture and meaningful UI. Node, React, Postgres — Linux on everything.
                        </p>

                        <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-2">
                            {SOCIALS.map((s) => (
                                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                                    className="btn-pop w-10 h-10 flex items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all text-[11px] font-bold"
                                    aria-label={s.label}
                                >
                                    {s.label[0]}{s.label[1]}
                                </a>
                            ))}
                            <a href="/resume.pdf" download
                                className="btn-pop ml-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold tracking-wide hover:opacity-90 transition-all"
                            >
                                Download Resume
                            </a>
                        </div>
                    </div>

                    <div ref={imgRef} className="lg:col-span-2 flex justify-center lg:justify-end">
                        <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
                            <img src="/images/1by1.png" alt={PERSON.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
                        </div>
                    </div>
                </div>

                <div ref={scrollRef} className="flex flex-col items-center gap-1 mt-20 animate-[scrollBounce_1.6s_ease-in-out_infinite]">
                    <span className="text-[10px] tracking-[0.3em] text-muted-foreground/30 uppercase font-mono">scroll</span>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-muted-foreground/30">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </section>
    )
}

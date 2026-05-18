import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShapeGrid from '@/components/shape-grid'
import { PERSON } from '@/constants/personal'
import { SOCIALS } from '../constants'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
    const ref = useRef<HTMLDivElement>(null)
    const bgRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
                yPercent: -15, scale: 1.05, ease: 'none',
                scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
            })
        }, ref)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, hsl(var(--background)), hsl(var(--muted) / 0.3), hsl(var(--background)))' }}
        >
            <div ref={bgRef} className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 50% 30%, hsl(var(--accent)) 0%, transparent 50%), radial-gradient(circle at 50% 70%, hsl(var(--primary)) 0%, transparent 50%)',
                }}
            />
            <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
                <ShapeGrid speed={0.35} squareSize={28} borderColor="rgba(255,255,255,0.05)" shape="hexagon" direction="left" />
            </div>
            <div className="relative z-10 w-full max-w-3xl mx-auto text-center space-y-8 md:space-y-10">
                <p className="scroll-reveal text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                    <span className="text-accent">$</span> contact
                </p>
                <h2 className="scroll-reveal text-[clamp(32px,6vw,64px)] font-black leading-[1.05] tracking-tight text-foreground" data-delay="100">
                    Let&apos;s build something.
                </h2>
                <p className="scroll-reveal text-sm md:text-base text-muted-foreground/70 leading-relaxed max-w-lg mx-auto font-mono" data-delay="200">
                    Whether it&apos;s a full-stack system, a design refresh, or just talking tech — I&apos;m always open to connecting.
                </p>
                <div className="scroll-reveal flex flex-col sm:flex-row items-center justify-center gap-4 pt-2" data-delay="300">
                    <a href={`mailto:${PERSON.email}`}
                        className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all font-mono"
                    >
                        {PERSON.email}
                    </a>
                    {SOCIALS.map((s) => (
                        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                            className="text-sm text-muted-foreground/50 hover:text-foreground transition-colors font-mono"
                        >
                            {s.label}
                        </a>
                    ))}
                </div>
                <p className="scroll-reveal text-xs text-muted-foreground/20 font-mono pt-8" data-delay="400">
                    nicholas-abeleda &copy; 2026
                    <span className="inline-block w-2 h-4 bg-accent/60 animate-pulse ml-2 align-middle" />
                </p>
            </div>
        </section>
    )
}

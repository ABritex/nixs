import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShapeGrid from '@/components/shape-grid'
import StarLayer from '../components/star-layer'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
    const ref = useRef<HTMLDivElement>(null)
    const bgRef = useRef<HTMLDivElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const textRef = useRef<HTMLParagraphElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
                yPercent: 15, scale: 1.05, ease: 'none',
                scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
            })

            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
                    scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'center 45%', scrub: 1 },
                }
            )

            gsap.fromTo(textRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
                    scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'center 40%', scrub: 1 },
                }
            )

            gsap.fromTo(statsRef.current?.querySelectorAll('.stat-item')!,
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out',
                    scrollTrigger: { trigger: ref.current, start: 'top 65%', end: 'center 35%', scrub: 1 },
                }
            )
        }, ref)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center bg-background px-6 overflow-hidden">
            <div ref={bgRef} className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 30% 50%, hsl(var(--primary)) 0%, transparent 60%), radial-gradient(circle at 70% 50%, hsl(var(--accent)) 0%, transparent 60%)',
                }}
            />
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
                <StarLayer count={120} color="rgba(255,255,255,0.10)" speed={180} />
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                <ShapeGrid speed={0.4} squareSize={36} borderColor="rgba(255,255,255,0.04)" shape="square" direction="up" />
            </div>
            <div className="pointer-events-none absolute right-8 top-32 text-[10px] text-muted-foreground/8 font-mono leading-loose select-none hidden lg:block">
                {'>'.repeat(25)}<br />
                {'_'.repeat(25)}<br />
                {'~'.repeat(25)}
            </div>
            <div className="relative z-10 w-full max-w-6xl mx-auto text-center space-y-8 md:space-y-10">
                <h2 ref={headingRef} className="text-[clamp(32px,6vw,72px)] font-black leading-[1.05] tracking-tight text-foreground">
                    Building systems that <span className="text-primary">think</span>,{' '}
                    <span className="text-accent">scale</span>,{' '}
                    <span className="text-secondary">endure</span>
                </h2>
                <p ref={textRef} className="text-sm md:text-base text-muted-foreground/70 leading-relaxed max-w-2xl mx-auto font-mono">
                    I&apos;m a 4th-year IT student based in the Philippines, passionate about full-stack
                    development, UI/UX design, and open-source. Every line is intentional. Every deploy is a commitment.
                </p>
                <div ref={statsRef} className="flex justify-center gap-10 md:gap-16 pt-6">
                    {[
                        { n: '4+', l: 'Years Building' },
                        { n: '20+', l: 'Projects' },
                        { n: '504', l: 'OJT Hours' },
                    ].map((s) => (
                        <div key={s.l} className="stat-item text-center">
                            <p className="text-3xl md:text-5xl font-black text-foreground">{s.n}</p>
                            <p className="text-[11px] tracking-wider text-muted-foreground/40 mt-2 font-mono">{s.l}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

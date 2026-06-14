import { useEffect, useRef } from 'react'
import { gsap } from '#/lib/gsap'
import { PERSON } from '#/constants/personal'
import { SOCIALS } from '../constants'

export default function ContactSection() {
    const ref = useRef<HTMLDivElement>(null)
    const badgeRef = useRef<HTMLParagraphElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const descRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const socialsRef = useRef<HTMLDivElement>(null)
    const footerRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            tl.fromTo(badgeRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 })
            tl.fromTo(headingRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1')
            tl.fromTo(descRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3 }, '-=0.1')
            tl.fromTo(ctaRef.current?.children ?? [], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.07 }, '-=0.05')
            tl.fromTo(socialsRef.current?.children ?? [], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.05 }, '-=0.05')
            tl.fromTo(footerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0')
        }, ref)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pointer-events-none">
            <div className="relative z-10 w-full max-w-3xl mx-auto text-center space-y-8 md:space-y-10 pointer-events-auto">
                <p ref={badgeRef} className="text-xs tracking-[0.25em] text-muted-foreground/50 uppercase font-mono">
                    <span className="text-accent">$</span> contact
                </p>
                <h2 ref={headingRef} className="text-[clamp(32px,6vw,64px)] font-black leading-[1.05] tracking-tight text-foreground">
                    Let&apos;s build it together
                </h2>
                <div className="flex justify-center gap-1.5">
                    <span className="w-6 h-0.5 rounded-full bg-accent/60" />
                    <span className="w-6 h-0.5 rounded-full bg-primary/40" />
                    <span className="w-6 h-0.5 rounded-full bg-secondary/40" />
                </div>
                <p ref={descRef} className="text-sm md:text-base text-muted-foreground/70 leading-relaxed max-w-lg mx-auto font-mono">
                    Whether it&apos;s a full-stack system, a design refresh, or just talking tech — I&apos;m always open to connecting.
                </p>
                <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <a href={`mailto:${PERSON.email}`}
                        className="cursor-target px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all font-mono"
                    >
                        Send Email
                    </a>
                    <a href="/contact-me"
                        className="cursor-target px-6 py-3 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-accent/50 text-sm font-semibold transition-all font-mono"
                    >
                        contact form →
                    </a>
                </div>
                <div ref={socialsRef} className="flex items-center justify-center gap-5 pt-1">
                    {SOCIALS.map((s) => (
                        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                            className="cursor-target text-muted-foreground/40 hover:text-foreground transition-colors"
                        >
                            <img src={s.icon} alt={s.label} className="w-5 h-5 dark:invert opacity-60 hover:opacity-100 transition-opacity" />
                            <span className="sr-only">{s.label}</span>
                        </a>
                    ))}
                </div>
                <p ref={footerRef} className="text-xs text-muted-foreground/40 font-mono pt-8">
                    <span className="text-accent/60">$</span> {PERSON.name.toLowerCase()} &copy; {new Date().getFullYear()}
                    <span className="inline-block w-2 h-4 bg-accent/60 animate-pulse ml-2 align-middle" />
                </p>
            </div>
        </section>
    )
}

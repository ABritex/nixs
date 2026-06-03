import { useEffect, useId, useRef, useState } from 'react'
import { gsap } from '#/lib/gsap'
import { AnimatePresence, motion } from 'framer-motion'
import { PROJECTS, GRAPHICS_DESIGNS } from '#/features/showcase/constants'
import { Tooltip } from '#/components/ui/tooltip-card'
import { LinkPreview } from '#/components/ui/link-preview'
import { useOutsideClick } from '#/hooks/use-outside-click'
import {
    DraggableCardBody,
    DraggableCardContainer,
} from '#/components/ui/draggable-card'

const TECH_DESCRIPTIONS: Record<string, string> = {
    'Next.js': 'React framework with App Router, SSR, and RSC support',
    'React': 'Component-based UI library with hooks and context',
    'TypeScript': 'Typed JavaScript with strict mode and generics',
    'PostgreSQL': 'Relational database with complex queries',
    'Drizzle ORM': 'Type-safe ORM with schema design and migrations',
    'Supabase': 'Backend services with auth, storage, and real-time DB',
    'Firebase': 'BaaS with real-time DB, auth, and cloud functions',
    'Tailwind CSS': 'Utility-first CSS framework for design systems',
    'Node.js': 'Server-side JavaScript with REST APIs and middleware',
    'Discord.js': 'Node.js library for building Discord bots',
    'Flutter': 'Cross-platform mobile framework by Google',
    'Android Studio': 'Official IDE for Android development',
    'Jetpack Compose': 'Modern Android UI toolkit',
    'Prisma': 'Next-generation ORM with schema modeling',
    'Redis': 'In-memory data store for caching and pub/sub',
    'TanStack': 'Query, Table, Router — powerful data utilities',
    'Better Auth': 'Authentication and session management',
    'Neon DB': 'Serverless PostgreSQL with branching',
    'Vercel': 'CI/CD platform with edge functions',
    'Cloudflare': 'CDN, Workers, and R2 storage',
    'Docker': 'Containerization with compose orchestration',
    'Linux': 'Daily driver — Arch & Ubuntu systems',
    'Git': 'Version control with branching, rebasing, and CLI',
    'Bash / Zsh': 'Shell scripting and dotfiles configuration',
    'Figma': 'UI/UX design and prototyping tool',
    'JavaScript': 'ES6+ with async/await patterns',
}

const activeProjects = PROJECTS.filter(p => !p.status || p.status !== 'postponed')

export default function WorkSection() {
    const [active, setActive] = useState<(typeof activeProjects)[number] | null>(null)
    const id = useId()
    const ref = useRef<HTMLDivElement>(null)
    const bgRef = useRef<HTMLDivElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)
    const cardContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
                yPercent: 10, scale: 1.06, ease: 'none',
                scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
            })
        }, ref)

        return () => ctx.revert()
    }, [])

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') setActive(null)
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])

    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [active])

    useOutsideClick(modalRef, () => setActive(null))

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pointer-events-none">
            <div ref={bgRef} className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--secondary)) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--primary)) 0%, transparent 50%)', }} />

            <AnimatePresence>
                {active && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 h-full w-full z-50 pointer-events-auto" onClick={() => setActive(null)} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {active && (
                    <div className="fixed inset-0 grid place-items-center z-[100] pointer-events-auto">
                        <motion.button layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.05 } }} className="fixed top-4 right-4 flex items-center justify-center bg-background border border-border rounded-full h-8 w-8 z-[110] hover:bg-muted transition-colors" onClick={() => setActive(null)}>
                            <CloseIcon />
                        </motion.button>
                        <motion.div layoutId={`card-${active.title}-${id}`} ref={modalRef} className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-card sm:rounded-3xl overflow-hidden border border-border/40">
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <img width={200} height={200} src={active.cover} alt="" className="w-full h-64 lg:h-72 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" loading="lazy" />
                            </motion.div>

                            <div className="flex-1 overflow-auto">
                                <div className="flex justify-between items-start p-4">
                                    <div>
                                        <motion.h3 layoutId={`title-${active.title}-${id}`} className="font-medium text-foreground text-base">
                                            {active.title}
                                        </motion.h3>
                                        <motion.p layoutId={`desc-${active.title}-${id}`} className="text-muted-foreground text-sm mt-1">
                                            {active.period}
                                        </motion.p>
                                    </div>

                                    <div className="flex gap-2">
                                        {active.liveUrl && (
                                            <LinkPreview url={active.liveUrl}>
                                                <motion.a layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} href={active.liveUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-xs rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                                                    Live
                                                </motion.a>
                                            </LinkPreview>
                                        )}
                                        {active.githubUrl && (
                                            <motion.a layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} href={active.githubUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-xs rounded-full font-bold bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
                                                GitHub
                                            </motion.a>
                                        )}
                                    </div>
                                </div>
                                <div className="px-4 pb-6">
                                    <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-muted-foreground text-sm leading-relaxed">
                                        {active.desc}
                                    </motion.p>
                                    <div className="flex flex-wrap gap-1.5 mt-4">
                                        {active.techs.map((t) => (
                                            <Tooltip key={t} content={TECH_DESCRIPTIONS[t] || t} containerClassName="text-muted-foreground" >
                                                <span className="text-[10px] font-mono px-2 py-1 bg-muted/30 border border-border/40 rounded cursor-default hover:border-accent/30 transition-colors">
                                                    {t}
                                                </span>
                                            </Tooltip>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="relative z-10 w-full max-w-6xl mx-auto space-y-10 pointer-events-auto">
                <div className="text-center space-y-3">
                    <p className="scroll-reveal text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> projects
                    </p>
                    <h2 className="scroll-reveal text-[clamp(28px,5vw,56px)] font-black leading-[1.05] tracking-tight text-foreground" data-delay="100">
                        What I&apos;ve Built
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4 max-w-4xl mx-auto">
                    {activeProjects.map((p, i) => (
                        <motion.div layoutId={`card-${p.title}-${id}`} key={p.title} onClick={() => setActive(p)} className="scroll-reveal cursor-target p-4 flex flex-col hover:bg-card/50 rounded-xl cursor-pointer transition-colors" data-delay={200 + i * 100}>
                            <div className="flex gap-4 flex-col w-full">
                                <motion.div layoutId={`image-${p.title}-${id}`}>
                                    <div className="relative h-48 rounded-lg overflow-hidden bg-muted/20">
                                        <img width={400} height={192} src={p.cover} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
                                        {p.liveUrl && (
                                            <span className="absolute top-2 right-2 text-xs font-mono px-1.5 py-0.5 rounded bg-secondary/80 text-secondary-foreground border border-secondary/40">
                                                live
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                                <div className="flex justify-center items-center flex-col">
                                    <motion.h3 layoutId={`title-${p.title}-${id}`} className="font-medium text-foreground text-center text-base">
                                        {p.title}
                                    </motion.h3>
                                    <motion.p layoutId={`desc-${p.title}-${id}`} className="text-muted-foreground text-center text-xs mt-1 line-clamp-2">
                                        {p.desc}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="scroll-reveal text-center space-y-4 pt-16" data-delay="300">
                    <div className="flex items-center justify-center gap-3">
                        <span className="h-px w-6 bg-accent/20" />
                        <p className="text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                            <span className="text-accent">$</span> design work
                        </p>
                        <span className="h-px w-6 bg-accent/20" />
                    </div>
                    <h3 className="text-[clamp(20px,4vw,40px)] font-black leading-[1.05] tracking-tight text-foreground">
                        Graphics <span className="text-accent/70">Preview</span>
                    </h3>
                    <p className="text-xs text-muted-foreground/50 font-mono max-w-xs mx-auto leading-relaxed">
                        Design isn&apos;t ornament — it&apos;s intent. Every pixel placed to
                        communicate, guide, or delight.
                    </p>
                </div>

                <div className="scroll-reveal" data-delay="350">
                    <DraggableCardContainer
                        ref={cardContainerRef}
                        className="relative w-full h-[32rem] rounded-xl border border-border/5 bg-muted/[0.02]"
                    >
                        {[...GRAPHICS_DESIGNS].sort(() => Math.random() - 0.5).slice(0, 7).map((g, i) => {
                            const rots = ['-rotate-3', 'rotate-2', 'rotate-5', '-rotate-4', 'rotate-3', '-rotate-2', 'rotate-6']
                            const isVideo = g.type === 'video'
                            return (
                                <DraggableCardBody
                                    key={g.id}
                                    dragConstraintsRef={cardContainerRef}
                                    className={`cursor-grab cursor-target active:cursor-grabbing absolute p-0 w-36 sm:w-44 ${rots[i]}`}
                                    style={{ top: `${8 + (i % 4) * 26}%`, left: `${4 + (i % 3) * 34}%` }}
                                >
                                    {isVideo ? (
                                        <video src={g.src} className="pointer-events-none w-full aspect-video object-cover" muted loop autoPlay playsInline />
                                    ) : (
                                        <img src={g.src} alt={g.title} className="pointer-events-none block w-full" loading="lazy" />
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 to-transparent p-2 pt-6">
                                        <p className="text-[10px] font-semibold text-white drop-shadow-sm leading-tight">{g.title}</p>
                                    </div>
                                </DraggableCardBody>
                            )
                        })}
                        <a
                            href="/show-case#graphics"
                            className="cursor-target absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 px-5 py-3 rounded-full bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-xs font-mono border border-border/60 font-semibold hover:bg-accent hover:text-accent-foreground hover:border-accent hover:scale-105 transition-all shadow-lg pointer-events-auto select-none"
                        >
                            <span className="mr-1.5 opacity-60">▸</span> all graphics
                        </a>
                    </DraggableCardContainer>
                </div>

                <div className="scroll-reveal flex items-center justify-center gap-4 text-[10px] font-mono" data-delay="400">
                    <p className="text-muted-foreground/30">
                        <span className="text-accent/40">▸</span> more projects on{' '}
                        <a href="https://github.com/ABritex" target="_blank" rel="noopener noreferrer" className="cursor-target text-accent/60 hover:text-accent underline underline-offset-2 transition-colors">
                            GitHub
                        </a>
                    </p>
                    <a href="/show-case" className="cursor-target px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all">
                        full showcase →
                    </a>
                </div>
            </div>
        </section>
    )
}

function CloseIcon() {
    return (
        <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.05 } }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-foreground">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    )
}

import { useEffect, useId, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import ShapeGrid from '@/components/shape-grid'
import { PROJECTS } from '@/features/showcase/constants'
import { Tooltip } from '@/components/ui/tooltip-card'
import { LinkPreview } from '@/components/ui/link-preview'
import { useOutsideClick } from '@/hooks/use-outside-click'

gsap.registerPlugin(ScrollTrigger)

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

    useOutsideClick(modalRef as React.RefObject<HTMLDivElement>, () => setActive(null))

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-background">
            <div ref={bgRef} className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--secondary)) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--primary)) 0%, transparent 50%)',
                }}
            />
            <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
                <ShapeGrid speed={0.25} squareSize={40} borderColor="rgba(255,255,255,0.05)" shape="circle" direction="down" />
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-50"
                        onClick={() => setActive(null)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {active && (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.button
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="fixed top-4 right-4 flex items-center justify-center bg-white rounded-full h-8 w-8 z-[110]"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={modalRef}
                            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-neutral-900 sm:rounded-3xl overflow-hidden"
                        >
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <img
                                    width={200}
                                    height={200}
                                    src={active.cover}
                                    alt={active.title}
                                    className="w-full h-64 lg:h-72 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                                />
                            </motion.div>

                            <div className="flex-1 overflow-auto">
                                <div className="flex justify-between items-start p-4">
                                    <div>
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-medium text-neutral-200 text-base"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`desc-${active.title}-${id}`}
                                            className="text-neutral-400 text-sm mt-1"
                                        >
                                            {active.period}
                                        </motion.p>
                                    </div>

                                    <div className="flex gap-2">
                                        {active.liveUrl && (
                                            <LinkPreview url={active.liveUrl}>
                                                <motion.a
                                                    layout
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    href={active.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-2 text-xs rounded-full font-bold bg-green-500 text-white hover:bg-green-600 transition-colors"
                                                >
                                                    Live
                                                </motion.a>
                                            </LinkPreview>
                                        )}
                                        {active.githubUrl && (
                                            <motion.a
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                href={active.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-2 text-xs rounded-full font-bold bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
                                            >
                                                GitHub
                                            </motion.a>
                                        )}
                                    </div>
                                </div>
                                <div className="px-4 pb-6">
                                    <motion.p
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-neutral-400 text-sm leading-relaxed"
                                    >
                                        {active.desc}
                                    </motion.p>
                                    <div className="flex flex-wrap gap-1.5 mt-4">
                                        {active.techs.map((t) => (
                                            <Tooltip
                                                key={t}
                                                content={TECH_DESCRIPTIONS[t] || t}
                                                containerClassName="text-neutral-400"
                                            >
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

            <div className="relative z-10 w-full max-w-6xl mx-auto space-y-10">
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
                        <motion.div
                            layoutId={`card-${p.title}-${id}`}
                            key={p.title}
                            onClick={() => setActive(p)}
                            className="scroll-reveal cursor-target p-4 flex flex-col hover:bg-neutral-800/50 rounded-xl cursor-pointer transition-colors"
                            data-delay={200 + i * 100}
                        >
                            <div className="flex gap-4 flex-col w-full">
                                <motion.div layoutId={`image-${p.title}-${id}`}>
                                    <div className="relative h-48 rounded-lg overflow-hidden bg-muted/20">
                                        <img
                                            width={100}
                                            height={100}
                                            src={p.cover}
                                            alt={p.title}
                                            className="h-full w-full object-cover object-top"
                                        />
                                        {p.liveUrl && (
                                            <span className="absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-secondary/80 text-secondary-foreground border border-secondary/40">
                                                live
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                                <div className="flex justify-center items-center flex-col">
                                    <motion.h3
                                        layoutId={`title-${p.title}-${id}`}
                                        className="font-medium text-neutral-200 text-center text-base"
                                    >
                                        {p.title}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`desc-${p.title}-${id}`}
                                        className="text-neutral-400 text-center text-xs mt-1 line-clamp-2"
                                    >
                                        {p.desc}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <p className="scroll-reveal text-center text-[10px] text-muted-foreground/30 font-mono" data-delay="400">
                    <span className="text-accent/40">▸</span> more projects on{' '}
                    <a href="https://github.com/ABritex" target="_blank" rel="noopener noreferrer" className="text-accent/60 hover:text-accent underline underline-offset-2 transition-colors">
                        GitHub
                    </a>
                </p>
            </div>
        </section>
    )
}

function CloseIcon() {
    return (
        <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    )
}

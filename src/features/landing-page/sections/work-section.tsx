import { useEffect, useId, useMemo, useRef, useState } from 'react'
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
    'AI/LLM': 'Language model integration and prompt engineering',
    'WebSocket': 'Real-time bidirectional communication',
    'Three.js': '3D rendering and WebGL library',
    'Python': 'General-purpose language for AI, scripting, and backend',
    'TensorFlow': 'Open-source ML framework for model training and inference',
    'PyTorch': 'Deep learning framework with dynamic computation graphs',
    'Hugging Face': 'Library of pretrained transformer models and pipelines',
    'LangChain': 'Framework for building LLM-powered applications',
    'Ollama': 'Local LLM runner for private, offline inference',
    'FAISS': 'Vector similarity search for efficient memory retrieval',
    'Live2D': '2D character animation system with expression states',
    'YouTube API': 'YouTube Data API and IRC for live chat integration',
    'TTS': 'Text-to-speech synthesis for real-time voice output',
}

const TECH_COLORS: Record<string, string> = {
    'Next.js': 'from-blue-500/20 to-blue-600/10',
    'React': 'from-cyan-500/20 to-cyan-600/10',
    'TypeScript': 'from-blue-600/20 to-indigo-600/10',
    'JavaScript': 'from-yellow-500/20 to-amber-600/10',
    'Python': 'from-yellow-400/20 to-green-500/10',
    'TensorFlow': 'from-orange-500/20 to-amber-600/10',
    'PyTorch': 'from-red-500/20 to-rose-600/10',
    'Hugging Face': 'from-yellow-500/20 to-amber-500/10',
    'LangChain': 'from-green-600/20 to-emerald-600/10',
    'Ollama': 'from-indigo-500/20 to-purple-600/10',
    'FAISS': 'from-blue-500/20 to-cyan-600/10',
    'Live2D': 'from-pink-500/20 to-rose-600/10',
    'YouTube API': 'from-red-500/20 to-rose-600/10',
    'TTS': 'from-violet-500/20 to-purple-600/10',
    'PostgreSQL': 'from-indigo-500/20 to-indigo-600/10',
    'Drizzle ORM': 'from-orange-500/20 to-orange-600/10',
    'Supabase': 'from-emerald-500/20 to-emerald-600/10',
    'Firebase': 'from-amber-500/20 to-amber-600/10',
    'Tailwind CSS': 'from-teal-500/20 to-teal-600/10',
    'Node.js': 'from-green-500/20 to-green-600/10',
    'Discord.js': 'from-indigo-400/20 to-indigo-500/10',
    'Flutter': 'from-sky-500/20 to-sky-600/10',
    'Prisma': 'from-slate-500/20 to-slate-600/10',
    'Redis': 'from-red-500/20 to-red-600/10',
    'TanStack': 'from-pink-500/20 to-pink-600/10',
    'Docker': 'from-blue-400/20 to-blue-500/10',
    'AI/LLM': 'from-fuchsia-500/20 to-purple-600/10',
    'WebSocket': 'from-green-400/20 to-emerald-500/10',
    'Three.js': 'from-violet-500/20 to-violet-600/10',
}

const activeProjects = PROJECTS.filter(p => !p.status || p.status !== 'postponed')

export default function WorkSection() {
    const [active, setActive] = useState<(typeof activeProjects)[number] | null>(null)
    const id = useId()
    const ref = useRef<HTMLDivElement>(null)
    const bgRef = useRef<HTMLDivElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)
    const cardContainerRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    const graphicsCards = useMemo(() => {
        return [...GRAPHICS_DESIGNS].sort((a, b) => {
            const seed = 42
            const ha = a.id.charCodeAt(0) * seed
            const hb = b.id.charCodeAt(0) * seed
            return ha - hb
        }).slice(0, 7)
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
                yPercent: 10, scale: 1.06, ease: 'none',
                scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
            })
            const cards = gridRef.current?.querySelectorAll('.project-card')
            if (cards) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 24 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
                    }
                )
            }
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
        if (active) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = ''
        return () => { document.body.style.overflow = '' }
    }, [active])

    useOutsideClick(modalRef, () => setActive(null))

    type ProjectWithUrls = (typeof activeProjects)[number] & { githubUrls?: string[] }
    const p = active as ProjectWithUrls | null

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden pointer-events-none">
            <div ref={bgRef} className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--secondary)) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--primary)) 0%, transparent 50%)' }}
            />

            <AnimatePresence>
                {active && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 h-full w-full z-50 pointer-events-auto" onClick={() => setActive(null)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {active && p && (
                    <div className="fixed inset-0 grid place-items-center z-[100] pointer-events-auto">
                        <motion.button
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="fixed top-4 right-4 flex items-center justify-center bg-background border border-border rounded-full h-8 w-8 z-[110] hover:bg-muted transition-colors"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div layoutId={`card-${p.title}-${id}`} ref={modalRef}
                            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-card sm:rounded-3xl overflow-hidden border border-border/40"
                        >
                            <motion.div layoutId={`image-${p.title}-${id}`}>
                                <img width={200} height={200} src={p.cover} alt=""
                                    className="w-full h-64 lg:h-72 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" loading="lazy"
                                />
                            </motion.div>
                            <div className="flex-1 overflow-auto">
                                <div className="flex justify-between items-start p-4 pb-2">
                                    <div>
                                        <motion.h3 layoutId={`title-${p.title}-${id}`} className="font-medium text-foreground text-base">
                                            {p.title}
                                        </motion.h3>
                                        <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-muted/30 text-muted-foreground/60 border border-border/20">
                                            {p.period}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        {p.liveUrl && (
                                            <LinkPreview url={p.liveUrl}>
                                                <motion.a layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                    href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                                                    className="px-3 py-2 text-xs rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                                                >
                                                    Live
                                                </motion.a>
                                            </LinkPreview>
                                        )}
                                        {(() => {
                                            const urls = p?.githubUrls?.length ? p.githubUrls : (p?.githubUrl ? [p.githubUrl] : [])
                                            return urls.map((url, gi) => (
                                                <motion.a key={gi} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                    href={url} target="_blank" rel="noopener noreferrer"
                                                    className="px-3 py-2 text-xs rounded-full font-bold bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                                                >
                                                    GitHub{urls.length > 1 ? ` #${gi + 1}` : ''}
                                                </motion.a>
                                            ))
                                        })()}
                                    </div>
                                </div>
                                <div className="px-4 pb-6">
                                    <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="text-muted-foreground text-sm leading-relaxed"
                                    >
                                        {p.desc}
                                    </motion.p>
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {p.techs.map((t) => (
                                            <Tooltip key={t} content={TECH_DESCRIPTIONS[t] || t} containerClassName="text-muted-foreground">
                                                <span className={`text-[10px] font-mono px-2 py-1 rounded bg-gradient-to-br ${TECH_COLORS[t] || 'from-muted/40 to-muted/20'} border border-border/30 cursor-default hover:border-accent/30 transition-colors`}>
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

            <div className="relative z-10 w-full max-w-6xl mx-auto space-y-16 pointer-events-auto">
                <div className="text-center space-y-3">
                    <p className="text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> projects
                    </p>
                    <h2 className="text-[clamp(28px,5vw,56px)] font-black leading-[1.05] tracking-tight text-foreground">
                        What I&apos;ve Built
                    </h2>
                    <div className="flex justify-center gap-1.5 mt-3">
                        <span className="w-6 h-0.5 rounded-full bg-accent/60" />
                        <span className="w-6 h-0.5 rounded-full bg-primary/40" />
                        <span className="w-6 h-0.5 rounded-full bg-secondary/40" />
                    </div>
                    <p className="text-xs text-muted-foreground/40 font-mono max-w-md mx-auto">
                        Selected projects — click any card for details
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {activeProjects.map((proj) => {
                        const p2 = proj as typeof proj & { githubUrls?: string[] }
                        return (
                            <motion.div layoutId={`card-${p2.title}-${id}`} key={p2.title}
                                onClick={() => setActive(p2)}
                                className="project-card cursor-target p-4 flex flex-col bg-card/20 border border-border/20 hover:border-accent/20 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5"
                            >
                                <div className="flex gap-4 flex-col w-full">
                                    <motion.div layoutId={`image-${p2.title}-${id}`}>
                                        <div className="relative h-48 rounded-lg overflow-hidden bg-muted/20">
                                            <img width={400} height={192} src={p2.cover} alt=""
                                                className="h-full w-full object-cover object-top" loading="lazy"
                                            />
                                            <span className="absolute top-2 left-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-card/80 text-muted-foreground/70 border border-border/30 backdrop-blur-sm">
                                                {p2.period}
                                            </span>
                                            {p2.liveUrl && (
                                                <span className="absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-secondary/80 text-secondary-foreground border border-secondary/40 flex items-center gap-1">
                                                    <span className="w-1 h-1 rounded-full bg-green-400 inline-block" />
                                                    live
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                    <div className="flex justify-center items-center flex-col gap-1.5">
                                        <motion.h3 layoutId={`title-${p2.title}-${id}`} className="font-medium text-foreground text-center text-base">
                                            {p2.title}
                                        </motion.h3>
                                        <motion.p layoutId={`desc-${p2.title}-${id}`} className="text-muted-foreground text-center text-xs leading-relaxed line-clamp-2">
                                            {p2.desc}
                                        </motion.p>
                                        <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                                            {p2.techs.slice(0, 3).map((t) => (
                                                <span key={t} className={`text-[9px] font-mono px-1.5 py-0.5 rounded bg-gradient-to-br ${TECH_COLORS[t] || 'from-muted/30 to-muted/10'} border border-border/20 text-muted-foreground/70`}>
                                                    {t}
                                                </span>
                                            ))}
                                            {p2.techs.length > 3 && (
                                                <span className="text-[9px] font-mono px-1.5 py-0.5 text-muted-foreground/40">
                                                    +{p2.techs.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="text-center space-y-4 pt-8">
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

                <div>
                    <DraggableCardContainer ref={cardContainerRef}
                        className="relative w-full h-[32rem] rounded-xl border border-border/5 bg-muted/[0.02]"
                    >
                        {graphicsCards.map((g, i) => {
                                const rots = ['-rotate-2', 'rotate-1', 'rotate-3', '-rotate-1', 'rotate-4', '-rotate-3', 'rotate-2']
                                const isVideo = g.type === 'video'
                                return (
                                    <DraggableCardBody key={g.id}
                                        dragConstraintsRef={cardContainerRef}
                                        className={`cursor-grab cursor-target active:cursor-grabbing absolute p-0 w-40 sm:w-52 ${rots[i]}`}
                                        style={{ top: `${10 + (i * 11) % 70}%`, left: `${6 + (i * 17) % 80}%` }}
                                    >
                                        {isVideo ? (
                                            <video src={g.src} className="pointer-events-none w-full h-full object-contain" muted loop autoPlay playsInline />
                                        ) : (
                                            <img src={g.src} alt={g.title} className="pointer-events-none w-full h-full object-contain" loading="lazy" />
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 to-transparent p-2 pt-6">
                                            <p className="text-[10px] font-semibold text-white drop-shadow-sm leading-tight">{g.title}</p>
                                        </div>
                                    </DraggableCardBody>
                                )
                            })
                        }
                    </DraggableCardContainer>
                </div>

                <div className="flex items-center justify-center gap-6 text-xs font-mono">
                    <p className="text-muted-foreground/40">
                        <span className="text-accent/40">▸</span> more projects on{' '}
                        <a href="https://github.com/ABritex" target="_blank" rel="noopener noreferrer"
                            className="cursor-target text-accent/60 hover:text-accent underline underline-offset-2 transition-colors"
                        >
                            GitHub
                        </a>
                    </p>
                    <a href="/show-case"
                        className="cursor-target px-5 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all font-semibold"
                    >
                        full showcase →
                    </a>
                </div>
            </div>
        </section>
    )
}

function CloseIcon() {
    return (
        <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.05 } }}
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="h-4 w-4 text-foreground"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    )
}

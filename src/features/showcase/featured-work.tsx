import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from '#/lib/gsap'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
    title: string
    tagline: string
    role: string
    period: string
    liveUrl: string | null
    githubUrl: string | null
    githubUrls?: string[]
    cover: string | null
    tech: string[]
    problem: string
    architecture: string[]
    tradeoffs: string
    outcome: string
    score?: { value: number; date: string }
}

const PROJECTS: Project[] = [
    {
        title: "Mindful Companion",
        tagline: "Rule-based mental health chatbot with self-help tools for HEIs",
        role: "Capstone project — Full-stack developer & designer",
        period: "2026",
        liveUrl: "https://mindful-companion-gamma.vercel.app",
        githubUrl: null,
        cover: "/images/projects/mindful-cover.jpg",
        tech: ["Next.js", "PostgreSQL", "Drizzle ORM", "Supabase"],
        score: { value: 96, date: "2026-04" },
        problem: "Started as a capstone project aimed at helping students access mental health support. During research, the scope expanded — higher education institutions as a whole needed a scalable, private, and stigma-free way to offer mental health resources.",
        architecture: [
            "Next.js App Router with React Server Components for fast initial load and SEO",
            "Drizzle ORM with PostgreSQL on Supabase — type-safe from schema to UI",
            "Custom studio with a node-based flowchart editor — admins link text, action, and rule-based question nodes to build conversation paths",
            "Event-trigger system that interrupts the chat flow based on user input — detecting distress keywords routes to crisis resources automatically",
            "Integrated self-help tools: micro meditation timers, guided breathing, journaling, and mood tracking",
            "Optional AI chat node — admins can attach an external AI endpoint for open-ended responses alongside the rule-based flow",
        ],
        tradeoffs: "Chose a rule-based engine over a pure AI chatbot because mental health conversations need guardrails. AI can hallucinate — a node-based system gives admins full control over every path. The AI node is opt-in and scoped, not the core.",
        outcome: "Evolved from a student capstone into a platform designed for higher education institutions. Includes a customizable chatbot studio, self-help tools, and private mood/journal tracking.",
    },
    {
        title: "Minstrel — Bot + Website",
        tagline: "Discord bot collects songs, SPA serves them — full pipeline",
        role: "Full-stack developer",
        period: "2026",
        liveUrl: "https://minstel-web-cnq.vercel.app/",
        githubUrl: "https://github.com/ABritex/minstrel-bot",
        githubUrls: ["https://github.com/ABritex/minstel-web-cnq", "https://github.com/ABritex/minstrel-bot"],
        cover: "/images/projects/Minstel-Web-Home.jpg",
        tech: ["React", "SPA", "Discord.js", "Drizzle ORM", "Neon DB"],
        score: { value: 92, date: "2026-04" },
        problem: "Discord servers accumulate shared songs across voice channels, but there's no way to organize, search, or replay them. Each server reinvents the wheel with manual playlists.",
        architecture: [
            "Two-service architecture: Discord.js bot (data collection) + React SPA (playback library)",
            "Website is a single-page app with authentication — users log in to access their server's song library",
            "Shared Neon DB — bot writes collected songs, website reads and serves them",
            "Drizzle ORM for type-safe queries across both services",
            "Custom audio player with search, queue management, and playback history",
        ],
        tradeoffs: "Split into two repos because the bot and website have different deploy cycles and dependencies. The shared database is the contract between them. The website is intentionally a SPA — no SSR needed since content is behind auth.",
        outcome: "Built a full data pipeline — from Discord voice channels to an authenticated web library. Users can now find and replay any song shared in their server.",
    },
    {
        title: "Sawa — AI Virtual Assistances",
        tagline: "Live2D AI VTuber that reads YouTube chat and responds in real-time — inspired by Neuro-sama",
        role: "AI developer — Python, Live2D, chat integration",
        period: "2022",
        liveUrl: null,
        githubUrl: null,
        cover: null,
        tech: ["Python", "TensorFlow", "PyTorch", "Live2D", "YouTube API", "TTS", "Ollama", "Docker"],
        problem: "Live streaming is a one-way experience — viewers type in chat but the streamer can't respond to everyone. An AI-powered VTuber bridges the gap: it reads every chat message, processes them with language models, and responds with synchronized Live2D animation and TTS voice — creating a truly interactive stream persona.",
        architecture: [
            "Python-based pipeline — YouTube chat reader ingests messages via the YouTube Data API and IRC",
            "TensorFlow/PyTorch models for message classification, sentiment analysis, and response generation",
            "Context-aware reply system — tracks conversation history to avoid repetitive answers",
            "Live2D model with expression states — idle, talking, thinking, reacting — toggled by emotion tags from the AI",
            "TTS engine for real-time voice synthesis — reads responses aloud with configurable voice and tone",
            "Dockerized service stack for modular deployment — chat reader, AI processor, TTS, and Live2D controller",
        ],
        tradeoffs: "Real-time responsiveness is the hardest constraint — the full pipeline (chat → AI → TTS → Live2D animation) needs to complete within a few seconds to feel natural. This means running smaller, faster models locally instead of larger cloud models. Local inference keeps latency low and privacy high, at the cost of raw model capability.",
        outcome: "An interactive Live2D VTuber that reads YouTube chat, understands context, generates spoken responses, and expresses emotions through its avatar — all running on open-source Python tooling.",
    },
    {
        title: "JNDM Sari-Sari Store",
        tagline: "Mobile-first e-commerce & management for Philippine convenience stores",
        role: "Full-stack developer & client liaison",
        period: "2025",
        liveUrl: null,
        githubUrl: "https://github.com/ABritex/jndm-web",
        cover: "/images/projects/JNDM-web-login.webp",
        tech: ["Next.js", "Flutter", "Firebase", "Tailwind CSS"],
        problem: "JNDM is a sari-sari store based in Occidental Mindoro with plans to expand across Luzon. Running on paper receipts and memory doesn't scale. The owner needed a mobile-first e-commerce web app and a tablet POS — built to support multi-location growth.",
        architecture: [
            "Next.js 16 App Router with React 19 and experimental React Compiler for automatic memoization",
            "Mobile-first responsive layout — collapsible sticky header with scroll-driven animation, bottom tab nav on mobile, fixed top nav + sidebar + 5-column grid on desktop",
            "Firebase Auth (email/Google/Facebook) gated behind admin verification, cookie-based middleware for route protection",
            "Firestore service layer with singleton classes mirroring the companion Flutter app client",
            "Flutter tablet app for cashier — offline-first with sync on reconnect using Provider pattern",
            "Scroll-driven header animation using pure CSS-in-JS transform/opacity interpolation — no animation library",
        ],
        tradeoffs: "Chose Flutter over React Native because the client needed a specific tablet layout with custom receipt printing. Flutter's widget system gave more control. The web app uses a custom `useSyncExternalStore` media query store instead of a hook library — zero dependencies, no unnecessary re-renders. Project paused due to client budget, but the architecture supports multi-location expansion.",
        outcome: "Designed the full system with direct client input. Architecture supports multi-location inventory, centralized analytics, and offline-first POS — ready to deploy when expansion funding resumes.",
    },
    {
        title: "The Empire — Food Court Marketplace",
        tagline: "Native Android food-ordering marketplace with multi-vendor stalls and real-time chat",
        role: "Android developer — Kotlin, Jetpack Compose",
        period: "2024",
        liveUrl: null,
        githubUrl: "https://github.com/ABritex/The-Empire-App",
        cover: "/images/projects/Empire-phone.png",
        tech: ["Kotlin", "Jetpack Compose", "Material 3", "Dagger Hilt", "Firebase"],
        problem: "Food courts have multiple independent stalls but no unified ordering system. Customers walk from stall to stall, wait in separate lines, and can't order ahead. The Empire needed a single app where users browse all stalls, customize items, cart across vendors, and chat with stall owners in real time.",
        architecture: [
            "100% Jetpack Compose UI with Material 3 — single-activity architecture with Navigation Compose and animated slide transitions",
            "Custom animated bottom navigation bar with a circular cutout Shape using bezier Path drawing and spring physics",
            "Dagger Hilt DI via KSP — 11 repository classes wrapping an 840-line Firestore/Firebase Storage facade",
            "Generic ResourceState composable — every screen gets loading/error/empty/content for free",
            "Firestore transactions for cart operations and real-time addSnapshotListener for vendor chat",
            "StateFlow + sealed-interface state per screen (CartState.Loading | Success | Error)",
        ],
        tradeoffs: "Chose serverless Firebase over a dedicated backend — Firestore doubles as DB and real-time engine. This eliminates backend maintenance but limits complex query capabilities. The custom nav bar Shape was built from scratch instead of using BottomNavigation — shows low-level Compose drawing skill but took longer to implement.",
        outcome: "A production-ready Android food court marketplace with multi-vendor cart, item customization (sizes, add-ons), real-time vendor chat, and a reusable generic state composable pattern across 10+ screens.",
    },
]

function downloadCaseStudy(project: Project) {
    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${project.title} — Case Study</title>
<style>
    body { font-family: 'Georgia', serif; max-width: 700px; margin: 40px auto; padding: 20px; color: #1a1a1a; line-height: 1.6; }
    .back { display: inline-block; margin-bottom: 24px; color: #666; font-size: 13px; text-decoration: none; font-family: sans-serif; }
    .back:hover { color: #000; }
    h1 { font-size: 28px; margin-bottom: 4px; }
    .tagline { color: #666; font-size: 14px; margin-bottom: 24px; }
    h2 { font-size: 16px; margin-top: 24px; margin-bottom: 8px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
    ul { padding-left: 20px; }
    li { margin-bottom: 4px; }
    .meta { margin-top: 32px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 12px; }
</style></head>
<body>
    <a class="back" href="javascript:window.close()">← Back to portfolio</a>
    <h1>${project.title}</h1>
    <p class="tagline">${project.tagline}</p>

    <h2>Problem</h2>
    <p>${project.problem}</p>

    <h2>Architecture</h2>
    <ul>${project.architecture.map(a => `<li>${a}</li>`).join('')}</ul>

    <h2>Tradeoffs</h2>
    <p>${project.tradeoffs}</p>

    <h2>Outcome</h2>
    <p>${project.outcome}</p>

    <p class="meta">${project.role} · ${project.period}<br>Tech: ${project.tech.join(', ')}</p>
</body></html>`

    const win = window.open('', '_blank')
    if (win) {
        win.document.write(html)
        win.document.close()
        win.focus()
    }
}

function ScoreBadge({ score }: { score: { value: number; date: string } }) {
    const color = score.value >= 95 ? 'text-secondary dark:text-white' : score.value >= 85 ? 'text-accent dark:text-white' : 'text-muted-foreground dark:text-white'
    const bg = score.value >= 95 ? 'bg-secondary/20 border-secondary/40' : score.value >= 85 ? 'bg-accent/20 border-accent/40' : 'bg-muted/30 border-border/40'
    return (
        <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded border ${bg} ${color}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {score.value}
        </span>
    )
}

interface LightboxState {
    isOpen: boolean
    currentIndex: number
}

interface LightboxItem {
    src: string
    title: string
    description: string
}

const LIGHTBOX_ITEMS: LightboxItem[] = PROJECTS
    .filter((p): p is Project & { cover: string } => p.cover !== null)
    .map(p => ({ src: p.cover, title: p.title, description: p.tagline }))

export function FeaturedWork() {
    const [lightbox, setLightbox] = useState<LightboxState>({ isOpen: false, currentIndex: 0 })
    const sectionRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    const openLightbox = useCallback((index: number) => {
        setLightbox({ isOpen: true, currentIndex: index })
    }, [])

    const closeLightbox = useCallback(() => {
        setLightbox(prev => ({ ...prev, isOpen: false }))
    }, [])

    const navigateLightbox = useCallback((direction: "prev" | "next") => {
        setLightbox(prev => {
            const newIndex = direction === "next"
                ? (prev.currentIndex + 1) % LIGHTBOX_ITEMS.length
                : (prev.currentIndex - 1 + LIGHTBOX_ITEMS.length) % LIGHTBOX_ITEMS.length
            return { ...prev, currentIndex: newIndex }
        })
    }, [])

    useEffect(() => {
        if (!lightbox.isOpen) return
        const handleKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape": closeLightbox(); break
                case "ArrowRight": navigateLightbox("next"); break
                case "ArrowLeft": navigateLightbox("prev"); break
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [lightbox.isOpen, closeLightbox, navigateLightbox])

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gridRef.current?.querySelectorAll('.fw-card')
            if (cards) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1, y: 0, duration: 0.4, stagger: 0.15, ease: 'power2.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="featured-work" ref={sectionRef} className="relative min-h-screen flex items-start justify-center px-6 py-24 overflow-hidden pointer-events-none">
            <div className="relative z-10 w-full max-w-5xl mx-auto space-y-16 pointer-events-auto">
                <div className="text-center space-y-3">
                    <p className="text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> featured work
                    </p>
                    <h2 className="text-[clamp(32px,6vw,64px)] font-black leading-[1.05] tracking-tight text-foreground">
                        What I&apos;ve <span className="text-accent/70">Built</span>
                    </h2>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-lg mx-auto font-mono">
                        Problems solved, decisions made, and systems shipped.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground/50 bg-muted/30 border border-border/40 rounded px-2 py-0.5">
                        ~/projects $ cat --deep-dive
                    </span>
                </div>

                <div ref={gridRef} className="space-y-16">
                    {PROJECTS.map((project) => (
                        <article key={project.title} className="fw-card space-y-6">
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                                <div className="lg:w-1/3 space-y-4">
                                    <div className={`rounded-xl border border-border/40 bg-card/50 overflow-hidden ${project.cover ? 'cursor-pointer group' : ''}`} onClick={() => {
                                        if (!project.cover) return
                                        const idx = LIGHTBOX_ITEMS.findIndex(i => i.src === project.cover)
                                        if (idx !== -1) openLightbox(idx)
                                    }}>
                                        {project.cover ? (
                                            <div className="relative">
                                                <img src={project.cover} alt={project.title}
                                                    className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                                                    width={400} height={144} loading="lazy" decoding="async"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                                    <span className="text-white/0 group-hover:text-white/70 text-2xl transition-all duration-300">
                                                        ⊕
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full h-36 bg-muted/20 flex items-center justify-center">
                                                <span className="text-5xl opacity-20">
                                                    {project.title[0]}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <h3 className="text-lg font-bold text-foreground">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground/60 font-mono leading-relaxed">
                                            {project.tagline}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tech.map((t) => (
                                            <span key={t}
                                                className="text-[10px] font-mono px-2 py-0.5 bg-muted/30 border border-border/30 rounded text-muted-foreground/60"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2 items-center">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                                className="cursor-target inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-secondary/20 text-foreground border border-secondary/40 hover:opacity-80 transition-opacity"
                                            >
                                                ↗ Live
                                                {project.score && <ScoreBadge score={project.score} />}
                                            </a>
                                        )}
                                        {(() => {
                                            const urls = project.githubUrls?.length
                                                ? project.githubUrls
                                                : project.githubUrl
                                                    ? [project.githubUrl]
                                                    : []
                                            return urls.map((url, gi) => (
                                                <a key={gi} href={url} target="_blank" rel="noopener noreferrer"
                                                    className="cursor-target text-xs font-mono px-3 py-1.5 rounded-lg bg-muted/30 text-muted-foreground border border-border/40 hover:border-border hover:text-foreground transition-all"
                                                >
                                                    GitHub{urls.length > 1 ? ` #${gi + 1}` : ''}
                                                </a>
                                            ))
                                        })()}
                                        <button onClick={() => downloadCaseStudy(project)}
                                            className="cursor-target text-xs font-mono px-3 py-1.5 rounded-lg bg-muted/20 text-muted-foreground/50 border border-dashed border-border/30 hover:border-accent/50 hover:text-accent transition-all"
                                        >
                                            ↓ PDF
                                        </button>
                                    </div>

                                    <div className="text-[10px] text-muted-foreground/30 font-mono space-y-0.5">
                                        <p>{project.role}</p>
                                        <p>{project.period}</p>
                                    </div>
                                </div>

                                <div className="lg:w-2/3 space-y-5">
                                    <div className="space-y-1.5">
                                        <h4 className="text-[10px] tracking-[.25em] uppercase text-muted-foreground/40 font-mono">
                                            <span className="text-accent">$</span> the problem
                                        </h4>
                                        <p className="text-sm text-muted-foreground/70 leading-relaxed">
                                            {project.problem}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-[10px] tracking-[.25em] uppercase text-muted-foreground/40 font-mono">
                                            <span className="text-accent">$</span> architecture
                                        </h4>
                                        <ul className="space-y-1.5">
                                            {project.architecture.map((item) => (
                                                <li key={item} className="text-sm text-muted-foreground/70 leading-relaxed flex gap-2">
                                                    <span className="text-accent/40 mt-1 shrink-0">▸</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-1.5">
                                        <h4 className="text-[10px] tracking-[.25em] uppercase text-muted-foreground/40 font-mono">
                                            <span className="text-accent">$</span> tradeoffs
                                        </h4>
                                        <p className="text-sm text-muted-foreground/70 leading-relaxed">
                                            {project.tradeoffs}
                                        </p>
                                    </div>

                                    <div className="space-y-1.5">
                                        <h4 className="text-[10px] tracking-[.25em] uppercase text-muted-foreground/40 font-mono">
                                            <span className="text-accent">$</span> outcome
                                        </h4>
                                        <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                                            {project.outcome}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="flex justify-center pt-4">
                    <a href="https://github.com/ABritex" target="_blank" rel="noopener noreferrer"
                        className="cursor-target inline-flex items-center gap-2 text-xs font-mono px-5 py-2.5 rounded-xl bg-muted/30 text-muted-foreground border border-border/40 hover:border-foreground hover:text-foreground transition-all"
                    >
                        <img src="/icons/github.svg" alt="" className="w-4 h-4 dark:invert" width={16} height={16} loading="lazy" decoding="async" />
                        More projects on GitHub
                    </a>
                </div>
            </div>

            <AnimatePresence>
                {lightbox.isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 pointer-events-auto"
                        onClick={closeLightbox}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="cursor-target absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-mono z-10 p-2"
                            onClick={closeLightbox}
                        >
                            ✕
                        </motion.button>

                        {LIGHTBOX_ITEMS.length > 1 && (
                            <>
                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="cursor-target absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl font-mono z-10 p-2"
                                    onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
                                >
                                    ‹
                                </motion.button>
                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="cursor-target absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl font-mono z-10 p-2"
                                    onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
                                >
                                    ›
                                </motion.button>
                            </>
                        )}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="max-w-5xl max-h-[90vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={LIGHTBOX_ITEMS[lightbox.currentIndex].src}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <img
                                        src={LIGHTBOX_ITEMS[lightbox.currentIndex].src}
                                        alt={LIGHTBOX_ITEMS[lightbox.currentIndex].title}
                                        className="max-w-full max-h-[85vh] mx-auto rounded-lg object-contain"
                                        decoding="async"
                                    />
                                </motion.div>
                            </AnimatePresence>
                            <div className="text-center mt-4">
                                <p className="text-white font-semibold">{LIGHTBOX_ITEMS[lightbox.currentIndex].title}</p>
                                <p className="text-white/60 text-sm font-mono mt-1">{LIGHTBOX_ITEMS[lightbox.currentIndex].description}</p>
                                {LIGHTBOX_ITEMS.length > 1 && (
                                    <p className="text-white/40 text-xs font-mono mt-2">
                                        {lightbox.currentIndex + 1} / {LIGHTBOX_ITEMS.length}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

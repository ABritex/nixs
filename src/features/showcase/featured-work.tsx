import { useEffect, useRef } from 'react'
import { gsap } from '#/lib/gsap'

const PROJECTS = [
    {
        title: "Mindful Companion",
        tagline: "Rule-based mental health chatbot with self-help tools for HEIs",
        role: "Capstone project — Full-stack developer & designer",
        period: "2026",
        liveUrl: "https://mindful-companion-gamma.vercel.app",
        githubUrl: null,
        cover: "/images/projects/mindful-cover.jpg",
        tech: ["Next.js", "PostgreSQL", "Drizzle ORM", "Supabase"],
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
        cover: null,
        tech: ["React", "SPA", "Discord.js", "Drizzle ORM", "Neon DB"],
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
        tagline: "Full business management system — inventory, sales, analytics",
        role: "Full-stack developer & client liaison",
        period: "2025",
        liveUrl: null,
        githubUrl: null,
        cover: null,
        tech: ["Next.js", "Flutter", "Firebase", "Provider"],
        problem: "JNDM is a sari-sari store based in Occidental Mindoro with plans to expand across Luzon. Running on paper receipts and memory doesn't scale. The owner needed a tablet-based POS with inventory tracking and sales reports — built to support multi-location growth.",
        architecture: [
            "Next.js for the web dashboard — owner checks analytics from any location",
            "Flutter tablet app for cashier — offline-first with sync on reconnect",
            "Firebase for auth, real-time DB, and cloud storage for receipt images",
            "Provider pattern for Flutter state — simpler than Riverpod for this scope",
            "Schema designed with multi-location expansion in mind — centralized reporting across branches",
        ],
        tradeoffs: "Chose Flutter over React Native because the client needed a specific tablet layout with custom receipt printing. Flutter's widget system gave more control. This was my first Flutter project. Project paused due to client budget constraints, but the architecture is ready.",
        outcome: "Designed the full system with direct client input. Architecture supports multi-location inventory, centralized analytics, and offline-first POS — ready to deploy when expansion funding resumes.",
    },
]

export function FeaturedWork() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

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
        <section id="featured-work" ref={sectionRef} className="relative min-h-screen flex items-start justify-center px-6  overflow-hidden pointer-events-none">
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
                                    <div className="rounded-xl border border-border/40 bg-card/50 overflow-hidden">
                                        {project.cover ? (
                                            <img src={project.cover} alt={project.title}
                                                className="w-full h-48 object-cover"
                                                width={400} height={192} loading="lazy" decoding="async"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-muted/20 flex items-center justify-center">
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

                                    <div className="flex gap-2 items-center">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                                className="cursor-target text-xs font-mono px-3 py-1.5 rounded-lg bg-secondary/20 text-secondary-foreground border border-secondary/40 hover:opacity-80 transition-opacity"
                                            >
                                                ↗ Live
                                            </a>
                                        )}
                                        {(() => {
                                            const urls = (project as { githubUrls?: string[] }).githubUrls?.length
                                                ? (project as { githubUrls: string[] }).githubUrls
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
        </section>
    )
}

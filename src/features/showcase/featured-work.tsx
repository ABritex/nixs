const PROJECTS = [
    {
        title: "Mindful Companion",
        tagline: "Rule-based mental health chatbot with self-help tools for HEIs",
        role: "Capstone project — Full-stack developer & designer",
        period: "2026",
        liveUrl: "https://mindful-companion-gamma.vercel.app",
        githubUrl: null,
        cover: "/images/projects/mindful-cover.jpg",
        problem: "Started as a capstone project aimed at helping students access mental health support. During research, the scope expanded — higher education institutions as a whole needed a scalable, private, and stigma-free way to offer mental health resources. Students needed something approachable and available 24/7, without the barrier of asking for help in person.",
        architecture: [
            "Next.js App Router with React Server Components for fast initial load and SEO",
            "Drizzle ORM with PostgreSQL on Supabase — type-safe from schema to UI",
            "Custom studio with a node-based flowchart editor — admins link text nodes, action nodes, and rule-based question nodes to build conversation paths",
            "Event-trigger system that interrupts the chat flow based on user input — e.g., detecting distress keywords routes to crisis resources automatically",
            "Integrated self-help tools: micro meditation timers, guided breathing exercises, journaling, and mood tracking — all data stays private to the user",
            "Optional AI chat node — admins can attach an external AI endpoint or prompt for open-ended responses alongside the rule-based flow",
        ],
        tradeoffs: "Chose a rule-based engine over a pure AI chatbot because mental health conversations need guardrails. AI can hallucinate or say the wrong thing — a node-based system gives admins full control over every path. The AI node is opt-in and scoped, not the core. The tradeoff is more setup work for admins, but that's the point: intentional design over unpredictable generation.",
        outcome: "Built a complete mental health platform that evolved from a student-focused capstone into a system designed for higher education institutions. Includes a customizable chatbot studio, self-help tools, and private mood/journal tracking — deployable by HEIs without clinical staff overhead.",
        tech: ["Next.js", "PostgreSQL", "Drizzle ORM", "Supabase", "Node-based editor"],
    },
    {
        title: "Minstrel — Bot + Website",
        tagline: "Discord bot collects songs, SPA serves them — full pipeline",
        role: "Full-stack developer",
        period: "2026",
        liveUrl: "https://minstel-web-cnq.vercel.app/",
        githubUrl: "https://github.com/ABritex/minstrel-bot",
        cover: null,
        problem: "Discord servers accumulate shared songs across voice channels, but there's no way to organize, search, or replay them. Each server reinvents the wheel with manual playlists.",
        architecture: [
            "Two-service architecture: Discord.js bot (data collection) + React SPA (playback library)",
            "The website is a single-page app with authentication — users log in to access their server's song library",
            "Shared Neon DB — bot writes collected songs, website reads and serves them, single source of truth",
            "Drizzle ORM for type-safe queries across both services",
            "Custom audio player with search, queue management, and playback history",
        ],
        tradeoffs: "Split into two repos because the bot and website have different deploy cycles and dependencies. The shared database is the contract between them. The website is intentionally a SPA — no SSR needed since the content is behind auth and user-specific. Could have been a monorepo but the separation keeps concerns clean.",
        outcome: "Built a full data pipeline — from Discord voice channels to an authenticated web library. Users can now find and replay any song shared in their server.",
        tech: ["React", "SPA", "Discord.js", "Drizzle ORM", "Neon DB"],
    },
    {
        title: "JNDM Sari-Sari Store",
        tagline: "Full business management system — inventory, sales, analytics",
        role: "Full-stack developer & client liaison",
        period: "2025",
        liveUrl: null,
        githubUrl: null,
        cover: null,
        problem: "JNDM is a sari-sari store based in Occidental Mindoro with plans to expand across Luzon — starting with Batangas and potentially other provinces. Running on paper receipts and memory doesn't scale. The owner needed a tablet-based POS with inventory tracking and sales reports — simple enough for non-technical staff, but built to support multi-location growth.",
        architecture: [
            "Next.js for the web dashboard — owner checks analytics from any location",
            "Flutter tablet app for cashier — offline-first with sync on reconnect, critical for areas with unstable internet",
            "Firebase for auth, real-time DB, and cloud storage for receipt images",
            "Provider pattern for Flutter state — simpler than Riverpod for this scope",
            "Schema designed with multi-location expansion in mind — centralized reporting across branches",
        ],
        tradeoffs: "Chose Flutter over React Native because the client needed a specific tablet layout with custom receipt printing. Flutter's widget system gave more control over the exact UI. The tradeoff is learning curve — this was my first Flutter project. Project paused due to client budget constraints, but the architecture is production-ready and designed to scale beyond Occidental Mindoro.",
        outcome: "Designed the full system with direct client input. The architecture supports multi-location inventory, centralized analytics, and offline-first POS — ready to deploy when expansion funding resumes.",
        tech: ["Next.js", "Flutter", "Firebase", "Provider"],
    },
]

export function FeaturedWork() {
    return (
        <section id="featured-work" className="relative min-h-screen flex items-start justify-center px-6 py-24 overflow-hidden pointer-events-none">
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, hsl(var(--accent)) 0%, transparent 50%), radial-gradient(circle at 50% 70%, hsl(var(--primary)) 0%, transparent 50%)', }} />

            <div className="relative z-10 w-full max-w-5xl mx-auto space-y-10 pointer-events-auto">
                <div className="text-center space-y-3">
                    <p className="scroll-reveal text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> featured work
                    </p>
                    <h2 className="scroll-reveal text-[clamp(32px,6vw,64px)] font-black leading-[1.05] tracking-tight text-foreground" data-delay="100">
                        What I&apos;ve Built
                    </h2>
                    <p className="scroll-reveal text-sm text-muted-foreground/70 leading-relaxed max-w-lg mx-auto font-mono" data-delay="200">
                        Not a list of technologies. A record of problems solved, decisions made, and systems shipped.
                    </p>
                </div>

                <div className="scroll-reveal flex items-center justify-center gap-2" data-delay="250">
                    <span className="font-mono text-[11px] text-muted-foreground/50 bg-muted/30 border border-border/40 rounded px-2 py-0.5">
                        ~/projects $ cat --deep-dive
                    </span>
                </div>

                <div className="space-y-32">
                    {PROJECTS.map((project, i) => (
                        <article key={project.title} className="scroll-reveal space-y-8" data-delay={100 * i}>
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                                <div className="lg:w-2/5 space-y-4">
                                    <div className="rounded-xl border border-border/40 bg-card/50 overflow-hidden">
                                        {project.cover ? (
                                            <img src={project.cover} alt={project.title} className="w-full h-48 object-cover" width={400} height={192} loading="lazy" decoding="async" />
                                        ) : (
                                            <div className="w-full h-48 bg-muted/20 flex items-center justify-center">
                                                <span className="text-4xl opacity-30">
                                                    {project.title[0]}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-foreground">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground/60 font-mono">
                                            {project.tagline}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-muted/30 border border-border/40 rounded text-muted-foreground/60" >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cursor-target text-xs font-mono px-3 py-1.5 rounded-lg bg-secondary/20 text-secondary-foreground border border-secondary/40 hover:opacity-80 transition-opacity">
                                                ↗ Live
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="cursor-target text-xs font-mono px-3 py-1.5 rounded-lg bg-muted/30 text-muted-foreground border border-border/40 hover:border-border hover:text-foreground transition-all">
                                                GitHub
                                            </a>
                                        )}
                                    </div>

                                    <div className="text-[10px] text-muted-foreground/30 font-mono space-y-0.5">
                                        <p>{project.role}</p>
                                        <p>{project.period}</p>
                                    </div>
                                </div>

                                <div className="lg:w-3/5 space-y-6">
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] tracking-[.25em] uppercase text-muted-foreground/40 font-mono">
                                            <span className="text-accent">$</span> the problem
                                        </h4>
                                        <p className="text-sm text-muted-foreground/70 leading-relaxed">
                                            {project.problem}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-[10px] tracking-[.25em] uppercase text-muted-foreground/40 font-mono">
                                            <span className="text-accent">$</span> architecture
                                        </h4>
                                        <ul className="space-y-2">
                                            {project.architecture.map((item) => (
                                                <li key={item} className="text-sm text-muted-foreground/70 leading-relaxed flex gap-2">
                                                    <span className="text-accent/40 mt-1 shrink-0">▸</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-[10px] tracking-[.25em] uppercase text-muted-foreground/40 font-mono">
                                            <span className="text-accent">$</span> tradeoffs
                                        </h4>
                                        <p className="text-sm text-muted-foreground/70 leading-relaxed">
                                            {project.tradeoffs}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-[10px] tracking-[.25em] uppercase text-muted-foreground/40 font-mono">
                                            <span className="text-accent">$</span> outcome
                                        </h4>
                                        <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                                            {project.outcome}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {i < PROJECTS.length - 1 && (
                                <div className="border-t border-border/20 pt-8">
                                    <p className="text-center text-[10px] text-muted-foreground/20 font-mono">
                                        ─── ─── ───
                                    </p>
                                </div>
                            )}
                        </article>
                    ))}
                </div>

                <div className="scroll-reveal flex justify-center pt-4" data-delay="400">
                    <a href="https://github.com/ABritex" target="_blank" rel="noopener noreferrer" className="cursor-target inline-flex items-center gap-2 text-[12px] font-mono px-5 py-2.5 rounded-xl bg-muted/30 text-muted-foreground border border-border/40 hover:border-foreground hover:text-foreground transition-all">
                        <img src="/icons/github.svg" alt="" className="w-4 h-4 invert" width={16} height={16} loading="lazy" decoding="async" />
                        More projects on GitHub
                    </a>
                </div>
            </div>
        </section>
    )
}

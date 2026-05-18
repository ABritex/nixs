import { PROJECTS } from "./constants";

export function Achievements() {
    const years = PROJECTS.map((p) => p.period);
    const yearIndexMap = new Map<string, number>();
    years.forEach((year, i) => {
        if (!yearIndexMap.has(year)) {
            yearIndexMap.set(year, i);
        }
    });

    return (
        <section id="projects" className="relative min-h-screen flex items-start justify-center px-6 py-24 overflow-hidden pointer-events-none">
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 50% 30%, hsl(var(--accent)) 0%, transparent 50%), radial-gradient(circle at 50% 70%, hsl(var(--primary)) 0%, transparent 50%)',
                }}
            />

            <div className="relative z-10 w-full max-w-4xl mx-auto space-y-10 pointer-events-auto">
                <div className="text-center space-y-3">
                    <p className="scroll-reveal text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> projects
                    </p>
                    <h2 className="scroll-reveal text-[clamp(28px,5vw,56px)] font-black leading-[1.05] tracking-tight text-foreground" data-delay="100">
                        Featured Projects
                    </h2>
                    <p className="scroll-reveal text-sm text-muted-foreground/70 leading-relaxed max-w-lg mx-auto font-mono" data-delay="200">
                        Projects I&apos;ve built — some live, some in progress, all real.
                    </p>
                </div>

                <div className="scroll-reveal flex items-center justify-center gap-2" data-delay="250">
                    <span className="font-mono text-[11px] text-muted-foreground/50 bg-muted/30 border border-border/40 rounded px-2 py-0.5">
                        ~/projects $ git log --all
                    </span>
                </div>

                <div className="relative pl-7">
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/50" />

                    {PROJECTS.map((p, i) => {
                        const showYear = yearIndexMap.get(p.period) === i;
                        const isLast = i === PROJECTS.length - 1;
                        const marginBottom = isLast ? 'mb-0' : showYear ? 'mb-8' : 'mb-4';
                        return (
                            <div key={p.title}>
                                {showYear && (
                                    <div className="scroll-reveal flex items-center gap-2 mb-4 font-mono text-[11px] text-muted-foreground/40" data-delay={300 + i * 50}>
                                        <span className="w-4 h-px bg-border/50 inline-block" />
                                        {p.period}
                                    </div>
                                )}

                                <div className={`relative ${marginBottom}`}>
                                    <div className={`absolute -left-[24px] top-5 w-3.5 h-3.5 rounded-full border-2 border-card ${p.dot} z-10`} />

                                    <div className="scroll-reveal-scale bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-border transition-all duration-300" data-delay={350 + i * 100}>
                                        <div className="relative w-full h-36 bg-muted/20">
                                            {p.cover && (
                                                <img
                                                    src={p.cover}
                                                    alt=""
                                                    className="object-cover absolute inset-0 w-full h-full"
                                                    width={400}
                                                    height={144}
                                                    loading="lazy"
                                                />
                                            )}
                                            <div className="absolute bottom-3 left-3 w-9 h-9 rounded-lg bg-card border border-border/60 overflow-hidden flex items-center justify-center shadow-sm">
                                                {p.logo ? (
                                                    <img
                                                        src={p.logo}
                                                        alt=""
                                                        className="object-contain w-full h-full"
                                                        width={36}
                                                        height={36}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <span className="text-lg">{p.fallbackIcon}</span>
                                                )}
                                            </div>
                                            <div className="absolute top-2.5 right-3 flex gap-1.5">
                                                {p.status === "postponed" && (
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 border border-amber-500/40">
                                                        postponed
                                                    </span>
                                                )}
                                                {!p.status && p.liveUrl && (
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/20 text-secondary-foreground border border-secondary/40">
                                                        ● live
                                                    </span>
                                                )}
                                                {p.githubUrl && (
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-card/90 text-muted-foreground border border-border/60">
                                                        open source
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <div className="mb-2">
                                                <p className="text-[14px] font-semibold text-foreground">{p.title}</p>
                                                <p className="text-[10px] font-mono text-muted-foreground/40 mt-0.5">{p.period}</p>
                                            </div>
                                            <p className="text-[12px] text-muted-foreground leading-relaxed mb-4">
                                                {p.desc}
                                            </p>

                                            <div className="border-t border-border/40 pt-3 mb-3">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {p.techs.map((t) => (
                                                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-muted/30 border border-border/40 rounded text-muted-foreground">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                {p.status !== "postponed" && p.liveUrl && (
                                                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                                                        className="cursor-target inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-md bg-secondary/20 text-secondary-foreground border border-secondary/40 hover:opacity-80 transition-opacity"
                                                    >
                                                        ↗ View live
                                                    </a>
                                                )}
                                                {p.githubUrl && (
                                                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                                                        className="cursor-target inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-md bg-muted/30 text-muted-foreground border border-border/40 hover:border-border hover:text-foreground transition-all"
                                                    >
                                                        <img src="/icons/github.svg" alt="" className="w-3 h-3 invert" width={12} height={12} loading="lazy" />
                                                        GitHub
                                                    </a>
                                                )}
                                                {p.status === "postponed" && (
                                                    <span className="text-[11px] font-mono px-3 py-1.5 rounded-md bg-amber-500/20 text-amber-600 border border-amber-500/40">
                                                        TBD
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

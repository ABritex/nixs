import { TOOLS } from "./constants";

export function ToolsGrid() {
    return (
        <section id="tools" className="relative w-full flex flex-col gap-8 overflow-hidden pointer-events-none" style={{ fontFamily: "var(--font-mono)" }}>
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 70% 30%, hsl(var(--secondary)) 0%, transparent 50%), radial-gradient(circle at 30% 70%, hsl(var(--primary)) 0%, transparent 50%)',
                }}
            />
            <div className="relative z-10 pointer-events-auto px-6 py-24">
                <div className="text-center space-y-3 mb-12">
                    <p className="scroll-reveal text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> tools
                    </p>
                    <h2 className="scroll-reveal text-[clamp(28px,5vw,56px)] font-black leading-[1.05] tracking-tight text-foreground" data-delay="100">
                        Daily Tools & Environment
                    </h2>
                    <p className="scroll-reveal text-sm text-muted-foreground/70 leading-relaxed max-w-lg mx-auto font-mono" data-delay="200">
                        Vim motions. Tmux panes. CLI-first utilities. No IDEs bloated with plugins I don&apos;t need.
                    </p>
                </div>

                <div className="scroll-reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {TOOLS.map((tool) => (
                        <div
                            key={tool.name}
                            className="cursor-target bg-card/50 border border-border/40 rounded-xl px-4 py-3.5 flex items-center justify-between hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200 group"
                        >
                            <div className="flex items-center gap-3">
                                {tool.icon && (
                                    <img src={tool.icon} alt="" className={`flex-shrink-0 object-contain w-5 h-5 ${tool.iconClassName ?? ''}`} width={20} height={20} loading="lazy" />
                                )}
                                <div>
                                    <p className="text-[13px] text-foreground font-semibold">{tool.name}</p>
                                    <p className="text-[10px] text-muted-foreground/50 tracking-widest mt-0.5">{tool.tag}</p>
                                </div>
                            </div>
                            <span className={`text-[10px] font-bold tracking-widest ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                ▸
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

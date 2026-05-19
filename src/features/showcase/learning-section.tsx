import { CURRENTLY_LEARNING, WANT_TO_LEARN } from "./constants";
import { Brain, Target } from "lucide-react";

export function LearningSection() {
    return (
        <section id="learning" className="relative w-full flex flex-col gap-8 overflow-hidden pointer-events-none">
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 40% 40%, hsl(var(--accent)) 0%, transparent 50%), radial-gradient(circle at 60% 60%, hsl(var(--secondary)) 0%, transparent 50%)',
                }}
            />
            <div className="relative z-10 pointer-events-auto px-6 py-24">
                <div className="text-center space-y-3 mb-12">
                    <p className="scroll-reveal text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> roadmap
                    </p>
                    <h2 className="scroll-reveal text-[clamp(28px,5vw,56px)] font-black leading-[1.05] tracking-tight text-foreground" data-delay="100">
                        Learning Path
                    </h2>
                    <p className="scroll-reveal text-sm text-muted-foreground/70 leading-relaxed max-w-lg mx-auto font-mono" data-delay="200">
                        What I&apos;m diving into now, and what&apos;s next on the list.
                    </p>
                </div>

                <div className="scroll-reveal space-y-10">
                    <div className="flex flex-col items-center">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-4 font-mono">
                            currently learning
                        </p>
                        <div className="bg-card/60 border border-accent/30 rounded-2xl px-8 py-5 flex items-center gap-4 shadow-[0_0_30px_-10px_hsl(var(--accent)/0.15)] max-w-md">
                            <Brain className="w-6 h-6 text-accent flex-shrink-0" />
                            <div>
                                <p className="text-[16px] text-foreground font-semibold">{CURRENTLY_LEARNING[0].name}</p>
                                <p className="text-[11px] text-muted-foreground/50 tracking-widest mt-0.5 uppercase">{CURRENTLY_LEARNING[0].tag}</p>
                                <p className="text-[11px] text-muted-foreground/40 mt-1">{CURRENTLY_LEARNING[0].context}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-4 font-mono">
                            want to learn
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {WANT_TO_LEARN.map((tool) => (
                                <div
                                    key={tool.name}
                                    className="cursor-target bg-card/40 border border-border/40 rounded-xl px-5 py-3 flex items-center gap-3 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200 group"
                                >
                                    {tool.icon && (
                                        <img src={tool.icon} alt="" className={`flex-shrink-0 object-contain w-5 h-5 ${tool.iconClassName ?? ''}`} width={20} height={20} loading="lazy" decoding="async" />
                                    )}
                                    <div>
                                        <p className="text-[13px] text-foreground font-semibold">{tool.name}</p>
                                        <p className="text-[10px] text-muted-foreground/50 tracking-widest mt-0.5">{tool.tag}</p>
                                    </div>
                                    <Target className="w-3.5 h-3.5 text-muted-foreground/30 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

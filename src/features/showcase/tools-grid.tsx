import { TOOLS } from "./constants";
import { SectionHeader, Divider } from "@/components/terminal";
import ShapeGrid from "@/components/shape-grid";

export function ToolsGrid() {
    return (
        <section id="tools" className="relative w-full flex flex-col gap-8 overflow-hidden" style={{ fontFamily: "var(--font-mono)" }}>
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 70% 30%, hsl(var(--secondary)) 0%, transparent 50%), radial-gradient(circle at 30% 70%, hsl(var(--primary)) 0%, transparent 50%)',
                }}
            />
            <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
                <ShapeGrid speed={0.25} squareSize={40} borderColor="rgba(255,255,255,0.04)" shape="circle" direction="down" />
            </div>
            <div className="relative z-10">
                <SectionHeader
                    subtitle={
                        <>
                            A curated selection of tools that power daily workflow —
                            <span className="text-foreground font-semibold"> battle-tested</span>,
                            <span className="text-foreground font-semibold"> performance-focused</span>,
                            always in the{" "}
                            <span className="text-foreground font-semibold">terminal</span>.
                        </>
                    }
                    title={<>Daily Tools<br />& Environment.</>}
                    note="Vim motions. Tmux panes. CLI-first utilities. No IDEs bloated with plugins I don't need."
                />

                <Divider />

                <div>
                    <p data-aos="fade-up" className="text-center text-[11px] tracking-[.25em] uppercase text-primary font-bold mb-8">
                        Daily Tools & Environment
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {TOOLS.map((tool) => (
                            <div data-aos="fade-up"
                                key={tool.name}
                                className="bg-card border border-border/40 rounded-2xl px-4 py-3.5 flex items-center justify-between hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200 cursor-default group"
                            >
                                <div className="flex items-center gap-3">
                                    {tool.icon && (
                                        <img src={tool.icon} alt={tool.name} className={`flex-shrink-0 object-contain w-5 h-5 ${tool.iconClassName ?? ''}`} />
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
            </div>
        </section>
    );
}

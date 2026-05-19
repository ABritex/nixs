import { useState } from "react";
import { TECH_CATEGORIES } from "./constants";
import { Code, Server, Container, Braces } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    frontend: <Code className="w-3.5 h-3.5" />,
    backend: <Server className="w-3.5 h-3.5" />,
    devops: <Container className="w-3.5 h-3.5" />,
    languages: <Braces className="w-3.5 h-3.5" />,
};

export function TechStack() {
    const [activeId, setActiveId] = useState("frontend");
    const active = TECH_CATEGORIES.find((c) => c.id === activeId)!;

    return (
        <section id="tech-stack" className="relative min-h-screen flex items-start justify-center px-6 py-24 overflow-hidden pointer-events-none" style={{ contentVisibility: 'auto' }}>
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 30% 20%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(var(--accent)) 0%, transparent 50%)',
                }}
            />

            <div className="relative z-10 w-full max-w-4xl mx-auto space-y-10 pointer-events-auto">
                <div className="text-center space-y-3">
                    <p className="scroll-reveal text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> skillset
                    </p>
                    <h2 className="scroll-reveal text-[clamp(28px,5vw,56px)] font-black leading-[1.05] tracking-tight text-foreground" data-delay="100">
                        Tech Stack & Proficiency
                    </h2>
                    <p className="scroll-reveal text-sm text-muted-foreground/70 leading-relaxed max-w-lg mx-auto font-mono" data-delay="200">
                        Every tool listed here has been used to ship real code into a <span className="text-foreground font-semibold">production environment</span>.
                    </p>
                </div>

                <div className="scroll-reveal" data-delay="250">
                    <div className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40 bg-muted/20">
                            <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                                <span className="w-2.5 h-2.5 rounded-full bg-secondary/50" />
                                <span className="w-2.5 h-2.5 rounded-full bg-accent/50" />
                            </div>
                            <span className="ml-2 text-[10px] tracking-widest text-muted-foreground/40 font-mono select-none">
                                <span className="text-accent">$</span> cat skills.json | jq &apos;.{activeId}&apos;
                            </span>
                        </div>

                        <div className="p-6 flex flex-col gap-6">
                            <div className="flex items-center gap-2 flex-wrap">
                                {TECH_CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveId(cat.id)}
                                        className={`cursor-target flex items-center gap-2 px-4 py-2 rounded-xl border text-[11px] font-bold tracking-[.15em] uppercase transition-all ${activeId === cat.id
                                            ? `${cat.bgColor} ${cat.borderColor} ${cat.color}`
                                            : "border-border/40 text-muted-foreground/60 hover:border-border hover:text-foreground"
                                            }`}
                                    >
                                        <span className={activeId === cat.id ? cat.color : "text-muted-foreground/60"}>
                                            {CATEGORY_ICONS[cat.id]}
                                        </span>
                                        {cat.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4">
                                <p className="text-[10px] text-muted-foreground/40 tracking-widest uppercase">
                                    hover a skill to see context
                                </p>
                                {active.techs.map((tech) => (
                                    <SkillRow
                                        key={tech.name}
                                        name={tech.name}
                                        level={tech.level}
                                        note={tech.note}
                                        colorClass={active.color}
                                        activeId={activeId}
                                        icon={tech.icon}
                                        iconClassName={tech.iconClassName}
                                    />
                                ))}
                            </div>

                            <p className="text-[10px] text-muted-foreground/30 border-t border-border pt-4">
                                <span className="text-accent/40">▸</span> self-assessed proficiency · updated 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

type SkillRowProps = {
    name: string;
    level: string;
    note: string;
    colorClass: string;
    activeId: string;
    icon?: string;
    iconClassName?: string;
};

function SkillRow({ name, level, note, colorClass, icon, iconClassName }: SkillRowProps) {
    const [hovered, setHovered] = useState(false);

    const levelColors: Record<string, string> = {
        Expert: "text-secondary",
        Proficient: "text-primary",
        Familiar: "text-muted-foreground",
    };

    return (
        <div
            className="group cursor-default"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                    {icon && (
                        <img
                            src={icon}
                            alt=""
                            className={`flex-shrink-0 object-contain w-4 h-4 ${iconClassName ?? ''}`}
                            width={16}
                            height={16}
                            loading="lazy"
                            decoding="async"
                        />
                    )}
                    <span className="text-sm text-foreground">{name}</span>
                    {hovered && (
                        <span className="text-xs text-muted-foreground animate-in fade-in duration-150">
                            — {note}
                        </span>
                    )}
                </div>
                <span className={`text-xs tabular-nums font-bold ${levelColors[level] || colorClass}`}>
                    {level}
                </span>
            </div>
            <div className="w-full h-[3px] bg-border rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${colorClass.replace("text-", "bg-")}`}
                    style={{
                        width: level === "Expert" ? "100%" : level === "Proficient" ? "75%" : "50%",
                    }}
                />
            </div>
        </div>
    );
}

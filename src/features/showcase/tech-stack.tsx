import { useEffect, useRef, useState } from "react";
import { gsap } from "#/lib/gsap";
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
    const sectionRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gridRef.current?.querySelectorAll('.skill-item')
            if (items) {
                gsap.fromTo(items,
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: 'power2.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    useEffect(() => {
        const items = gridRef.current?.querySelectorAll('.skill-item')
        if (items) {
            gsap.fromTo(items,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.2, stagger: 0.03, ease: 'power2.out' }
            )
        }
    }, [activeId])

    return (
        <section id="tech-stack" ref={sectionRef} className="relative min-h-screen flex items-start justify-center px-6 py-24 overflow-hidden pointer-events-none">
            <div className="relative z-10 w-full max-w-4xl mx-auto space-y-10 pointer-events-auto">
                <div className="text-center space-y-3">
                    <p className="text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> skillset
                    </p>
                    <h2 className="text-[clamp(28px,5vw,56px)] font-black leading-[1.05] tracking-tight text-foreground">
                        Tech Stack <span className="text-muted-foreground/30 font-mono text-[clamp(14px,2.5vw,28px)] font-light tracking-normal">&amp;</span> Proficiency
                    </h2>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-lg mx-auto font-mono">
                        Every tool listed here has been used to ship real code into a <span className="text-foreground font-semibold">production environment</span>.
                    </p>
                </div>

                <div className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
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

                        <div ref={gridRef} className="flex flex-col gap-4">
                            {active.techs.map((tech) => (
                                <SkillRow
                                    key={tech.name}
                                    name={tech.name}
                                    level={tech.level}
                                    note={tech.note}
                                    colorClass={active.color}
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
        </section>
    );
}

type SkillRowProps = {
    name: string;
    level: string;
    note: string;
    colorClass: string;
    icon?: string;
    iconClassName?: string;
};

function SkillRow({ name, level, note, colorClass, icon, iconClassName }: SkillRowProps) {
    const levelColors: Record<string, string> = {
        Expert: "text-secondary",
        Proficient: "text-primary",
        Familiar: "text-muted-foreground",
    };

    return (
        <div className="skill-item group cursor-default">
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                    {icon && (
                        <img
                            src={icon}
                            alt=""
                            className={`flex-shrink-0 object-contain w-4 h-4 ${iconClassName ?? ''}`}
                            width={16} height={16}
                            loading="lazy" decoding="async"
                        />
                    )}
                    <span className="text-sm text-foreground">{name}</span>
                    <span className="text-xs text-muted-foreground/50 hidden sm:inline">
                        — {note}
                    </span>
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

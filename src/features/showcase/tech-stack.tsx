"use client";
import { useState } from "react";
import { TECH_CATEGORIES } from "./constants";
import { SkillBar } from "./skill-bar";
import { SectionHeader, Divider, TerminalWindow } from "@/components/terminal";
import { Code, Server, Container } from "lucide-react";
import ShapeGrid from "@/components/shape-grid";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    frontend: <Code className="w-3.5 h-3.5" />,
    backend: <Server className="w-3.5 h-3.5" />,
    devops: <Container className="w-3.5 h-3.5" />,
};

export function TechStack() {
    const [activeId, setActiveId] = useState("frontend");
    const active = TECH_CATEGORIES.find((c) => c.id === activeId)!;

    return (
        <section id="tech-stack" className="relative w-full flex flex-col gap-8 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 30% 20%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(var(--accent)) 0%, transparent 50%)',
                }}
            />
            <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
                <ShapeGrid speed={0.2} squareSize={48} borderColor="rgba(255,255,255,0.04)" shape="hexagon" direction="diagonal" />
            </div>
            <div className="relative z-10">
                <SectionHeader
                    subtitle={
                        <>
                            Not a stack collector — a{" "}
                            <span className="text-foreground font-semibold">craftsman</span>. Every tool
                            here has shipped real code into a{" "}
                            <span className="text-foreground font-semibold">production environment</span>.
                            No tutorial badges. No fluff.
                        </>
                    }
                    title={<>Tech Stack<br />& Proficiency.</>}
                    note="Linux on bare metal. Terminal as home. Full-stack from schema to deploy — built iteratively, shipped quietly. $ cat ./skills.json | jq"
                />

                <Divider />

                <TerminalWindow dataAos="fade-up" command={`cat skills.json | jq '.${activeId}'`}>
                    <div className="p-6 flex flex-col gap-6">
                        <div className="flex items-center gap-2 flex-wrap">
                            {TECH_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveId(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[11px] font-bold tracking-[.15em] uppercase transition-all ${activeId === cat.id
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
                                hover a skill to see details
                            </p>
                            {active.techs.map((tech) => (
                                <SkillBar
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
                            <span className="text-accent/40">▸</span> self-assessed proficiency · updated 2024
                        </p>
                    </div>
                </TerminalWindow>
            </div>
        </section>
    );
}

"use client";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
    subtitle: React.ReactNode;
    title: React.ReactNode;
    note?: React.ReactNode;
    subtitleClassName?: string;
    titleClassName?: string;
    titleStyle?: React.CSSProperties;
    aos?: boolean;
};

export function SectionHeader({
    subtitle,
    title,
    note,
    subtitleClassName,
    titleClassName,
    titleStyle,
    aos = true,
}: SectionHeaderProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
            <div className="space-y-4">
                <p
                    data-aos={aos ? "fade-right" : undefined}
                    className={cn(
                        "text-xs tracking-[0.25em] text-muted-foreground/40 uppercase font-mono",
                        subtitleClassName
                    )}
                >
                    <span className="text-accent">$</span>{" "}
                    {subtitle}
                </p>
                <h2
                    data-aos={aos ? "fade-right" : undefined}
                    className={cn(
                        "text-[clamp(32px,5.5vw,72px)] font-black leading-[0.92] tracking-tight",
                        titleClassName
                    )}
                    style={{
                        background:
                            "linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--primary)) 60%, hsl(var(--accent)) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        letterSpacing: "-0.03em",
                        ...titleStyle,
                    }}
                >
                    {title}
                </h2>
            </div>
            {note && (
                <div
                    data-aos={aos ? "fade-left" : undefined}
                    className="hidden lg:flex items-start justify-end pt-2"
                >
                    <p className="text-[12px] text-muted-foreground/50 leading-relaxed max-w-sm text-right font-mono border-l border-border/40 pl-6">
                        {note}
                    </p>
                </div>
            )}
        </div>
    );
}
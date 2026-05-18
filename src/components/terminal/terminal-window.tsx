"use client";

import { cn } from "@/lib/utils";

type TerminalWindowProps = {
    command?: string;
    children: React.ReactNode;
    className?: string;
    dataAos?: string;
};

export function TerminalWindow({
    command,
    children,
    className,
    dataAos,
}: TerminalWindowProps) {
    return (
        <div
            data-aos={dataAos}
            className={cn(
                "rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden",
                className
            )}
        >
            {/* Title bar */}
            <div className="px-5 py-3 border-b border-border/40 bg-muted/20 flex items-center gap-3">
                <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-accent/50" />
                </div>
                <div className="flex-1 flex items-center gap-2">
                    <span className="text-accent text-[10px]">$</span>
                    <span className="text-[10px] text-muted-foreground/50 tracking-widest font-mono">
                        {command}
                    </span>
                </div>
            </div>
            {children}
        </div>
    );
}
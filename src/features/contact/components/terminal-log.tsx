import { CheckCircle2, XCircle, Clock, Send } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error" | "cooldown";

interface TerminalLogProps {
    lines: string[];
    state: FormState;
    remaining: number;
}

export default function TerminalLog({ lines, state, remaining }: TerminalLogProps) {
    const isLoading = state === "loading";
    const isCooldown = state === "cooldown";
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    const cooldownLabel = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    return (
        <div className="space-y-3">
            {lines.length > 0 && (
                <div className="rounded-xl border border-border/40 bg-background/70 px-5 py-4 flex flex-col gap-1 font-mono text-[11px]">
                    {lines.map((line, i) => (
                        <p key={i}
                            className={
                                line.startsWith("✓") ? "text-secondary"
                                    : line.startsWith("✗") ? "text-destructive"
                                        : line.startsWith("$") ? "text-primary"
                                            : "text-muted-foreground/60"
                            }
                        >
                            {line}
                        </p>
                    ))}
                    {isLoading && (
                        <span className="inline-block w-2 h-3 bg-primary animate-pulse rounded-sm" />
                    )}
                </div>
            )}

            <div className="flex items-center gap-4">
                <button type="submit" disabled={isLoading || isCooldown} className="cursor-target group flex items-center gap-2.5 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/60 px-6 py-3 text-[13px] font-semibold text-primary transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? (
                        <>
                            <span className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            Sending...
                        </>
                    ) : isCooldown ? (
                        <>
                            <Clock size={14} />
                            {cooldownLabel}
                        </>
                    ) : (
                        <>
                            <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
                            Send Message
                        </>
                    )}
                </button>

                {state === "success" && (
                    <div className="flex items-center gap-1.5 text-[12px] text-secondary">
                        <CheckCircle2 size={14} />
                        Message sent!
                    </div>
                )}
                {state === "error" && (
                    <div className="flex items-center gap-1.5 text-[12px] text-destructive">
                        <XCircle size={14} />
                        Something went wrong.
                    </div>
                )}
                {isCooldown && (
                    <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                        <Clock size={14} />
                        Cooldown active
                    </div>
                )}
            </div>
        </div>
    );
}

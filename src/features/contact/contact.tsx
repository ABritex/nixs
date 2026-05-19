import { useState, useEffect, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle2, XCircle, Clock } from "lucide-react";
import { CONTACT_LINKS, SUPPORT_LINKS, META, COLOR } from "./constants";
import { env } from "#/routes/-env";
import Field from "./components/field";
import { delay } from "./components/delay";

const COOLDOWN_MS = 2 * 60 * 1000;
const STORAGE_KEY = "contact_cooldown";

type FormState = "idle" | "loading" | "success" | "error" | "cooldown";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [state, setState] = useState<FormState>("idle");
    const [lines, setLines] = useState<string[]>([]);
    const [remaining, setRemaining] = useState(0);

    const getCooldownEnd = useCallback((): number => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? parseInt(stored, 10) : 0;
    }, []);

    useEffect(() => {
        const cooldownEnd = getCooldownEnd();
        const now = Date.now();
        if (cooldownEnd > now) {
            setState("cooldown");
            setRemaining(cooldownEnd - now);
        }
    }, [getCooldownEnd]);

    useEffect(() => {
        if (state !== "cooldown" || remaining <= 0) return;
        const interval = setInterval(() => {
            const cooldownEnd = getCooldownEnd();
            const left = cooldownEnd - Date.now();
            if (left <= 0) {
                setRemaining(0);
                setState("idle");
                localStorage.removeItem(STORAGE_KEY);
                clearInterval(interval);
            } else {
                setRemaining(left);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [state, remaining, getCooldownEnd]);

    const pushLine = (line: string) =>
        setLines((prev) => [...prev, line]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const cooldownEnd = getCooldownEnd();
        if (Date.now() < cooldownEnd) {
            setState("cooldown");
            return;
        }

        setState("loading");
        setLines([]);

        pushLine(`$ send-mail --to ${form.email}`);
        await delay(400);
        pushLine(`> Validating fields...`);
        await delay(500);
        pushLine(`> Composing payload...`);
        await delay(600);
        pushLine(`> Connecting to mail server...`);
        await delay(700);

        try {
            await emailjs.send(
                env.VITE_EMAILJS_SERVICE_ID,
                env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    from_email: form.email,
                    subject: form.subject,
                    message: form.message,
                },
                env.VITE_EMAILJS_PUBLIC_KEY
            );
            pushLine(`✓ Message delivered successfully.`);
            setState("success");
            setForm({ name: "", email: "", subject: "", message: "" });

            const newCooldownEnd = Date.now() + COOLDOWN_MS;
            localStorage.setItem(STORAGE_KEY, newCooldownEnd.toString());
            setRemaining(COOLDOWN_MS);
            setTimeout(() => setState("cooldown"), 3000);
        } catch (err) {
            console.error("EmailJS error:", err);
            pushLine(`✗ Delivery failed. Try again or email directly.`);
            setState("error");
        }
    };

    const isLoading = state === "loading";
    const isCooldown = state === "cooldown";
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    const cooldownLabel = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    return (
        <section id="contact" className="relative min-h-screen flex items-start justify-center px-6 py-24 overflow-hidden pointer-events-none">
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 30% 50%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 70% 50%, hsl(var(--accent)) 0%, transparent 50%)',
                }}
            />

            <div className="relative z-10 w-full max-w-6xl mx-auto space-y-10 pointer-events-auto">
                <div className="text-center space-y-3">
                    <p className="scroll-reveal text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> contact
                    </p>
                    <h2 className="scroll-reveal text-[clamp(28px,5vw,56px)] font-black leading-[1.05] tracking-tight text-foreground" data-delay="100">
                        Get In Touch
                    </h2>
                    <p className="scroll-reveal text-sm md:text-base text-muted-foreground/70 leading-relaxed max-w-lg mx-auto font-mono" data-delay="200">
                        Got a project, opportunity, or just want to say hi? Let&apos;s talk.
                    </p>
                </div>

                <div className="scroll-reveal flex flex-wrap justify-center gap-3" data-delay="250">
                    {META.map((m) => (
                        <div key={m.label} className="flex items-center gap-2 rounded-full border border-border/40 bg-card/50 px-4 py-2 text-[11px]">
                            <span className={`${m.color} opacity-70`}>{m.icon}</span>
                            <span className="text-muted-foreground/40 tracking-widest uppercase">{m.label}:</span>
                            <span className={`${m.color} font-semibold`}>{m.value}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                    <div className="scroll-reveal-left" data-delay="300">
                        <div className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
                            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40 bg-muted/20">
                                <div className="flex gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-secondary/50" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-accent/50" />
                                </div>
                                <span className="ml-2 text-[10px] tracking-widest text-muted-foreground/40 font-mono select-none">
                                    <span className="text-accent">$</span> ./contact.sh --interactive
                                </span>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="name" type="text" placeholder="Your full name" value={form.name} required onChange={(v) => setForm((p) => ({ ...p, name: v }))} />
                                    <Field label="email" type="email" placeholder="you@domain.com" value={form.email} required onChange={(v) => setForm((p) => ({ ...p, email: v }))} />
                                </div>

                                <Field label="subject" type="text" placeholder="What's this about?" value={form.subject} required onChange={(v) => setForm((p) => ({ ...p, subject: v }))} />

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] tracking-[.2em] uppercase text-muted-foreground/40">
                                        <span className="text-accent">▸</span> message
                                    </label>
                                    <textarea placeholder="Write your message here..." value={form.message} required rows={6} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} className="cursor-target w-full rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none resize-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all duration-150" />
                                </div>

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
                            </form>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="scroll-reveal-right space-y-3" data-delay="350">
                            <p className="text-[10px] tracking-[.25em] text-muted-foreground/30 uppercase font-mono">
                                <span className="text-accent">$</span> curl --socials
                            </p>
                            {CONTACT_LINKS.map((link) => {
                                const c = link.color ? COLOR[link.color] : COLOR.primary;
                                const isSvgIcon = typeof link.icon === "string";
                                return (
                                    <a key={link.label}
                                        href={link.href}
                                        target={link.href.startsWith("http") ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className={`cursor-target group flex flex-col gap-3 rounded-xl border border-border/40 bg-card/50 px-5 py-4 ${c.hoverBorder} hover:bg-card/70 transition-all duration-150`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${c.bg}`}>
                                                {isSvgIcon ? (
                                                    <img src={link.icon as string} alt="" className={`w-4 h-4 ${link.iconClassName ?? ''}`} width={16} height={16} loading="lazy" />
                                                ) : (
                                                    <span className={c.text}>{link.icon}</span>
                                                )}
                                            </div>
                                            <span className={`text-[10px] font-bold tracking-[.2em] uppercase ${c.text}`}>
                                                {link.label}
                                            </span>
                                        </div>
                                        {link.command && link.value && (
                                            <div className="flex flex-col gap-0.5 pl-9">
                                                <span className="text-[10px] text-muted-foreground/30 font-mono">$ {link.command}</span>
                                                <span className={`text-[12px] font-semibold ${c.text} group-hover:underline underline-offset-2`}>
                                                    {link.value}
                                                </span>
                                            </div>
                                        )}
                                    </a>
                                );
                            })}
                        </div>

                        <div className="scroll-reveal-right" data-delay="400">
                            <p className="text-[10px] tracking-[.25em] text-muted-foreground/30 uppercase font-mono mb-3">
                                <span className="text-accent">$</span> support
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {SUPPORT_LINKS.map((link) => (
                                    <a key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cursor-target flex items-center gap-2 rounded-xl border border-border/40 bg-card/50 px-4 py-3 hover:bg-card/70 transition-all"
                                    >
                                        <img src={link.icon} alt="" className="w-4 h-4 invert" width={16} height={16} loading="lazy" />
                                        <span className="text-[11px] font-semibold text-foreground">{link.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="scroll-reveal-right rounded-xl border border-border/40 bg-card/50 px-5 py-5 flex flex-col gap-3" data-delay="450">
                            <div className="flex items-center gap-2">
                                <span className="relative flex w-2 h-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-60" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
                                </span>
                                <span className="text-[10px] font-bold tracking-[.2em] uppercase text-secondary">
                                    Available
                                </span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed">
                                Currently open to{" "}
                                <span className="text-foreground font-semibold">internship roles</span>,{" "}
                                <span className="text-foreground font-semibold">freelance projects</span>, and{" "}
                                <span className="text-foreground font-semibold">entry-level positions</span>.
                            </p>
                            <p className="text-[10px] text-muted-foreground/30 font-mono border-t border-border/40 pt-3">
                                $ status --check<br />
                                <span className="text-secondary">▸ open_to_work: true</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

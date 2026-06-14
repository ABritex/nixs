import { useState, useEffect, useCallback, useRef } from "react";
import { gsap } from "#/lib/gsap";
import emailjs from "@emailjs/browser";
import { META, CONTACT_COOLDOWN_MS, CONTACT_COOLDOWN_STORAGE_KEY } from "./constants";
import { env } from "#/routes/-env";
import Field from "./components/field";
import { delay } from "./components/delay";
import TerminalLog from "./components/terminal-log";
import ContactSidebar from "./components/sidebar";

type FormState = "idle" | "loading" | "success" | "error" | "cooldown";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function Contact() {
    const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
    const [state, setState] = useState<FormState>("idle");
    const [lines, setLines] = useState<string[]>([]);
    const [remaining, setRemaining] = useState(0);
    const [showHelp, setShowHelp] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null)

    const getCooldownEnd = useCallback((): number => {
        const stored = localStorage.getItem(CONTACT_COOLDOWN_STORAGE_KEY);
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
                localStorage.removeItem(CONTACT_COOLDOWN_STORAGE_KEY);
                clearInterval(interval);
            } else {
                setRemaining(left);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [state, remaining, getCooldownEnd]);

    const pushLine = useCallback((line: string) => {
        setLines((prev) => [...prev, line]);
    }, []);

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

            const newCooldownEnd = Date.now() + CONTACT_COOLDOWN_MS;
            localStorage.setItem(CONTACT_COOLDOWN_STORAGE_KEY, newCooldownEnd.toString());
            setRemaining(CONTACT_COOLDOWN_MS);
            setTimeout(() => setState("cooldown"), 3000);
        } catch (err) {
            console.error("EmailJS error:", err);
            pushLine(`✗ Delivery failed. Try again or email directly.`);
            setState("error");
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = sectionRef.current?.querySelectorAll('.contact-reveal')
            if (items) {
                gsap.fromTo(items,
                    { opacity: 0, y: 16 },
                    {
                        opacity: 1, y: 0, duration: 0.35, stagger: 0.07, ease: 'power2.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === '?' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
                setShowHelp((p) => !p)
            }
            if (e.key === 'Escape') setShowHelp(false)
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])

    const handleClear = useCallback(() => {
        setForm({ name: "", email: "", subject: "", message: "" })
        setLines([])
        setState("idle")
    }, [])

    return (
        <section id="contact" ref={sectionRef} className="relative min-h-screen flex items-start justify-center px-6 overflow-hidden pointer-events-none">
            <div className="relative z-10 w-full max-w-6xl mx-auto space-y-10 pointer-events-auto">
                <div className="contact-reveal text-center space-y-3">
                    <p className="text-xs tracking-[0.25em] text-muted-foreground/50 uppercase font-mono">
                        <span className="text-accent">$</span> contact
                    </p>
                    <h2 className="text-[clamp(28px,5vw,56px)] font-black leading-[1.05] tracking-tight text-foreground">
                        Get In <span className="text-accent/70">Touch</span>
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground/70 leading-relaxed max-w-lg mx-auto font-mono">
                        Got a project, opportunity, or just want to say hi? Let&apos;s talk.
                    </p>
                </div>

                <div className="contact-reveal flex flex-wrap justify-center gap-3">
                    {META.map((m) => (
                        <div key={m.label} className="flex items-center gap-2 rounded-full border border-border/40 bg-card/50 px-4 py-2 text-[11px]">
                            <span className={`${m.color} opacity-70`}>{m.icon}</span>
                            <span className="text-muted-foreground/60 tracking-widest uppercase">{m.label}:</span>
                            <span className={`${m.color} font-semibold`}>{m.value}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                    <div className="contact-reveal">
                        <div className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
                            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40 bg-muted/20">
                                <div className="flex gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-secondary/50" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-accent/50" />
                                </div>
                                <span className="ml-2 text-[10px] tracking-widest text-muted-foreground/60 font-mono select-none">
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
                                    <label className="text-[10px] tracking-[.2em] uppercase text-muted-foreground/60">
                                        <span className="text-accent">▸</span> message
                                    </label>
                                    <textarea placeholder="Write your message here..." value={form.message} required rows={6} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} className="cursor-target w-full rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none resize-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all duration-150" />
                                </div>

                                <TerminalLog lines={lines} state={state} remaining={remaining} />
                                <div className="flex gap-2">
                                    <button type="submit" disabled={state === "loading" || state === "cooldown"}
                                        className="cursor-target flex-1 px-4 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold font-mono hover:opacity-90 transition-opacity disabled:opacity-40"
                                    >
                                        {state === "loading" ? "Sending..." : state === "cooldown" ? `Wait ${Math.ceil(remaining / 1000)}s` : "Send →"}
                                    </button>
                                    <button type="button" onClick={handleClear}
                                        className="cursor-target px-3 py-2.5 rounded-xl border border-border/40 text-muted-foreground/60 hover:text-foreground text-xs font-mono hover:border-border transition-all"
                                    >
                                        clear
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <ContactSidebar />
                </div>

                <div className="contact-reveal flex justify-center">
                    <button onClick={() => setShowHelp((p) => !p)}
                        className="cursor-target text-[10px] font-mono text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
                    >
                        <span className="text-accent/40">?</span> press <span className="text-accent/40">?</span> for commands
                    </button>
                </div>
            </div>

            {showHelp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto"
                    onClick={() => setShowHelp(false)}
                >
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
                    <div className="relative rounded-xl border border-border/40 bg-card p-6 max-w-sm w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-xs font-mono text-accent">
                                <span className="text-accent">$</span> help --available
                            </p>
                            <button onClick={() => setShowHelp(false)}
                                className="text-muted-foreground/50 hover:text-foreground text-sm font-mono"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-2 text-xs font-mono">
                            {[
                                { cmd: 'send-mail', desc: 'Submit the contact form' },
                                { cmd: 'clear', desc: 'Reset all fields' },
                                { cmd: 'help / ?', desc: 'Toggle this panel' },
                                { cmd: 'esc', desc: 'Close panel' },
                            ].map(({ cmd, desc }) => (
                                <div key={cmd} className="flex gap-3 text-muted-foreground/70">
                                    <span className="text-accent/60 shrink-0">$ {cmd}</span>
                                    <span className="text-muted-foreground/50">— {desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

import { useState, useEffect, useCallback } from "react";
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

                                <TerminalLog lines={lines} state={state} remaining={remaining} />
                            </form>
                        </div>
                    </div>

                    <ContactSidebar />
                </div>
            </div>
        </section>
    );
}

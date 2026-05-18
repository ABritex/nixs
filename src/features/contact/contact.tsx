"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { SectionHeader, Divider, TerminalWindow } from "@/components/terminal";
import { Mail, Send, CheckCircle2, XCircle } from "lucide-react";
import { PERSON } from "@/constants/personal";
import ShapeGrid from "@/components/shape-grid";
import { CONTACT_LINKS, META, COLOR } from "./constants";
import { env } from "#/routes/-env";
import Field from "./components/field";
import { delay } from "./components/delay";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [state, setState] = useState<FormState>("idle");
    const [lines, setLines] = useState<string[]>([]);

    const pushLine = (line: string) =>
        setLines((prev) => [...prev, line]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
        } catch (err) {
            console.error("EmailJS error:", err);
            pushLine(`✗ Delivery failed. Try again or email directly.`);
            setState("error");
        }
    };

    const isLoading = state === "loading";

    return (
        <section id="contact" className="relative w-full flex flex-col gap-12 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 30% 50%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 70% 50%, hsl(var(--accent)) 0%, transparent 50%)',
                }}
            />
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                <ShapeGrid speed={0.3} squareSize={32} borderColor="rgba(255,255,255,0.04)" shape="hexagon" direction="left" />
            </div>
            <div className="relative z-10">
                <SectionHeader
                    subtitle={
                        <>
                            Got a project, opportunity, or just want to say hi?{" "}
                            <span className="text-foreground font-semibold">Let&apos;s talk.</span>
                        </>
                    }
                    title={<>Get In<br />Touch.</>}
                    note={
                        <>
                            {PERSON.course} · {PERSON.academicYear}
                            <br />
                            <span className="text-muted-foreground/40">$ open contact.sh</span>
                        </>
                    }
                />

                <Divider icon={<Mail size={18} className="text-primary" />} />

                <div data-aos="fade-up" className="flex flex-wrap gap-3">
                    {META.map((m) => (
                        <div key={m.label} className="flex items-center gap-2 rounded-full border border-border/40 bg-card/50 px-4 py-2 text-[11px]">
                            <span className={`${m.color} opacity-70`}>{m.icon}</span>
                            <span className="text-muted-foreground/40 tracking-widest uppercase">{m.label}:</span>
                            <span className={`${m.color} font-semibold`}>{m.value}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
                    <TerminalWindow dataAos="fade-up" command="./contact.sh --interactive">
                        <form onSubmit={handleSubmit} className="p-6 md:p-10 flex flex-col gap-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="name" type="text" placeholder="Your full name" value={form.name} required onChange={(v) => setForm((p) => ({ ...p, name: v }))} />
                                <Field label="email" type="email" placeholder="you@domain.com" value={form.email} required onChange={(v) => setForm((p) => ({ ...p, email: v }))} />
                            </div>

                            <Field label="subject" type="text" placeholder="What's this about?" value={form.subject} required onChange={(v) => setForm((p) => ({ ...p, subject: v }))} />

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] tracking-[.2em] uppercase text-muted-foreground/40">
                                    <span className="text-accent">▸</span> message
                                </label>
                                <textarea placeholder="Write your message here..." value={form.message} required rows={6} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} className="w-full rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none resize-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all duration-150" />
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
                                <button type="submit" disabled={isLoading} className="group flex items-center gap-2.5 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/60 px-6 py-3 text-[13px] font-semibold text-primary transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isLoading ? (
                                        <>
                                            <span className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                            Sending...
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
                            </div>
                        </form>
                    </TerminalWindow>

                    <div className="flex flex-col gap-4">
                        {CONTACT_LINKS.map((link) => {
                            const c = link.color ? COLOR[link.color] : COLOR.primary;
                            const isSvgIcon = typeof link.icon === "string";
                            return (
                                <a key={link.label} data-aos="fade-left"
                                    href={link.href}
                                    target={link.href.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className={`group flex flex-col gap-3 rounded-xl border border-border/40 bg-card/50 px-5 py-4 ${c.hoverBorder} hover:bg-card/70 transition-all duration-150`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${c.bg}`}>
                                            {isSvgIcon ? (
                                                <img src={link.icon as string} alt={link.label} className={`w-4 h-4 ${link.iconClassName ?? ''}`} />
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

                        <div data-aos="fade-left" className="rounded-xl border border-border/40 bg-card/50 px-5 py-5 flex flex-col gap-3">
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



import { CONTACT_LINKS, SUPPORT_LINKS, COLOR } from "../constants";

export default function ContactSidebar() {
    return (
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
                                        <img src={link.icon as string} alt="" className={`w-4 h-4 ${link.iconClassName ?? ''}`} width={16} height={16} loading="lazy" decoding="async" />
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
                            <img src={link.icon} alt="" className="w-4 h-4 invert" width={16} height={16} loading="lazy" decoding="async" />
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
    );
}

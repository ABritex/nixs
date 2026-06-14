import { Link } from '@tanstack/react-router'
import { PERSON } from '#/constants/personal'

const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Showcase', href: '/show-case' },
    { label: 'Contact', href: '/contact-me' },
]

const SOCIALS = [
    { label: 'GitHub', href: 'https://github.com/ABritex' },
    { label: 'YouTube', href: 'https://www.youtube.com/@ABr1tex' },
    { label: 'Facebook', href: 'https://www.facebook.com/abeleda123/' },
]

const CTAS = [
    { cmd: 'send-mail', label: 'Say Hello', href: '/contact-me' },
    { cmd: 'cat showcase', label: 'View Projects', href: '/show-case' },
]

export default function Footer() {
    return (
        <footer className="relative px-4 pb-4 pt-0 overflow-hidden font-mono">
            {/* Background glow */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 30% 20%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(var(--accent)) 0%, transparent 50%)',
                }}
            />

            <div className="max-w-6xl mx-auto">
                <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden relative">

                    {/* Terminal title bar */}
                    <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40 bg-muted/20">
                        <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                            <span className="w-2.5 h-2.5 rounded-full bg-secondary/50" />
                            <span className="w-2.5 h-2.5 rounded-full bg-accent/50" />
                        </div>
                        <span className="ml-2 text-[10px] tracking-widest text-muted-foreground/60 font-mono select-none">
                            <span className="text-accent">$</span> ./footer.sh
                        </span>
                    </div>

                    {/* Main content */}
                    <div className="flex flex-col lg:flex-row gap-10 px-6 pt-8 pb-6">

                        {/* Brand / tagline */}
                        <div className="flex-1 space-y-4">
                            <p className="text-[10px] tracking-[.25em] text-muted-foreground/50 uppercase">
                                <span className="text-accent">$</span> ./tagline.sh
                            </p>
                            <p className="text-sm font-semibold leading-relaxed text-foreground max-w-xs">
                                Where <span className="text-primary">aesthetics</span> &amp;{' '}
                                <span className="text-accent">functionality</span> meet.
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground/50">
                                <span className="inline-block w-2 h-3 bg-accent/60 animate-pulse" />
                                <span>while true; do build; done</span>
                            </div>
                        </div>

                        {/* Links columns */}
                        <div className="flex flex-wrap gap-10">

                            {/* Explore */}
                            <div className="space-y-3">
                                <p className="text-[10px] tracking-[.25em] text-muted-foreground/50 uppercase">
                                    <span className="text-accent">$</span> ls ./explore
                                </p>
                                <nav className="flex flex-col gap-2">
                                    {NAV_ITEMS.map(({ label, href }) => (
                                        <Link
                                            key={label}
                                            to={href}
                                            className="cursor-target text-sm text-muted-foreground/60 hover:text-foreground transition-colors flex items-center gap-2 group no-underline"
                                        >
                                            <span className="text-accent/50 group-hover:text-accent transition-colors">▸</span>
                                            {label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            {/* Socials */}
                            <div className="space-y-3">
                                <p className="text-[10px] tracking-[.25em] text-muted-foreground/50 uppercase">
                                    <span className="text-accent">$</span> curl --socials
                                </p>
                                <div className="flex flex-col gap-2">
                                    {SOCIALS.map(({ label, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cursor-target text-sm text-muted-foreground/60 hover:text-foreground transition-colors flex items-center gap-2 group no-underline"
                                        >
                                            <span className="text-accent/50 group-hover:text-accent transition-colors">▸</span>
                                            {label}
                                            <span className="text-[10px] text-muted-foreground/20 group-hover:text-muted-foreground/50 transition-colors">
                                                ↗
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="space-y-3">
                                <p className="text-[10px] tracking-[.25em] text-muted-foreground/50 uppercase">
                                    <span className="text-accent">$</span> ./connect.sh
                                </p>
                                <div className="flex flex-col gap-2">
                                    {CTAS.map(({ cmd, label, href }) => (
                                        <Link
                                            key={cmd}
                                            to={href}
                                            className="cursor-target group flex items-center justify-between rounded-xl border border-border/40 bg-muted/10 px-4 py-2.5 hover:border-primary/30 hover:bg-card/60 transition-all no-underline"
                                        >
                                            <div>
                                                <p className="text-[10px] font-mono text-accent/70">{`$ ${cmd}`}</p>
                                                <p className="text-sm font-semibold text-foreground">{label}</p>
                                            </div>
                                            <span className="text-accent/60 group-hover:text-accent group-hover:translate-x-1 transition-all">
                                                →
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Big wordmark */}
                    <div
                        className="px-5 pb-1 leading-none select-none pointer-events-none border-t border-border/20 pt-5"
                        aria-hidden="true"
                    >
                        <span
                            className="block font-black tracking-tight text-foreground/[0.07]"
                            style={{
                                fontSize: 'clamp(3rem, 8vw, 7rem)',
                                lineHeight: 0.88,
                                letterSpacing: '-0.03em',
                            }}
                        >
                            {PERSON.name.toLowerCase().replace(/\s+/g, '-')}
                        </span>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 border-t border-border/40 text-[11px] text-muted-foreground/60 gap-2">
                        <p className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
                            <span className="text-accent">▸</span> {PERSON.name.toLowerCase()} &copy; {new Date().getFullYear()}
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-accent">$</span> cat /etc/location{' '}
                            <span className="text-secondary">&rarr; {PERSON.location}</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
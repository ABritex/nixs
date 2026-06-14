import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
    { label: 'Home', cmd: '~/', href: '/' },
    { label: 'Showcase', cmd: '~/showcase', href: '/show-case' },

    { label: 'Contact', cmd: '~/contact', href: '/contact-me' },
]

export default function Header() {
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()
    const isShowcase = pathname === '/show-case'
    const [showTooltip, setShowTooltip] = useState(false)

    useEffect(() => {
        if (isShowcase) return
        let timer: ReturnType<typeof setTimeout>
        const cycle = () => {
            setShowTooltip(true)
            timer = setTimeout(() => {
                setShowTooltip(false)
                timer = setTimeout(cycle, 2000)
            }, 5000)
        }
        timer = setTimeout(cycle, 2000)
        return () => clearTimeout(timer)
    }, [isShowcase])

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
            <div className="max-w-6xl mx-auto rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl px-5 py-3 flex items-center">
                <Link to="/" className="cursor-target flex items-center gap-2 text-[13px] tracking-widest text-foreground no-underline">
                    <span className="text-accent">▸</span>
                    <span className="font-bold">nicholas-abeleda</span>
                    <span className="text-muted-foreground/40">~</span>
                </Link>

                <nav className="hidden md:flex items-center gap-2 ml-auto">
                    <span className="text-[10px] text-muted-foreground/50 font-mono tracking-wider select-none pointer-events-none">
                        <span className="text-accent">❯</span> goto
                    </span>
                    {NAV_ITEMS.map(({ label, cmd, href }) => {
                        const linkClass = 'cursor-target relative flex items-center gap-1.5 text-[11px] text-muted-foreground/70 hover:text-foreground px-2.5 py-1.5 transition-colors no-underline after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-px after:w-0 after:bg-accent/60 after:transition-all hover:after:w-full' + (label === 'Showcase' && showTooltip ? ' text-accent after:w-full' : '')
                        return (
                            <span key={label} className="relative">
                                <Link
                                    to={href}
                                    activeProps={{ className: 'text-foreground after:w-full' }}
                                    className={linkClass}
                                >
                                    <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-accent/10 text-accent text-[10px] font-semibold">$</span>
                                    {cmd}
                                    {label === 'Showcase' && !isShowcase && (
                                        <AnimatePresence>
                                            {showTooltip && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -4, y: -4 }}
                                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                                    exit={{ opacity: 0, x: 2, y: -2 }}
                                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                                    className="absolute -top-3.5 -right-3 z-50"
                                                >
                                                    <motion.span
                                                        animate={{ scale: [1, 1.15, 1] }}
                                                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                                                        className="block px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider font-mono bg-accent text-accent-foreground shadow-[0_0_8px_hsl(var(--accent)/0.5)]"
                                                    >
                                                        NEW
                                                    </motion.span>
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </Link>
                            </span>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden cursor-target flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg border border-border/40 bg-card/50 transition-colors"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                    >
                    <span className="text-accent">$</span>
                    <div className="w-4 h-3 flex flex-col justify-between">
                        <motion.span
                            animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="block w-full h-0.5 bg-current origin-center"
                        />
                        <motion.span
                            animate={open ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="block w-full h-0.5 bg-current"
                        />
                        <motion.span
                            animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="block w-full h-0.5 bg-current origin-center"
                        />
                    </div>
                </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="md:hidden mt-2 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl px-4 py-3 flex flex-col gap-1"
                    >
                        {NAV_ITEMS.map(({ label, cmd, href }) => (
                            <Link
                                key={label}
                                to={href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted/40 transition-colors no-underline"
                            >
                                <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-accent/10 text-accent text-[10px] font-semibold">$</span>
                                {cmd}
                                <span className="text-muted-foreground/30 ml-auto">{label}</span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

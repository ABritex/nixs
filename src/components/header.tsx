import { Link } from '@tanstack/react-router'
import { useState } from 'react'

const NAV_ITEMS = [
  { label: 'Home', cmd: '~/', href: '/' },
  { label: 'Showcase', cmd: '~/showcase', href: '/show-case' },
  { label: 'Contact', cmd: '~/contact', href: '/contact-me' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="max-w-6xl mx-auto rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl px-5 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-[13px] tracking-widest text-foreground no-underline">
          <span className="text-accent">▸</span>
          <span className="font-bold">nicholas-abeleda</span>
          <span className="text-muted-foreground/40">~</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ label, cmd, href }) => (
            <Link
              key={label}
              to={href}
              activeProps={{ className: 'bg-muted/60 text-foreground' }}
              className="cursor-target flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg transition-colors hover:bg-muted/40 no-underline"
            >
              <span className="text-accent/50">$</span>
              {cmd}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg border border-border/40 bg-card/50"
        >
          <span className="text-accent">$</span> menu
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl px-4 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, cmd, href }) => (
            <Link
              key={label}
              to={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted/40 transition-colors no-underline"
            >
              <span className="text-accent/50">$</span>
              {cmd}
              <span className="text-muted-foreground/30 ml-auto">{label}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

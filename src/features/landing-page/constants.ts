export const SOCIALS = [
    { label: 'GitHub', url: 'https://github.com/ABritex' },
    { label: 'YouTube', url: 'https://www.youtube.com/@ABr1tex' },
    { label: 'Facebook', url: 'https://www.facebook.com/abeleda123/' },
]

export const CATEGORIES = [
    { id: 'frontend', label: 'Frontend', color: 'text-primary', borderColor: 'border-primary/30', bgColor: 'bg-primary/10' },
    { id: 'backend', label: 'Backend', color: 'text-accent', borderColor: 'border-accent/30', bgColor: 'bg-accent/10' },
    { id: 'devops', label: 'DevOps & OS', color: 'text-secondary', borderColor: 'border-secondary/30', bgColor: 'bg-secondary/10' },
] as const

export const SKILLS_BY_CAT: Record<string, { name: string; pct: number }[]> = {
    frontend: [
        { name: 'Next.js', pct: 90 }, { name: 'React', pct: 90 },
        { name: 'TypeScript', pct: 88 }, { name: 'JavaScript', pct: 92 },
        { name: 'Tailwind CSS', pct: 95 },
    ],
    backend: [
        { name: 'Node.js', pct: 90 }, { name: 'PostgreSQL', pct: 90 },
        { name: 'Drizzle ORM', pct: 87 }, { name: 'Prisma', pct: 78 },
        { name: 'Supabase', pct: 84 }, { name: 'Firebase', pct: 80 },
        { name: 'Redis', pct: 75 },
    ],
    devops: [
        { name: 'Linux', pct: 94 }, { name: 'Git', pct: 90 },
        { name: 'Docker', pct: 82 }, { name: 'Bash / Zsh', pct: 90 },
        { name: 'Vercel', pct: 86 }, { name: 'Cloudflare', pct: 82 },
    ],
}

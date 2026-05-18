export const TIMELINE = {
    work: [
        {
            year: 'Jan 2026 – May 2026',
            title: 'OJT — Bids and Awards Committee',
            desc: 'Internship developing internal systems and automating procurement workflows. Built full-stack applications with Next.js, PostgreSQL, and Drizzle ORM.',
            icon: '/icons/vercel.svg',
            tags: ['Next.js', 'PostgreSQL', 'Drizzle', 'Supabase'],
        },
    ],
    education: [
        {
            year: '2022 – 2026',
            title: 'BS Information Technology',
            desc: 'Bachelor of Science in Information Technology. Focused on full-stack development, UI/UX design, and systems architecture.',
            icon: '/icons/linux.svg',
            tags: ['University', 'BSIT'],
        },
    ],
} as const

export type TimelineEntry = {
    year: string
    title: string
    desc: string
    icon: string
    tags: string[]
}

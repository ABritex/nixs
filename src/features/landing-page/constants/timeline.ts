export const TIMELINE = {
    work: [
        {
            year: 'Jan 2026 – May 2026',
            title: 'OJT — Bids and Awards Committee',
            desc: 'Handled documentation, SVP preparation, and procurement paperwork for the committee.',
            icon: '/icons/vercel.svg',
            tags: ['SVP Papers', 'Documentation', 'Procurement'],
        },
    ],
    education: [
        {
            year: '2022 – 2026',
            title: 'BS Information Technology',
            desc: 'Occidental Mindoro State College. Focused on full-stack development, UI/UX design, and systems architecture.',
            icon: '/icons/linux.svg',
            tags: ['College', 'BSIT'],
        },
        {
            year: '2020 – 2022',
            title: 'Senior High School (STEM)',
            desc: 'Divine Word College of San Jose. Completed STEM strand with focus on science and mathematics.',
            icon: '/icons/linux.svg',
            tags: ['SHS', 'STEM'],
        },
        {
            year: '2016 – 2020',
            title: 'Junior High School',
            desc: 'Divine Word College of San Jose. Completed K-12 junior high curriculum.',
            icon: '/icons/linux.svg',
            tags: ['JHS'],
        },
        {
            year: '2010 – 2016',
            title: 'Elementary',
            desc: 'Grace Christian School. Completed primary education.',
            icon: '/icons/linux.svg',
            tags: ['Elementary'],
        },
    ],
} as const

export type TimelineEntry = {
    year: string
    title: string
    desc: string
    icon: string
    tags: readonly string[]
}

export type WorkRole = {
    title: string
    period: string
    bullets: readonly string[]
}

export type WorkEntry = {
    company: string
    icon: string
    roles: readonly WorkRole[]
}

export type EducationEntry = {
    school: string
    degree: string
    period: string
    icon: string
    achievements: readonly string[]
    button?: {
        label: string
        href: string
    }
}

export const TIMELINE = {
    work: [
        {
            company: 'Bids and Awards Committee',
            icon: '/images/bac.webp',
            roles: [
                {
                    title: 'Intern',
                    period: 'Jan 31, 2026 - May 4, 2026',
                    bullets: [
                        'Assisted in the preparation and processing of Small Value Procurement (SVP) documents.',
                        'Coordinated the routing and collection of required approvals and signatures from the Technical Working Group (TWG), department heads, and the Mayor\'s Office.',
                        'Organized, sorted, and maintained procurement and bidding documents to ensure accurate record-keeping and compliance.',
                        'Assisted in the segregation, filing, and compilation of bid folders and procurement records.',
                        'Supported BAC personnel in administrative and procurement-related tasks.',
                        'Monitored document completeness and facilitated the timely submission of procurement requirements.',
                        'Maintained organized physical and digital records of procurement transactions and supporting documents.',
                    ],
                },
            ],
        },
    ],
    education: [
        {
            school: 'Occidental Mindoro State College',
            degree: 'Bachelor of Science in Information Technology',
            period: '2022 - 2026',
            icon: '/images/omsc.webp',
            achievements: [
                '1st runner up On the spot coding (java)',
                '3rd best research paper on Southern Tagalog Islands Research and Development Consortium Regional',
            ],
            button: {
                label: 'Thesis Project',
                href: 'https://mindful-companion-gamma.vercel.app/',
            },
        },
    ],
} as const

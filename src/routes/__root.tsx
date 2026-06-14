import { HeadContent, Scripts, createRootRoute, useRouterState, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import appCss from '../styles.css?url'
import { Providers } from '#/components/providers'
import { cn } from '#/lib/utils'
import Footer from '#/components/footer'
import Header from '#/components/header'
import { SmoothScroll } from '#/components/smooth-scroll'
import { ScrollReveal } from '#/components/scroll-reveal'
import ShapeGrid from '#/components/shape-grid'
import { LazyTargetCursor } from '#/components/lazy-cursor'
import { ErrorBoundary } from '#/components/error-boundary'
import { RouteLoader } from '#/components/route-loader'

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'robots', content: 'index, follow' },
            { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff' },
            { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#0f0f0f' },
            { name: 'color-scheme', content: 'light dark' },
            {
                title: 'Nicholas Abeleda — Full-Stack Developer & Designer',
            },
            {
                name: 'title',
                content: 'Nicholas Abeleda — Full-Stack Developer & Designer',
            },
            {
                name: 'description',
                content: 'Full-stack developer specializing in Next.js, React, Node.js, and PostgreSQL. Building clean, performant web applications with modern tooling. Based in the Philippines.',
            },
            {
                name: 'keywords',
                content: 'full-stack developer, web developer, next.js, react, node.js, typescript, portfolio, philippines, UI/UX design',
            },
            {
                name: 'author',
                content: 'Nicholas Abeleda',
            },
            {
                property: 'og:title',
                content: 'Nicholas Abeleda — Full-Stack Developer & Designer',
            },
            {
                property: 'og:description',
                content: 'Full-stack developer specializing in Next.js, React, Node.js, and PostgreSQL. Building clean, performant web applications.',
            },
            {
                property: 'og:url',
                content: 'https://nixs-portfolio.vercel.app/',
            },
            {
                property: 'og:site_name',
                content: 'Nicholas Abeleda',
            },
            {
                property: 'og:image',
                content: '/images/bg.jpg',
            },
            {
                property: 'og:image:type',
                content: 'image/jpeg',
            },
            {
                property: 'og:image:width',
                content: '1920',
            },
            {
                property: 'og:image:height',
                content: '1080',
            },
            {
                property: 'og:image:alt',
                content: 'Nicholas Abeleda portfolio preview',
            },
            {
                property: 'og:locale',
                content: 'en_US',
            },
            {
                property: 'og:type',
                content: 'website',
            },
            {
                name: 'twitter:card',
                content: 'summary_large_image',
            },
            {
                name: 'twitter:site',
                content: '@ABr1tex',
            },
            {
                name: 'twitter:creator',
                content: '@ABr1tex',
            },
            {
                name: 'twitter:title',
                content: 'Nicholas Abeleda — Full-Stack Developer & Designer',
            },
            {
                name: 'twitter:description',
                content: 'Full-stack developer specializing in Next.js, React, Node.js, and PostgreSQL.',
            },
            {
                name: 'twitter:image',
                content: '/images/bg.jpg',
            },
        ],
        links: [
            { rel: 'canonical', href: 'https://nixs-portfolio.vercel.app/' },
            { rel: 'icon', type: 'image/png', href: '/logo192.png' },
            { rel: 'apple-touch-icon', href: '/logo192.png' },
            { rel: 'stylesheet', href: appCss },
            { rel: 'preload', href: '/fonts/GeistSans.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
            { rel: 'preload', href: '/fonts/JetBrainsMono.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
        ],
        scripts: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Person',
                    name: 'Nicholas Abeleda',
                    url: 'https://nixs-portfolio.vercel.app/',
                    jobTitle: 'Full-Stack Developer & Designer',
                    email: 'nicos.abeleda@gmail.com',
                    sameAs: [
                        'https://github.com/ABritex',
                        'https://www.youtube.com/@ABr1tex',
                        'https://x.com/ABr1tex',
                    ],
                    knowsAbout: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
                }),
            },
        ],
    }),
    shellComponent: RootDocument,
})

function FloatingThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])
    if (!mounted) return <div className="fixed bottom-4 left-4 z-50 h-10 w-10" />
    const isDark = resolvedTheme === 'dark'
    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="cursor-target fixed bottom-4 left-4 z-50 flex items-center justify-center h-10 w-10 rounded-xl border border-border/40 bg-card/80 backdrop-blur-md text-muted-foreground hover:text-foreground transition-colors shadow-sm"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    )
}

function RootDocument({ children }: { children: React.ReactNode }) {
    const isLoading = useRouterState({ select: (s) => s.isLoading });
    const { pathname } = useLocation();
    const isHeroDemo = pathname === '/hero-demo';

    return (
        <html lang="en" className={cn("h-full", "antialiased")} suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body>
                <RouteLoader isLoading={isLoading} />
                <LazyTargetCursor />
                <SmoothScroll />
                <ScrollReveal />
                <Providers>
                {!isHeroDemo && <div className="fixed inset-0 z-0">
                    <ShapeGrid speed={0.3} squareSize={40} shape="square" direction="diagonal" hoverTrailAmount={5} />
                </div>}
                    {isHeroDemo ? (
                        <main className="min-h-screen">
                            {children}
                        </main>
                    ) : (
                        <>
                            <Header />
                            <main className="pt-16">
                                <ErrorBoundary>
                                    {children}
                                </ErrorBoundary>
                            </main>
                            <Footer />
                        </>
                    )}
                    <Scripts />
                    <FloatingThemeToggle />
                </Providers>
            </body>
        </html>
    )
}

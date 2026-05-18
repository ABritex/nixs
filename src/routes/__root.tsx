import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { Providers } from '#/components/providers'
import { cn } from '#/lib/utils'
import Footer from '#/components/footer'
import Header from '#/components/header'
import { SmoothScroll } from '#/components/smooth-scroll'
import { ScrollReveal } from '#/components/scroll-reveal'
import ShapeGrid from '#/components/shape-grid'
import TargetCursor from '#/components/ui/target-cursor'

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'Nicholas Abeleda | PORTFOLIO',
            },
            {
                name: 'description',
                content: 'Portfolio of Nicholas Abeleda',
            },
            {
                property: 'og:title',
                content: 'Nicholas Abeleda PORTFOLIO',
            },
            {
                property: 'og:description',
                content: 'Portfolio of Nicholas Abeleda',
            },
            {
                property: 'og:url',
                content: 'https://nixs-portfolio.vercel.app/',
            },
            {
                property: 'og:site_name',
                content: 'Nicholas Abeleda Portfolio',
            },
            {
                property: 'og:image',
                content: '/images/background.png',
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
                content: 'Nicholas Abeleda Portfolio',
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
                name: 'twitter:title',
                content: 'Nicholas Abeleda | PORTFOLIO',
            },
            {
                name: 'twitter:description',
                content: 'Portfolio of Nicholas Abeleda',
            },
            {
                name: 'twitter:image',
                content: '/images/bg.png',
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),
    shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={cn("h-full", "antialiased")} suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body>
                <TargetCursor
                    spinDuration={2}
                    hideDefaultCursor
                    parallaxOn
                    hoverDuration={0.2}
                />
                <div className="fixed inset-0 z-0">
                    <ShapeGrid speed={0.3} squareSize={40} borderColor="rgba(255,255,255,0.03)" shape="square" direction="diagonal" hoverTrailAmount={5} hoverFillColor="rgba(255,255,255,0.03)" />
                </div>
                <SmoothScroll />
                <ScrollReveal />
                <Providers>
                    <Header />
                    <main className="pt-16">
                        {children}
                    </main>
                    <Footer />
                    <Scripts />
                </Providers>
            </body>
        </html>
    )
}

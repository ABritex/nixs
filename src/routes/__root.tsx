import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import appCss from '../styles.css?url'
import { Providers } from '#/components/providers'
import { cn } from '#/lib/utils'
import Footer from '#/components/footer'
import Header from '@/components/header'
import { AOSInit } from '@/components/AosInit';
import TargetCursor from '@/components/ui/target-cursor';
import { SmoothScroll } from '#/components/smooth-scroll';
import { ScrollReveal } from '#/components/scroll-reveal';

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
                title: 'Nicholas Abeleda | OJT PORTFOLIO',
            },
            {
                name: 'description',
                content: 'Portfolio of Nicholas Abeleda',
            },
            {
                property: 'og:title',
                content: 'Nicholas Abeleda | OJT PORTFOLIO',
            },
            {
                property: 'og:description',
                content: 'Portfolio of Nicholas Abeleda',
            },
            {
                property: 'og:url',
                content: 'https://e-portfolio-nics.vercel.app',
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
                content: 'Nicholas Abeleda OJT Portfolio',
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
                content: 'Nicholas Abeleda | OJT PORTFOLIO',
            },
            {
                name: 'twitter:description',
                content: 'Portfolio of Nicholas Abeleda',
            },
            {
                name: 'twitter:image',
                content: '/images/background.png',
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
                <Providers>
                    <SmoothScroll />
                    <ScrollReveal />
                    <Header />
                    <main className="pt-16">
                      {children}
                    </main>
                    <Footer />
                    <AOSInit />

                    <TanStackDevtools
                        config={{
                            position: 'bottom-right',
                        }}
                        plugins={[
                            {
                                name: 'Tanstack Router',
                                render: <TanStackRouterDevtoolsPanel />,
                            },
                        ]}
                    />
                    <Scripts />
                </Providers>
            </body>
        </html>
    )
}

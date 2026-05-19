import { useEffect, useRef } from 'react';

export function ScrollReveal() {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observerRef.current?.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const observeElements = () => {
            const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
            elements.forEach((el) => observerRef.current?.observe(el));
        };

        observeElements();

        const mutationObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length) {
                    observeElements();
                }
            }
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            observerRef.current?.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    return null;
}

import { useEffect, useRef, useCallback } from 'react';

export function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);

    const observe = useCallback(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('revealed');
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const cleanup = observe();
        return cleanup;
    }, [observe]);

    return ref;
}

import { useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';

export function SmoothScroll() {
    const location = useLocation();

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as Element;
            const anchor = target.closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            e.preventDefault();
            const id = href.slice(1);
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.pushState(null, '', href);
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.slice(1));
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [location.pathname, location.hash]);

    return null;
}

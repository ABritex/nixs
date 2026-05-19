import { useEffect, useState, lazy, Suspense } from 'react';

const TargetCursor = lazy(() => import('#/components/ui/target-cursor'));

export function LazyTargetCursor() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!hasTouch && !prefersReducedMotion) {
            setIsDesktop(true);
        }
    }, []);

    if (!isDesktop) return null;

    return (
        <Suspense fallback={null}>
            <TargetCursor
                spinDuration={2}
                hideDefaultCursor
                parallaxOn
                hoverDuration={0.2}
            />
        </Suspense>
    );
}

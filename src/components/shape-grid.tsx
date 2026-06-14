import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { GridDrawer } from '#/lib/grid-drawer';
import type { GridConfig } from '#/lib/grid-drawer';

interface ShapeGridProps {
    direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
    speed?: number;
    squareSize?: number;
    shape?: 'square' | 'hexagon' | 'circle' | 'triangle';
    hoverTrailAmount?: number;
}

const ShapeGrid: React.FC<ShapeGridProps> = ({
    direction = 'right',
    speed = 1,
    squareSize = 40,
    shape = 'square',
    hoverTrailAmount = 0,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawerRef = useRef<GridDrawer | null>(null);
    const frameRef = useRef<number | null>(null);
    const isVisibleRef = useRef(true);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const isDark = mounted ? resolvedTheme === 'dark' : true;

    useEffect(() => {
        setMounted(true);
    }, []);

    const borderColor = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)';
    const hoverFillColor = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.06)';
    const vignetteColor = isDark ? '#120F17' : 'rgba(255,255,255,0.9)';

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const config: GridConfig = {
            direction,
            speed,
            borderColor,
            squareSize,
            hoverFillColor,
            shape,
            hoverTrailAmount,
            vignetteColor,
        };

        const drawer = new GridDrawer(ctx, config);
        drawerRef.current = drawer;

        drawer.resize(canvas);

        const handleResize = () => drawer.resize(canvas);
        window.addEventListener('resize', handleResize);

        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisibleRef.current) return;
            const rect = canvas.getBoundingClientRect();
            drawer.trackHover(e.clientX - rect.left, e.clientY - rect.top);
        };

        const handleMouseLeave = () => drawer.clearHover();

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        const loop = () => {
            if (isVisibleRef.current) {
                drawer.tick(canvas);
            }
            frameRef.current = requestAnimationFrame(loop);
        };
        frameRef.current = requestAnimationFrame(loop);

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        observer.observe(canvas);

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            observer.disconnect();
        };
    }, [direction, speed, borderColor, hoverFillColor, vignetteColor, squareSize, shape, hoverTrailAmount]);

    return <canvas ref={canvasRef} className="w-full h-full border-none block" />;
};

export default ShapeGrid;

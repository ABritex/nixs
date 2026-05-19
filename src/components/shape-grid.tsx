import React, { useRef, useEffect } from 'react';
import { GridDrawer } from '#/lib/grid-drawer';
import type { GridConfig } from '#/lib/grid-drawer';

interface ShapeGridProps {
    direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
    speed?: number;
    borderColor?: string;
    squareSize?: number;
    hoverFillColor?: string;
    shape?: 'square' | 'hexagon' | 'circle' | 'triangle';
    hoverTrailAmount?: number;
}

const ShapeGrid: React.FC<ShapeGridProps> = ({
    direction = 'right',
    speed = 1,
    borderColor = '#999',
    squareSize = 40,
    hoverFillColor = '#222',
    shape = 'square',
    hoverTrailAmount = 0,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawerRef = useRef<GridDrawer | null>(null);
    const frameRef = useRef<number | null>(null);
    const isVisibleRef = useRef(true);

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
    }, [direction, speed, borderColor, hoverFillColor, squareSize, shape, hoverTrailAmount]);

    return <canvas ref={canvasRef} className="w-full h-full border-none block" />;
};

export default ShapeGrid;

"use client";
import { cn } from "#/lib/utils.ts";
import React, { useRef, useState, useEffect } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    animate,
    useVelocity,
    useAnimationControls,
} from "framer-motion";

interface DraggableCardBodyProps {
    className?: string;
    children?: React.ReactNode;
    dragConstraintsRef?: React.RefObject<Element | null>;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export const DraggableCardBody = ({
    className,
    children,
    dragConstraintsRef,
    style: externalStyle,
    onClick,
}: DraggableCardBodyProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const controls = useAnimationControls();
    const [constraints, setConstraints] = useState({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    });

    // physics biatch
    const velocityX = useVelocity(mouseX);
    const velocityY = useVelocity(mouseY);

    const springConfig = {
        stiffness: 100,
        damping: 20,
        mass: 0.5,
    };

    const rotateX = useSpring(
        useTransform(mouseY, [-300, 300], [25, -25]),
        springConfig,
    );
    const rotateY = useSpring(
        useTransform(mouseX, [-300, 300], [-25, 25]),
        springConfig,
    );

    const opacity = useSpring(
        useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]),
        springConfig,
    );

    const glareOpacity = useSpring(
        useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
        springConfig,
    );

    useEffect(() => {
        if (dragConstraintsRef) return;

        const updateConstraints = () => {
            if (typeof window !== "undefined") {
                setConstraints({
                    top: -window.innerHeight,
                    left: -window.innerWidth,
                    right: window.innerWidth,
                    bottom: window.innerHeight,
                });
            }
        };

        updateConstraints();
        window.addEventListener("resize", updateConstraints);
        return () => window.removeEventListener("resize", updateConstraints);
    }, [dragConstraintsRef]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } =
            cardRef.current?.getBoundingClientRect() ?? {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            };
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        mouseX.set(deltaX);
        mouseY.set(deltaY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            drag
            dragConstraints={dragConstraintsRef || constraints}
            dragElastic={0.2}
            onDragStart={() => {
                document.body.style.cursor = "grabbing";
            }}
            onDragEnd={(_, info) => {
                document.body.style.cursor = "default";

                controls.start({
                    rotateX: 0,
                    rotateY: 0,
                    transition: {
                        type: "spring",
                        ...springConfig,
                    },
                });
                const currentVelocityX = velocityX.get();
                const currentVelocityY = velocityY.get();

                const velocityMagnitude = Math.sqrt(
                    currentVelocityX * currentVelocityX +
                    currentVelocityY * currentVelocityY,
                );
                const bounce = Math.min(0.8, velocityMagnitude / 1000);

                animate(info.point.x, info.point.x + currentVelocityX * 0.3, {
                    duration: 0.8,
                    ease: [0.2, 0, 0, 1],
                    bounce,
                    type: "spring",
                    stiffness: 50,
                    damping: 15,
                    mass: 0.8,
                });

                animate(info.point.y, info.point.y + currentVelocityY * 0.3, {
                    duration: 0.8,
                    ease: [0.2, 0, 0, 1],
                    bounce,
                    type: "spring",
                    stiffness: 50,
                    damping: 15,
                    mass: 0.8,
                });
            }}
            style={{
                rotateX,
                rotateY,
                opacity,
                willChange: "transform",
                ...externalStyle,
            }}
            animate={controls}
            whileHover={{ scale: 1.02 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={cn(
                "relative overflow-hidden rounded-md bg-neutral-100 shadow-2xl transform-3d dark:bg-neutral-900",
                className,
            )}
        >
            {children}
            <motion.div
                style={{
                    opacity: glareOpacity,
                }}
                className="pointer-events-none absolute inset-0 bg-white select-none"
            />
        </motion.div>
    );
};

export const DraggableCardContainer = React.forwardRef<
    HTMLDivElement,
    {
        className?: string;
        children?: React.ReactNode;
    }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("[perspective:3000px]", className)}
        >
            {children}
        </div>
    );
});
DraggableCardContainer.displayName = "DraggableCardContainer";

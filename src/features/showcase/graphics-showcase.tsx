import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "#/components/ui/masonry";
import { GRAPHICS_DESIGNS } from "./constants";

interface GraphicsItem {
    id: string;
    type: "image" | "video";
    src: string;
    title: string;
    description: string;
    height: number;
    children?: readonly GraphicsItem[];
}

interface LightboxState {
    isOpen: boolean;
    items: GraphicsItem[];
    currentIndex: number;
}

export function GraphicsShowcase() {
    const [lightbox, setLightbox] = useState<LightboxState>({
        isOpen: false,
        items: [],
        currentIndex: 0,
    });

    const openLightbox = (item: GraphicsItem) => {
        const items = item.children ? [item, ...item.children] : [item];
        setLightbox({ isOpen: true, items, currentIndex: 0 });
    };

    const closeLightbox = useCallback(() => {
        setLightbox((prev) => ({ ...prev, isOpen: false }));
    }, []);

    const navigateLightbox = useCallback((direction: "prev" | "next") => {
        setLightbox((prev) => {
            const newIndex =
                direction === "next"
                    ? (prev.currentIndex + 1) % prev.items.length
                    : (prev.currentIndex - 1 + prev.items.length) % prev.items.length;
            return { ...prev, currentIndex: newIndex };
        });
    }, []);

    useEffect(() => {
        if (!lightbox.isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    closeLightbox();
                    break;
                case "ArrowRight":
                    navigateLightbox("next");
                    break;
                case "ArrowLeft":
                    navigateLightbox("prev");
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightbox.isOpen, closeLightbox, navigateLightbox]);

    const masonryItems = GRAPHICS_DESIGNS.map((item) => ({
        id: item.id,
        img: item.src,
        url: "#",
        height: item.height,
    }));

    return (
        <section id="graphics" className="relative min-h-screen flex items-start justify-center px-6 py-24 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 50% 30%, hsl(var(--accent)) 0%, transparent 50%), radial-gradient(circle at 50% 70%, hsl(var(--primary)) 0%, transparent 50%)',
                }}
            />

            <div className="relative z-10 w-full max-w-6xl mx-auto space-y-10">
                <div className="text-center space-y-3">
                    <p className="scroll-reveal text-xs tracking-[0.25em] text-muted-foreground/30 uppercase font-mono">
                        <span className="text-accent">$</span> graphics
                    </p>
                    <h2 className="scroll-reveal text-[clamp(28px,5vw,56px)] font-black leading-[1.05] tracking-tight text-foreground" data-delay="100">
                        Design Work
                    </h2>
                    <p className="scroll-reveal text-sm text-muted-foreground/70 leading-relaxed max-w-lg mx-auto font-mono" data-delay="200">
                        Public showcase only. Some work is private (school projects, game communities, etc.).
                    </p>
                </div>

                <div className="scroll-reveal flex items-center justify-center gap-2" data-delay="250">
                    <span className="font-mono text-[11px] text-muted-foreground/50 bg-muted/30 border border-border/40 rounded px-2 py-0.5">
                        ~/graphics $ ls -la
                    </span>
                </div>

                <div className="relative w-full" style={{ minHeight: 600 }}>
                    <Masonry
                        items={masonryItems}
                        ease="power3.out"
                        duration={0.6}
                        stagger={0.05}
                        animateFrom="bottom"
                        scaleOnHover
                        hoverScale={0.97}
                        blurToFocus
                        colorShiftOnHover={false}
                        renderItem={(_item, index) => {
                            const designItem = GRAPHICS_DESIGNS[index];
                            return (
                                <div className="cursor-target relative w-full h-full rounded-[10px] overflow-hidden shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] cursor-pointer group" onClick={() => openLightbox(designItem)} >
                                    {designItem.type === "video" ? (
                                        <video src={designItem.src} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                                    ) : (
                                        <img src={designItem.src} alt={designItem.title} className="w-full h-full object-cover" decoding="async" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <p className="text-sm font-semibold text-white">{designItem.title}</p>
                                            <p className="text-xs text-white/70 font-mono mt-1">{designItem.description}</p>
                                            {"children" in designItem && (
                                                <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-white/20 text-white/90">
                                                    {designItem.children.length + 1} parts
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>

            <AnimatePresence>
                {lightbox.isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="cursor-target absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-mono z-10 p-2"
                            onClick={closeLightbox}
                        >
                            ✕
                        </motion.button>

                        {lightbox.items.length > 1 && (
                            <>
                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="cursor-target absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl font-mono z-10 p-2"
                                    onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
                                >
                                    ‹
                                </motion.button>
                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="cursor-target absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl font-mono z-10 p-2"
                                    onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
                                >
                                    ›
                                </motion.button>
                            </>
                        )}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="max-w-5xl max-h-[90vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={lightbox.items[lightbox.currentIndex].id}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {lightbox.items[lightbox.currentIndex].type === "video" ? (
                                        <video src={lightbox.items[lightbox.currentIndex].src} className="max-w-full max-h-[85vh] mx-auto rounded-lg" controls autoPlay />
                                    ) : (
                                        <img src={lightbox.items[lightbox.currentIndex].src} alt={lightbox.items[lightbox.currentIndex].title} className="max-w-full max-h-[85vh] mx-auto rounded-lg object-contain" decoding="async" />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                            <div className="text-center mt-4">
                                <p className="text-white font-semibold">{lightbox.items[lightbox.currentIndex].title}</p>
                                <p className="text-white/60 text-sm font-mono mt-1">{lightbox.items[lightbox.currentIndex].description}</p>
                                {lightbox.items.length > 1 && (
                                    <p className="text-white/40 text-xs font-mono mt-2">
                                        {lightbox.currentIndex + 1} / {lightbox.items.length}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

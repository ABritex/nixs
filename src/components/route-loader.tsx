import { motion, AnimatePresence } from 'framer-motion';

export function RouteLoader({ isLoading }: { isLoading: boolean }) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-0 left-0 right-0 h-0.5 z-[100] bg-primary/20"
                >
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: '0%', marginLeft: '0%' }}
                        animate={{ width: '60%', marginLeft: '0%' }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

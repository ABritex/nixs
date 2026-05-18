import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function generateStars(count: number, color: string) {
    const shadows: string[] = []
    for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 4000) - 2000
        const y = Math.floor(Math.random() * 4000) - 2000
        shadows.push(`${x}px ${y}px ${color}`)
    }
    return shadows.join(', ')
}

export default function StarLayer({ count, color, speed }: { count: number; color: string; speed: number }) {
    const [shadow, setShadow] = useState('')
    useEffect(() => { setShadow(generateStars(count, color)) }, [count, color])
    if (!shadow) return null
    return (
        <motion.div
            className="absolute top-0 left-0 w-full h-[2000px] pointer-events-none"
            animate={{ y: [0, -2000] }}
            transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
        >
            <div className="absolute bg-transparent rounded-full" style={{ width: 1, height: 1, boxShadow: shadow }} />
            <div className="absolute bg-transparent rounded-full top-[2000px]" style={{ width: 1, height: 1, boxShadow: shadow }} />
        </motion.div>
    )
}

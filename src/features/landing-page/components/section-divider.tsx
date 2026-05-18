import CurvedLoop from '@/components/ui/curve-loop'

export default function SectionDivider({ text = 'nicholas abeleda • fullstack developer • builder' }: { text?: string }) {
    return (
        <div className="w-full overflow-hidden bg-background py-8">
            <CurvedLoop
                marqueeText={text}
                speed={1.5}
                curveAmount={300}
                direction="left"
                interactive={false}
                className="fill-white/10"
            />
        </div>
    )
}

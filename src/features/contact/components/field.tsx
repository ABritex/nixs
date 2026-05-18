interface FieldProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    required?: boolean;
    onChange: (v: string) => void;
}

export default function Field({ label, type, placeholder, value, required, onChange }: FieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[.2em] uppercase text-muted-foreground/40">
                <span className="text-primary">▸</span> {label}
            </label>
            <input type={type} placeholder={placeholder} value={value} required={required}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-[13px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all duration-150"
            />
        </div>
    );
}

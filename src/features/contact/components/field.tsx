interface FieldProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    required?: boolean;
    error?: string;
    onChange: (v: string) => void;
}

export default function Field({ label, type, placeholder, value, required, error, onChange }: FieldProps) {
    return (
        <div className="flex flex-col gap-1.5 ">
            <label className="text-xs tracking-[.2em] uppercase text-muted-foreground/40">
                <span className="text-primary">▸</span> {label}
            </label>
            <input type={type} placeholder={placeholder} value={value} required={required}
                onChange={(e) => onChange(e.target.value)}
                className={`cursor-target w-full rounded-xl border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 outline-none transition-all duration-150 ${error
                    ? "border-destructive/60 focus:ring-2 focus:ring-destructive/30 focus:border-destructive/60"
                    : "border-border/40 focus:ring-2 focus:ring-primary/30 focus:border-primary/60"
                    }`}
            />
            {error && (
                <p className="text-xs text-destructive">{error}</p>
            )}
        </div>
    );
}

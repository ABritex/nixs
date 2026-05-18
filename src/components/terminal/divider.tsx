"use client";

import { cn } from "@/lib/utils";
import { Edit3 } from "lucide-react";

type DividerProps = {
    icon?: React.ReactNode;
    className?: string;
    iconClassName?: string;
    children?: React.ReactNode;
};

const DefaultIcon = () => <Edit3 size={14} />;

export function Divider({
    icon,
    className,
    iconClassName = "text-accent",
    children,
}: DividerProps) {
    return (
        <div className={cn("relative flex items-center w-full my-8", className)}>
            <div className="flex-1 border-t border-border/40" />
            <div className="mx-4 w-9 h-9 rounded-full border border-border/60 bg-card flex items-center justify-center shrink-0">
                <div className={cn("opacity-70", iconClassName)}>
                    {children || icon || <DefaultIcon />}
                </div>
            </div>
            <div className="flex-1 border-t border-border/40" />
        </div>
    );
}
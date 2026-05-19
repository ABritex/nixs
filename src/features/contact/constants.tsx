import { Mail, MapPin, Clock, Terminal } from "lucide-react";
import { PERSON } from "#/constants/personal";

export const CONTACT_COOLDOWN_MS = 30 * 1000;
export const CONTACT_COOLDOWN_STORAGE_KEY = "nixs_contact_cooldown";

export const CONTACT_LINKS = [
    {
        label: "Email",
        value: "nicholasabeleda.bsit@gmail.com",
        href: "mailto:nicholasabeleda.bsit@gmail.com",
        icon: <Mail size={15} />,
        color: "primary" as const,
        command: "mailto",
    },
    {
        label: "GitHub",
        value: "github.com/ABritex",
        href: "https://github.com/ABritex",
        icon: "/icons/github.svg",
        color: "accent" as const,
        command: "open github",
        iconClassName: "invert",
    },
    {
        label: "YouTube",
        icon: "/icons/youtube.svg",
        href: "https://www.youtube.com/@ABr1tex",
        iconClassName: "invert",
    },
    {
        label: "Facebook",
        icon: "/icons/facebook.svg",
        href: "https://www.facebook.com/abeleda123/",
        iconClassName: "invert",
    },
    {
        label: "X (Twitter)",
        icon: "/icons/x.svg",
        href: "https://x.com/ABr1tex",
        iconClassName: "invert",
    },
];

export const SUPPORT_LINKS = [
    {
        label: "Ko-fi",
        href: "https://ko-fi.com/abr1tex",
        icon: "/icons/ko-fi.svg",
    },
    {
        label: "Buy Me a Coffee",
        href: "https://buymeacoffee.com/abritex",
        icon: "/icons/buy-me-a-coffee.svg",
    },
];

export const META = [
    { label: "Location", value: PERSON.location, icon: <MapPin size={12} />, color: "text-primary" },
    { label: "Response Time", value: "Within 24–48 hrs", icon: <Clock size={12} />, color: "text-accent" },
    { label: "Status", value: "Open to opportunities", icon: <Terminal size={12} />, color: "text-secondary" },
];

export const COLOR = {
    primary: {
        text: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/25",
        hoverBorder: "hover:border-primary/50",
    },
    accent: {
        text: "text-accent",
        bg: "bg-accent/10",
        border: "border-accent/25",
        hoverBorder: "hover:border-accent/50",
    },
    secondary: {
        text: "text-secondary",
        bg: "bg-secondary/10",
        border: "border-secondary/25",
        hoverBorder: "hover:border-secondary/50",
    },
} as const;

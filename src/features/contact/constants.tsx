import { Mail, MapPin, Clock, Terminal } from "lucide-react";
import { PERSON } from "@/constants/personal";

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
];

export const META = [
    { label: "Location", value: PERSON.location ?? "Philippines", icon: <MapPin size={12} />, color: "text-primary" },
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

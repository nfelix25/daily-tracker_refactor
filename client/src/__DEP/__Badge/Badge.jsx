// [first-step: Tailwind] This component is styled with Tailwind utility classes.
// The original would have a Badge.css file. Coexists with global.css via tailwind.css import.

const variants = {
    default: "bg-gray-100 text-gray-700",
    habit: "bg-blue-100 text-blue-700",
    chore: "bg-amber-100 text-amber-700",
    daily: "bg-green-100 text-green-700",
    weekly: "bg-purple-100 text-purple-700",
};

export function Badge({ children, variant = "default" }) {
    const cls = variants[variant] ?? variants.default;
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cls}`}
        >
            {children}
        </span>
    );
}

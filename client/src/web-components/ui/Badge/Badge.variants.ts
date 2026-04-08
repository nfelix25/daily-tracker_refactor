import { cva, type VariantProps } from "class-variance-authority";

import { cx } from "../../../lib/cx";

const badge = cva(
    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
    {
        variants: {
            variant: {
                default: "bg-gray-100 text-gray-700",
                habit: "bg-blue-100 text-blue-700",
                chore: "bg-amber-100 text-amber-700",
                daily: "bg-green-100 text-green-700",
                weekly: "bg-purple-100 text-purple-700",
            },
        },
        defaultVariants: { variant: "default" },
    },
);

export type BadgeVariant = NonNullable<VariantProps<typeof badge>["variant"]>;

export function getBadgeClass(variant: BadgeVariant) {
    return cx(badge({ variant }));
}

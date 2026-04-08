import { cva, type VariantProps } from "class-variance-authority";

import { cx } from "../../../lib/cx";

const button = cva(
    "inline-flex items-center content-center py-2 px-4 border-none rounded-lg text-sm font-medium cursor-pointer transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-white hover:not-disabled:bg-primary-hover",
                ghost: "bg-transparent text-text-muted hover:not-disabled:bg-primary-hover",
                danger: "bg-transparent text-danger hover:not-disabled:myvory",
            },
        },
        defaultVariants: { variant: "primary" },
    },
);

export type ButtonVariant = NonNullable<VariantProps<typeof button>["variant"]>;

export function getButtonClass(variant: ButtonVariant) {
    return cx(button({ variant }));
}

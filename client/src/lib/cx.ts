import { twMerge } from "tailwind-merge";

// cx helper — composes cva output with any extra classes, merging conflicts
export const cx = (...args: Parameters<typeof twMerge>) => twMerge(...args);

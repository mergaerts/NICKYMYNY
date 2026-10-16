// ponytail: tiny className helper replacing shadcn Button + cva/clsx/tailwind-merge.
// No variant-merging edge cases needed here — every call site passes a fixed
// variant/size pair, so plain string concatenation is enough.
const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[color,background-color,border-color,transform,box-shadow,opacity] duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const variants = {
  default:
    "border border-primary bg-primary text-primary-foreground shadow-sm hover:-translate-y-px hover:bg-primary-strong hover:shadow-md",
  outline:
    "border border-input bg-background shadow-sm hover:border-foreground/25 hover:bg-accent hover:text-accent-foreground",
  hero: "border border-primary bg-primary text-primary-foreground shadow-sm hover:-translate-y-px hover:border-primary-strong hover:bg-primary-strong hover:shadow-md",
  panelPrimary:
    "border border-primary bg-primary text-primary-foreground shadow-sm hover:-translate-y-px hover:border-primary-strong hover:bg-primary-strong hover:shadow-md",
  panelOutline:
    "border border-panel-border bg-transparent text-panel-foreground hover:border-panel-foreground/40 hover:bg-panel-subtle",
} as const;

const sizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-sm px-3 text-xs",
  lg: "h-11 rounded-sm px-8 text-[0.78rem] uppercase tracking-[0.2em]",
} as const;

export function btn(
  variant: keyof typeof variants = "default",
  size: keyof typeof sizes = "default",
  extra = "",
) {
  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(" ");
}

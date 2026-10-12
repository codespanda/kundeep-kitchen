import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Small gold flourish used under headings and on cards. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="96"
      height="14"
      viewBox="0 0 96 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      <path d="M0 7h36M60 7h36" />
      <path d="M48 2c-4 0-6 5-10 5 4 0 6 5 10 5 4 0 6-5 10-5-4 0-6-5-10-5z" />
      <circle cx="48" cy="7" r="1.5" />
    </svg>
  );
}

/** Uppercase eyebrow label flanked by gold rules, e.g. "OUR SPECIALTIES". */
export function SectionLabel({
  children,
  tone = "forest",
  align = "center",
}: {
  children: ReactNode;
  tone?: "forest" | "clay";
  align?: "center" | "start";
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[13px] font-medium tracking-[0.1em] uppercase ${
        tone === "clay" ? "text-clay" : "text-forest"
      } ${align === "center" ? "justify-center" : ""}`}
    >
      <span className="h-px w-7 bg-gold" aria-hidden="true" />
      {children}
      <span className="h-px w-7 bg-gold" aria-hidden="true" />
    </p>
  );
}

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: "solid" | "outline" | "light" | "outline-light";
};

const buttonStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  solid: "bg-forest text-white hover:bg-forest-dark",
  outline: "border-[1.5px] border-forest text-forest hover:bg-forest hover:text-white",
  light: "bg-cream text-forest hover:bg-white",
  "outline-light": "border-[1.5px] border-parchment text-white hover:bg-white/10",
};

export type ButtonVariant = NonNullable<ButtonProps["variant"]>;

/** Shared class list so links and real <button>s look identical. */
export function buttonClassName(variant: ButtonVariant = "solid", className = "") {
  return `inline-flex min-h-11 cursor-pointer items-center justify-center gap-2.5 rounded-md px-7 py-3.5 text-sm font-medium transition-colors ${buttonStyles[variant]} ${className}`;
}

export function Button({ variant = "solid", className = "", ...props }: ButtonProps) {
  return <Link className={buttonClassName(variant, className)} {...props} />;
}

/** The circular "K" emblem from the brand logo. */
export function Emblem({ size = 68, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 68 68"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <circle cx="34" cy="34" r="20" />
      <circle cx="34" cy="34" r="24" strokeDasharray="2 3" />
      <path d="M34 4l5 8h-10zM34 64l5-8h-10zM4 34l8 5v-10zM64 34l-8 5v-10zM13 13l9 3-6 6zM55 55l-9-3 6-6zM55 13l-3 9-6-6zM13 55l3-9 6 6z" />
      <text
        x="34"
        y="41"
        textAnchor="middle"
        fontFamily="var(--font-dm-serif), serif"
        fontSize="20"
        fill="currentColor"
        stroke="none"
      >
        K
      </text>
    </svg>
  );
}

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const onDark = variant === "dark";
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5 sm:gap-3" aria-label="Kundeep Kitchen home">
      <Emblem
        size={onDark ? 54 : 68}
        className={`text-gold ${onDark ? "" : "size-[50px] sm:size-[68px]"}`}
      />
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span
          className={`font-serif ${
            onDark ? "text-[32px] text-parchment" : "text-[30px] text-forest sm:text-[40px]"
          }`}
        >
          Kundeep
        </span>
        <span
          className={`mt-1 tracking-[0.32em] ${
            onDark ? "text-[13px] text-gold-light" : "text-[13px] text-clay sm:text-[17px]"
          }`}
        >
          {onDark ? "KITCHEN" : "— KITCHEN —"}
        </span>
        <span
          className={`mt-1.5 tracking-[0.14em] ${
            onDark ? "text-[10px] text-[#dcd6c6]" : "text-[10px] text-forest sm:text-[11px]"
          }`}
        >
          • PURE VEG, PURE LOVE •
        </span>
      </span>
    </Link>
  );
}

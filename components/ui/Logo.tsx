import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  showText?: boolean;
}

const sizes = {
  sm: { icon: 34, text: "text-sm" },
  md: { icon: 44, text: "text-lg" },
  lg: { icon: 72, text: "text-2xl" },
};

/**
 * Placeholder brand mark rebuilt from the official VedaEdutech reference
 * (open book + two children silhouettes, orange/purple/pink/green palette).
 * Swap the <LogoMark> internals for the real logo file the moment it is
 * supplied as a proper image asset - see public/images/logo.png.
 */
function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 30C42 22 28 20 18 24V68C28 64 42 66 50 74C58 66 72 64 82 68V24C72 20 58 22 50 30Z"
        fill="#5B2D91"
        opacity="0.15"
      />
      <path d="M50 32V72" stroke="#5A1E1E" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M50 32C43 25 30 23 21 27V66C30 62 43 64 50 71C57 64 70 62 79 66V27C70 23 57 25 50 32Z"
        stroke="#5A1E1E"
        strokeWidth="2.5"
        fill="white"
      />
      <circle cx="30" cy="14" r="6" fill="#F5821F" />
      <circle cx="70" cy="14" r="6" fill="#5B2D91" />
      <path d="M30 20C26 22 24 26 24 30" stroke="#F5821F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M70 20C74 22 76 26 76 30" stroke="#5B2D91" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="46" r="3.5" fill="#C6197A" />
      <circle cx="84" cy="46" r="3.5" fill="#7AB61C" />
      <circle cx="12" cy="62" r="2.5" fill="#F5821F" />
      <circle cx="88" cy="62" r="2.5" fill="#5B2D91" />
    </svg>
  );
}

export default function Logo({ variant = "dark", size = "md", href = "/", showText = true }: LogoProps) {
  const config = sizes[size];
  const textColor = variant === "light" ? "text-white" : "text-navy-dark";

  const content = (
    <div className="flex items-center gap-2.5">
      <LogoMark size={config.icon} />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-display font-extrabold tracking-tight", config.text, textColor)}>
            VEDA <span className="text-brand-orange">EDUTECH</span>
          </span>
          <span
            className={cn(
              "mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em]",
              variant === "light" ? "text-white/60" : "text-navy/50"
            )}
          >
            Learn. Grow. Achieve.
          </span>
        </div>
      )}
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex items-center">
      {content}
    </Link>
  );
}

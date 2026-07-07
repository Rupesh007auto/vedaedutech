"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RippleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "accent" | "outline";
  className?: string;
  disabled?: boolean;
}

let rippleId = 0;

export default function RippleButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className,
  disabled,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = rippleId++;

    setRipples((prev) => [...prev, { id, x, y, size }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick?.();
  };

  const variantClass =
    variant === "primary" ? "btn-primary" : variant === "accent" ? "btn-accent" : "btn-outline";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={cn(variantClass, "ripple-container disabled:cursor-not-allowed disabled:opacity-60", className)}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-effect"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
    </button>
  );
}

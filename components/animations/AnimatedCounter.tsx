"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({ end, suffix = "", prefix = "", label, duration = 2.4 }: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-extrabold text-white sm:text-5xl">
        {prefix}
        {inView ? <CountUp end={end} duration={duration} separator="," /> : 0}
        {suffix}
      </div>
      <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/60">{label}</p>
    </div>
  );
}

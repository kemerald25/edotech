"use client";

import { useEffect, useState } from "react";

type Props = {
  value: number;
  duration?: number;
};

export function AnimatedCounter({ value, duration = 1200 }: Props) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const frame = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(frame);
    };
    const raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <span>{display.toLocaleString()}</span>;
}


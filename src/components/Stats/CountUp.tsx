"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function CountUp({ value }: { value: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Extract prefix, number, and suffix (e.g., "₹", "100", "Cr+" or "", "4.9", "/5")
  const match = value.match(/^(.*?)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match ? match[1] : "";
  const numericStr = match ? match[2] : "0";
  const suffix = match ? match[3] : "";
  
  const isDecimal = numericStr.includes(".");
  const numericVal = parseFloat(numericStr);

  useEffect(() => {
    if (isInView && match) {
      let startTime: number;
      const duration = 1800; // 1.8 seconds smooth animation

      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        
        // Easing function (easeOutExpo)
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = ease * numericVal;
        
        const formatted = isDecimal
          ? current.toFixed(1)
          : Math.floor(current).toLocaleString();

        setCount(`${prefix}${formatted}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, numericVal, isDecimal, prefix, suffix]);

  return <span ref={ref}>{match ? count : value}</span>;
}

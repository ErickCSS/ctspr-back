"use client";

import React, { useEffect, useRef } from "react";

interface CounterAnimationProps {
  value: number;
}

const CounterAnimation = ({ value }: CounterAnimationProps) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (counterRef.current && value > 0) {
      counterRef.current.style.setProperty("--num", String(value));

      counterRef.current.animate(
        [{ "--num": "0" }, { "--num": String(value) }],
        {
          duration: 2000,
          easing: "ease-out",
          fill: "forwards",
        },
      );
    }
  }, [value]);

  return <span ref={counterRef} className="stat-value"></span>;
};

export default CounterAnimation;

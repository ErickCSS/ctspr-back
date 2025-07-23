"use client";

import React, { useEffect, useRef } from "react";

interface CounterAnimationProps {
  value: number;
}

const CounterAnimation = ({ value }: CounterAnimationProps) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const numericValue = value;

    if (counterRef.current) {
      if (numericValue > 0) {
        let startTime: number;
        const duration = 2000;

        const animate = (currentTime: number) => {
          if (!startTime) {
            startTime = currentTime;
            // Inicializar con 0+ en el primer frame
            if (counterRef.current) {
              counterRef.current.textContent = "0+";
            }
          }

          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(easedProgress * numericValue);
          const formattedValue = currentValue.toLocaleString("en-US");

          if (counterRef.current) {
            counterRef.current.textContent = formattedValue + "+";
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      } else {
        // Para valores 0 o inválidos
        counterRef.current.textContent = "0+";
      }
    }
  }, [value]);

  return <span ref={counterRef}>0+</span>;
};

export default CounterAnimation;

"use client";

import React, { useEffect, useRef, useState } from "react";

interface CounterAnimationProps {
  value: number;
}

const CounterAnimation = ({ value }: CounterAnimationProps) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Create the intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: "0px",
      },
    );

    // Store the current ref value to use in cleanup
    const currentContainer = containerRef.current;

    // Observe the container element
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    // Cleanup function
    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  useEffect(() => {
    const numericValue = value;

    if (counterRef.current && isVisible) {
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
  }, [value, isVisible]);

  return (
    <div ref={containerRef}>
      <span ref={counterRef}>0+</span>
    </div>
  );
};

export default CounterAnimation;

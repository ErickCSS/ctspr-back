"use client";

import { cn } from "@/lib/utils";
import { IconArrowUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "hover:bg-secondaryColor fixed right-4 bottom-4 z-50 cursor-pointer rounded-full bg-black p-4 text-white shadow-lg transition-all duration-300",
        showButton ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <IconArrowUp className="h-6 w-6" />
    </button>
  );
};

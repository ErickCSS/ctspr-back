"use client";

import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { IconLink, IconShare2 } from "@tabler/icons-react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

export const SharePopover = ({
  textSocial,
  fgp,
}: {
  textSocial?: string;
  fgp?: string;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const windowIsDiff = typeof window !== "undefined";
  const pathname = windowIsDiff ? window.location.pathname : "";
  const url = `https://ctspr-back.vercel.app${pathname}`;
  const encodedText = encodeURIComponent(textSocial || "");
  const encodedUrl = encodeURIComponent(url);
  const t = useTranslations("sharePopover");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedUrl}`,
  };

  const SOCIALS = [
    {
      name: "facebook",
      icon: "/images/icons/facebook-icon.svg",
      width: 24,
      height: 24,
    },
    {
      name: "twitter",
      icon: "/images/icons/x.svg",
      width: 18,
      height: 18,
    },
    {
      name: "whatsapp",
      icon: "/images/icons/whatsapp-icon.svg",
      width: 26,
      height: 26,
    },
  ];

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node) &&
      !triggerRef.current?.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank");
    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success("Enlace copiado");
    setOpen(false);
  };

  useEffect(() => {
    if (open) document.addEventListener("click", handleOutsideClick);
    else document.removeEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [open]);

  const rect = triggerRef.current?.getBoundingClientRect();
  const popoverWidth = 360; // w-48 = 12rem = 192px
  const popoverHeight = 200; // Aproximado. Puedes ajustar esto si tienes altura dinámica.
  const spacingTop = 8;
  const spacingLeft = 20;

  const topSpace = rect?.top ?? 0;
  const bottomSpace = windowIsDiff
    ? window.innerHeight - (rect?.bottom ?? 0)
    : 0;
  const shouldOpenAbove =
    bottomSpace < popoverHeight && topSpace > popoverHeight;

  const top = shouldOpenAbove
    ? windowIsDiff
      ? (rect?.top ?? 0) + window.scrollY - popoverHeight - spacingTop
      : 0
    : windowIsDiff
      ? (rect?.bottom ?? 0) + window.scrollY + spacingTop
      : 0;

  let left = rect?.left ?? 0;

  // Ajustar si choca con el borde derecho
  if (windowIsDiff && left + popoverWidth > window.innerWidth) {
    left = window.innerWidth - popoverWidth - spacingLeft;
  }

  // Asegurar que no se salga por la izquierda
  if (windowIsDiff && left < spacingLeft) {
    left = spacingLeft;
  }

  const popover = (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          layoutId="share-popover"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.1 }}
          ref={containerRef}
          className="absolute z-50 w-[360px] space-y-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-lg"
          style={{
            top,
            left,
          }}
        >
          <div className="mb-2 flex items-center justify-between gap-x-2">
            <div className="text-lg font-medium">Social</div>
            <div className="flex items-center gap-x-2">
              {SOCIALS.map((social) => (
                <button
                  key={social.name}
                  className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-left hover:bg-zinc-100"
                  onClick={() =>
                    handleShare(social.name as keyof typeof shareLinks)
                  }
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={social.width}
                    height={social.height}
                  />
                </button>
              ))}
            </div>
          </div>
          <button
            className="flex w-full cursor-pointer items-center gap-2 rounded-md border border-zinc-100 p-2 text-left hover:bg-zinc-100"
            onClick={handleCopy}
          >
            <IconLink size={18} /> {t("copy")}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-fit cursor-pointer items-center gap-x-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 transition-colors duration-500 ease-in-out hover:bg-zinc-200"
      >
        <IconShare2 className="size-5" />
        <span>{t("title")}</span>
      </button>
      {typeof window !== "undefined" &&
        ReactDOM.createPortal(popover, document.body)}
    </>
  );
};

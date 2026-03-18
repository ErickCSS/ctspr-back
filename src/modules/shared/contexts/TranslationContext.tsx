"use client";

import { createContext, useContext, ReactNode } from "react";
import { PostTranslation } from "@/modules/shared/types/blog.types";

interface TranslationContextType {
  translations?: PostTranslation[];
  currentSlug?: string;
  currentLanguage?: string;
}

const TranslationContext = createContext<TranslationContextType>({});

export function TranslationProvider({
  children,
  translations,
  currentSlug,
  currentLanguage,
}: {
  children: ReactNode;
  translations?: PostTranslation[];
  currentSlug?: string;
  currentLanguage?: string;
}) {
  return (
    <TranslationContext.Provider
      value={{ translations, currentSlug, currentLanguage }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  return useContext(TranslationContext);
}

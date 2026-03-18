"use client";

import { ReactNode } from "react";
import { TranslationProvider } from "@/modules/shared/contexts/TranslationContext";
import { PostTranslation } from "@/modules/shared/types/blog.types";
import { Header } from "@modules/shared/components/general/header";

export function BlogPageWrapper({
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
    <TranslationProvider
      translations={translations}
      currentSlug={currentSlug}
      currentLanguage={currentLanguage}
    >
      <Header />
      <main>{children}</main>
    </TranslationProvider>
  );
}

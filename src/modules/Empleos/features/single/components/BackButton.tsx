"use client";

import { Button } from "@modules/ui/button";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";

export const BackButton = () => {
  const locale = useLocale();

  const router = useTransitionRouter();
  const t = useTranslations("singleEmployee");

  return (
    <Button
      size="lg"
      className="bg-primaryColor hover:bg-secondaryColor font-lato max-w-sm cursor-pointer text-base font-bold text-white transition-colors duration-300"
      onClick={() => router.push(`/${locale}/ofertas-empleo`)}
    >
      <IconArrowNarrowLeft stroke={1.2} size={40} />
      <span>{t("goBack")}</span>
    </Button>
  );
};

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@modules/ui/button";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export const BackButton = () => {
  const router = useRouter();
  const t = useTranslations("singleEmployee");

  return (
    <Button
      size="lg"
      className="bg-primaryColor hover:bg-secondaryColor font-lato max-w-sm cursor-pointer text-base font-bold text-white transition-colors duration-300"
      onClick={() => router.back()}
    >
      <IconArrowNarrowLeft stroke={1.2} size={40} />
      <span>{t("goBack")}</span>
    </Button>
  );
};

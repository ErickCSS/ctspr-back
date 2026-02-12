import { Button } from "@modules/ui/button";
import { IconCaretRightFilled } from "@tabler/icons-react";
import { Link } from "next-view-transitions";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

export const CallActions = async () => {
  const t = await getTranslations("callActions");
  const locale = await getLocale();

  return (
    <section className="bg-zinc-100 px-4 py-20">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-x-20 gap-y-10 lg:flex-row">
          <Button
            className="bg-primaryColor hover:bg-secondaryColor min-h-[60px] !px-8 text-lg transition-colors duration-300 md:text-2xl lg:!px-14 lg:!py-10 lg:text-4xl"
            asChild
          >
            <Link
              href={`/${locale}/ofertas-empleo`}
              className="flex items-center gap-x-5 md:gap-x-10"
            >
              <span className="font-bold">{t("jobOffers")} </span>{" "}
              <IconCaretRightFilled
                size={32}
                className="size-[24px] lg:size-[32px]"
              />
            </Link>
          </Button>

          <Button
            className="bg-primaryColor hover:bg-secondaryColor min-h-[60px] !px-8 text-lg transition-colors duration-300 md:text-2xl lg:!px-14 lg:!py-10 lg:text-4xl"
            asChild
          >
            <Link
              href={`/${locale}/servicios`}
              className="flex items-center gap-x-5 md:gap-x-10"
            >
              <span className="font-bold">{t("services")} </span>{" "}
              <IconCaretRightFilled
                size={32}
                className="size-[24px] lg:size-[32px]"
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

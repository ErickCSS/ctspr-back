import { SucursalCarousel } from "./SucursalCarousel";
import { WpQuery } from "@/modules/shared/services/wpQuery";
import { SucursalesProps } from "@/modules/shared/types/generalQuery.types";
import { querySucursales } from "@/modules/shared/graphql/general.query";
import { getLocale, getTranslations } from "next-intl/server";

export const Sucursales = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";
  const t = await getTranslations("sucursales");

  const sucursales: SucursalesProps = await WpQuery({
    query: querySucursales,
    variables: {
      category: isEnglish ? "sucursales-en" : "sucursales",
    },
  });

  return (
    <section className="bg-[#ebebeb] px-4 py-20">
      <div className="container mx-auto">
        <div className="space-y-10 text-center">
          <h2 className="text-5xl font-bold">{t("title")}</h2>
          <hr className="border-secondaryColor mx-auto my-3 w-[120px] border-2 outline-none" />
        </div>

        <SucursalCarousel sucursales={sucursales} />
      </div>
    </section>
  );
};

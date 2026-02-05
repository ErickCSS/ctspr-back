import { CarouselVertical } from "@modules/shared/components/CarouselVertical";
import { WpQuery } from "@/modules/shared/services/wpQuery";
import { ConoceSucursalProps } from "@/modules/shared/types/generalQuery.types";
import { queryConoceSucursal } from "@/modules/shared/graphql/general.query";
import { toReversed } from "@/modules/shared/utils/toReversed";
import { getLocale, getTranslations } from "next-intl/server";

export const SomosConoceSucursal = async () => {
  const locale = await getLocale();
  const t = await getTranslations("knowOurTeam");
  const isEnglish = locale === "en";

  const conoceSucursal: ConoceSucursalProps = await WpQuery({
    query: queryConoceSucursal,
    variables: {
      category: isEnglish ? "conoce-sucursal-en" : "conoce-sucursal",
    },
  });

  const conoceSucursalReverse = toReversed(conoceSucursal.posts.nodes);

  return (
    <div className="border border-zinc-500 p-10">
      <h2 className="mb-3 text-center text-3xl font-bold">{t("title")}</h2>

      <CarouselVertical carousels={conoceSucursalReverse} />
    </div>
  );
};

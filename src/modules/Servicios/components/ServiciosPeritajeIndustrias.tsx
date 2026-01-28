import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryServiciosPeritajeIndustrias } from "@/modules/shared/graphql/general.query";
import { ServiciosPeritajeIndustriasProps } from "@/modules/shared/types/generalQuery.types";
import { parseWithIcons } from "@/modules/shared/utils/ParseWithIcon.utils";
import { getLocale } from "next-intl/server";

export const ServiciosPeritajeIndustrias = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";

  const serviciosPeritajeIndustrias: ServiciosPeritajeIndustriasProps =
    await WpQuery({
      query: queryServiciosPeritajeIndustrias,
      variables: {
        category: isEnglish ? "peritaje-industrias-en" : "peritaje-industrias",
      },
    });

  const title = serviciosPeritajeIndustrias.posts.nodes[0].title;
  const content = serviciosPeritajeIndustrias.posts.nodes[0].content;
  const featuredImage =
    serviciosPeritajeIndustrias.posts.nodes[0].featuredImage.node.sourceUrl;

  return (
    <section
      className="flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-20 xl:min-h-[700px]"
      style={{ backgroundImage: `url(${featuredImage})` }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-10">
          <h2 className="text-center text-4xl font-bold text-black lg:text-5xl">
            {title}
          </h2>
          <hr className="border-secondaryColor mx-auto w-[120px] border-2" />
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="columns-1 space-y-4 text-xl text-black md:columns-2 lg:columns-3 lg:text-2xl">
            {parseWithIcons(content, "text-secondaryColor size-8")}
          </div>
        </div>
      </div>
    </section>
  );
};

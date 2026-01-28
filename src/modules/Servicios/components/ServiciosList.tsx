import Image from "next/image";
import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryServiciosList } from "@/modules/shared/graphql/general.query";
import { ServiciosListProps } from "@/modules/shared/types/generalQuery.types";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";
import { toReversed } from "@/modules/shared/utils/toReversed";
import { getLocale } from "next-intl/server";

export const ServiciosList = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";
  const serviciosList: ServiciosListProps = await WpQuery({
    query: queryServiciosList,
    variables: {
      category: isEnglish ? "servicios-en" : "servicios",
      notIn: isEnglish
        ? ["cG9zdDoxMDQ1", "cG9zdDoxMDY2", "cG9zdDoxMDY4"]
        : ["cG9zdDoxOTE=", "cG9zdDoxNzI=", "cG9zdDoxODY="],
    },
  });

  const servicios = toReversed(serviciosList.posts.nodes);

  return (
    <section className="w-full bg-white">
      {servicios.map((servicio, index) => (
        <div
          className="px-8 py-20 odd:bg-white even:bg-zinc-100 lg:px-4"
          key={servicio.id}
        >
          <div
            className={`mx-auto flex w-full max-w-7xl items-center justify-evenly ${index % 2 === 0 ? "flex-col lg:flex-row-reverse" : "flex-col lg:flex-row"}`}
          >
            <div className="w-full lg:w-1/2">
              <Image
                src={servicio.featuredImage.node.sourceUrl}
                alt={servicio.title}
                width={500}
                height={500}
                className="h-auto w-full rounded-3xl"
              />
            </div>

            <div
              className={`flex w-full flex-col gap-y-5 lg:w-1/2 ${index % 2 === 0 ? "p-5 lg:p-10" : "p-5 lg:py-10 lg:pl-20"}`}
            >
              <h3 className="text-4xl font-bold text-black xl:text-[40px]">
                {servicio.title}
              </h3>
              <hr className="w-3/4 border-2 border-zinc-300" />
              <div className="text-xl text-balance">
                {parseContent(servicio.content)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

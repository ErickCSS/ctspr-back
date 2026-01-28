import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryServicioSeguridadIntegral } from "@/modules/shared/graphql/general.query";
import { ServiciosListProps } from "@/modules/shared/types/generalQuery.types";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";
import Image from "next/image";
import { getLocale } from "next-intl/server";

export const ServiciosMiddle = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";

  const servicios: ServiciosListProps = await WpQuery({
    query: queryServicioSeguridadIntegral,
    variables: {
      category: isEnglish ? "servicios-en" : "servicios",
      in: isEnglish ? "cG9zdDoxMDY2" : "cG9zdDoxOTE=",
    },
  });

  const title = servicios.posts.nodes[0].title;
  const content = servicios.posts.nodes[0].content;
  const featuredImage = servicios.posts.nodes[0].featuredImage.node.sourceUrl;

  return (
    <section className="gradientCTS px-4 py-26">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-x-3 lg:flex-row">
          <div className="w-full lg:w-1/3">
            <Image
              src={featuredImage}
              alt={title}
              width={300}
              height={300}
              className="mx-auto w-[140px] lg:w-[300px]"
            />
          </div>
          <div className="flex w-full flex-col justify-center gap-y-8 lg:w-2/3">
            <h2 className="text-center text-3xl font-bold text-balance text-black lg:text-4xl xl:text-[45px]">
              {title}
            </h2>

            <div className="mx-auto w-full max-w-5xl text-center text-xl font-normal text-balance text-black lg:text-2xl xl:text-3xl">
              {parseContent(content)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

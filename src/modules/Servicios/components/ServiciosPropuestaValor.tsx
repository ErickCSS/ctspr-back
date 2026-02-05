import { WpQuery } from "@/modules/shared/services/wpQuery";
import {
  queryPropuestaValor,
  queryPropuestaValorTitle,
} from "@/modules/shared/graphql/general.query";
import {
  PropuestaValorProps,
  PropuestaValorTitleProps,
} from "@/modules/shared/types/generalQuery.types";
import { toReversed } from "@/modules/shared/utils/toReversed";
import Image from "next/image";
import { getLocale } from "next-intl/server";

export const ServiciosPropuestaValor = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";
  const propuestaValorTitle: PropuestaValorTitleProps = await WpQuery({
    query: queryPropuestaValorTitle,
    variables: {
      category: isEnglish ? "propuesta-valor-en" : "propuesta-valor",
      in: isEnglish ? "cG9zdDoxMDQ3" : "cG9zdDoxNjE=",
    },
  });

  const propuestaValor: PropuestaValorProps = await WpQuery({
    query: queryPropuestaValor,
    variables: {
      category: isEnglish ? "propuesta-valor-en" : "propuesta-valor",
      notIn: isEnglish ? "cG9zdDoxMDQ3" : "cG9zdDoxNjE=",
    },
  });

  const title = propuestaValorTitle.posts.nodes[0].title;
  const contentValor = toReversed(propuestaValor.posts.nodes);

  return (
    <section className="gradientCTS px-4 py-28">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold text-balance text-black md:text-5xl">
          {title}
        </h2>

        <div className="mt-22 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contentValor.map((value) => (
            <article
              key={value.id}
              className="flex flex-col items-center gap-y-5"
            >
              <Image
                src={value.featuredImage.node.sourceUrl}
                alt={value.title}
                width={500}
                height={500}
                loading="lazy"
                decoding="async"
                quality={50}
                className="h-auto w-42"
              />
              <h3 className="max-w-[500px] text-center text-xl font-normal text-balance text-black md:text-2xl">
                {value.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

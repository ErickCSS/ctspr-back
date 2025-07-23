import { WpQuery } from "@/services/wpQuery";
import {
  queryPropuestaValor,
  queryPropuestaValorTitle,
} from "@/graphql/general.query";
import {
  PropuestaValorProps,
  PropuestaValorTitleProps,
} from "@/types/generalQuery.types";
import { toReversed } from "@/utils/toReversed";
import Image from "next/image";

export const ServiciosPropuestaValor = async () => {
  const propuestaValorTitle: PropuestaValorTitleProps = await WpQuery({
    query: queryPropuestaValorTitle,
  });

  const propuestaValor: PropuestaValorProps = await WpQuery({
    query: queryPropuestaValor,
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
              <h5 className="max-w-[500px] text-center text-xl font-normal text-balance text-black md:text-2xl">
                {value.title}
              </h5>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

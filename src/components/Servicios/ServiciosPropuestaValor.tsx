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
  const firstValue = contentValor[0];
  const restValues = contentValor.slice(1);

  return (
    <section className="gradientCTS px-4 py-28">
      <div className="container mx-auto">
        <h2 className="text-center text-5xl font-bold text-black">{title}</h2>

        <div className="mt-22">
          <article
            key={firstValue.id}
            className="flex flex-col items-center gap-y-5"
          >
            <Image
              src={firstValue.featuredImage.node.sourceUrl}
              alt={firstValue.title}
              width={500}
              height={500}
              loading="lazy"
              decoding="async"
              quality={50}
              className="h-auto w-42"
            />
            <h5 className="max-w-96 text-center text-2xl font-normal text-balance text-black">
              {firstValue.title}
            </h5>
          </article>

          <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
            {restValues.map((value) => (
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
                <h5 className="max-w-96 text-center text-2xl font-normal text-balance text-black">
                  {value.title}
                </h5>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

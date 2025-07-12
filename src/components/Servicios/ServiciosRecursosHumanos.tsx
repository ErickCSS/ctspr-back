import { WpQuery } from "@/services/wpQuery";
import {
  queryRecursosHumanoTitle,
  queryRecursosHumanos,
} from "@/graphql/general.query";
import {
  RecursosHumanosTitleProps,
  RecursosHumanosProps,
} from "@/types/generalQuery.types";
import { parseContent } from "@/utils/parseContent.utils";
import Image from "next/image";

export const ServiciosRecursosHumanos = async () => {
  const recursosHumanosTitle: RecursosHumanosTitleProps = await WpQuery({
    query: queryRecursosHumanoTitle,
  });

  const recursosHumanos: RecursosHumanosProps = await WpQuery({
    query: queryRecursosHumanos,
  });

  const title = recursosHumanosTitle.posts.nodes[0].title;
  const content = recursosHumanosTitle.posts.nodes[0].content;
  const servicios = recursosHumanos.posts.nodes;

  const rows = [];
  for (let i = 0; i < servicios.length; i += 2) {
    rows.push(servicios.slice(i, i + 2));
  }

  return (
    <section className="bg-white px-4 py-28">
      <div className="container mx-auto">
        <div className="space-y-5">
          <h2 className="text-center text-4xl font-bold text-black lg:text-5xl">
            {title}
          </h2>
          <hr className="border-secondaryColor mx-auto my-3 w-[120px] border-2 outline-none" />
          <h5 className="mt-10 text-center text-xl text-balance">
            {parseContent(content)}
          </h5>
        </div>

        <div className="mx-auto mt-20 max-w-6xl">
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-8 border-b border-dashed pb-10 last:border-b-0 last:pt-10 md:grid-cols-2"
            >
              {row.map((servicio) => (
                <div
                  key={servicio.id}
                  className="flex items-start gap-4 border-dashed px-4 last:border-r-0 lg:border-r"
                >
                  <Image
                    src={servicio.featuredImage?.node?.sourceUrl}
                    alt={servicio.title}
                    className="size-28 object-contain"
                    width={64}
                    height={64}
                  />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold">{servicio.title}</h3>
                    <div className="text-balance text-gray-600">
                      {parseContent(servicio.content)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

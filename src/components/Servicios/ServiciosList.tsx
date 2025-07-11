import Image from "next/image";
import { WpQuery } from "@/services/wpQuery";
import { queryServiciosList } from "@/graphql/general.query";
import { ServiciosListProps } from "@/types/generalQuery.types";
import { parseContent } from "@/utils/parseContent.utils";
import { toReversed } from "@/utils/toReversed";

export const ServiciosList = async () => {
  const serviciosList: ServiciosListProps = await WpQuery({
    query: queryServiciosList,
  });

  const servicios = toReversed(serviciosList.posts.nodes);

  return (
    <section className="w-full bg-white">
      {servicios.map((servicio, index) => (
        <div
          className="px-4 py-20 odd:bg-white even:bg-zinc-100"
          key={servicio.id}
        >
          <div
            className={`mx-auto flex w-full max-w-7xl items-center justify-evenly ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className="w-1/2">
              <Image
                src={servicio.featuredImage.node.sourceUrl}
                alt={servicio.title}
                width={500}
                height={500}
                className="h-auto w-full"
              />
            </div>

            <div
              className={`flex w-1/2 flex-col gap-y-5 ${index % 2 === 0 ? "p-10" : "px-20 py-10"}`}
            >
              <h3 className="text-5xl font-bold text-black">
                {servicio.title}
              </h3>
              <hr className="w-3/4 border-2 border-zinc-300" />
              <div className="text-2xl text-balance">
                {parseContent(servicio.content)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

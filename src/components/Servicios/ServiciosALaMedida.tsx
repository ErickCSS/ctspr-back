import Image from "next/image";
import { WpQuery } from "@/services/wpQuery";
import { queryServiciosMedida } from "@/graphql/general.query";
import { ServiciosListProps } from "@/types/generalQuery.types";
import { parseContent } from "@/utils/parseContent.utils";

export const ServiciosALaMedida = async () => {
  const serviciosList: ServiciosListProps = await WpQuery({
    query: queryServiciosMedida,
  });

  const servicio = serviciosList.posts.nodes[0];

  return (
    <section className="w-full bg-white">
      <div className="px-4 py-20 odd:bg-white even:bg-zinc-100">
        <div
          className={`mx-auto flex w-full max-w-7xl flex-col items-center justify-evenly lg:flex-row-reverse`}
        >
          <div className="w-full lg:w-1/2">
            <Image
              src={servicio.featuredImage.node.sourceUrl}
              alt={servicio.title}
              width={500}
              height={500}
              className="h-auto w-full"
            />
          </div>

          <div className={`flex w-full flex-col gap-y-5 p-5 lg:w-1/2 lg:p-10`}>
            <h3 className="text-3xl font-bold text-black lg:text-5xl">
              {servicio.title}
            </h3>
            <hr className="w-3/4 border-2 border-zinc-300" />
            <div className="text-xl text-balance lg:text-2xl">
              {parseContent(servicio.content)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { SomosCarousel } from "./SomosCarousel";
import { AfiliadosProps, AfiliadosTitle } from "@/types/generalQuery.types";
import { WpQuery } from "@/services/wpQuery";
import { queryAfiliados, queryTitle } from "@/const/general.query";

export const SomosAfiliaciones = async () => {
  const afiliados: AfiliadosProps = await WpQuery({
    query: queryAfiliados,
  });

  const title: AfiliadosTitle = await WpQuery({
    query: queryTitle,
  });

  return (
    <section className="bg-zinc-100 px-4 py-32">
      <div className="flex flex-col items-center gap-y-5">
        <h2 className="text-center text-5xl font-bold">
          {title.posts.nodes[0].title}
        </h2>
        <hr className="border-secondaryColor mx-auto my-3 w-[120px] border-2 outline-none" />
      </div>
      <SomosCarousel afiliados={afiliados} />
    </section>
  );
};

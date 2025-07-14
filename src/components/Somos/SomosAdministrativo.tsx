import { SomosCard } from "./SomosCard";
import { WpQuery } from "@/services/wpQuery";
import { queryEquipoAdministrativo } from "@/graphql/general.query";
import { EquiposProps } from "@/types/generalQuery.types";

export const SomosAdministrativo = async () => {
  const equipoAdministrativo: EquiposProps = await WpQuery({
    query: queryEquipoAdministrativo,
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-y-10">
        <h2 className="text-center text-4xl font-bold text-white lg:text-5xl">
          Equipo Administrativo
        </h2>
        <hr className="w-[120px] border-2 border-white outline-none" />
      </div>

      <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 lg:w-4xl xl:w-6xl">
        {equipoAdministrativo.posts.nodes.map((equipo, index) => (
          <SomosCard
            key={index}
            name={equipo.title}
            position={equipo.content}
            image={equipo.featuredImage.node.sourceUrl}
          />
        ))}
      </div>
    </div>
  );
};

import { SomosCard } from "./SomosCard";
import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryEquipoGerencial } from "@/modules/shared/graphql/general.query";
import { EquiposProps } from "@/modules/shared/types/generalQuery.types";

export const SomosGerencia = async () => {
  const equipoAdministrativo: EquiposProps = await WpQuery({
    query: queryEquipoGerencial,
  });

  return (
    <div className="mt-32 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-y-10">
        <h2 className="text-center text-5xl font-bold text-black">
          Equipo Gerencial
        </h2>
        <hr className="border-secondaryColor w-[120px] border-2 outline-none" />
      </div>

      <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 lg:w-4xl xl:w-6xl">
        {equipoAdministrativo.posts.nodes.map((equipo, index) => (
          <SomosCard
            key={index}
            name={equipo?.title}
            position={equipo?.content}
            image={equipo?.featuredImage?.node?.sourceUrl}
          />
        ))}
      </div>
    </div>
  );
};

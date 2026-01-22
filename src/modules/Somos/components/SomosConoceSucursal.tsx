import { CarouselVertical } from "@modules/shared/components/CarouselVertical";
import { WpQuery } from "@/modules/shared/services/wpQuery";
import { ConoceSucursalProps } from "@/modules/shared/types/generalQuery.types";
import { queryConoceSucursal } from "@/modules/shared/graphql/general.query";
import { toReversed } from "@/modules/shared/utils/toReversed";

export const SomosConoceSucursal = async () => {
  const conoceSucursal: ConoceSucursalProps = await WpQuery({
    query: queryConoceSucursal,
  });

  const conoceSucursalReverse = toReversed(conoceSucursal.posts.nodes);

  return (
    <div className="border border-zinc-500 p-10">
      <h4 className="mb-3 text-center text-3xl font-bold">
        Conoce parte de nuestro equipo
      </h4>

      <CarouselVertical carousels={conoceSucursalReverse} />
    </div>
  );
};

import { CarouselVertical } from "../shared/CarouselVertical";
import { WpQuery } from "@/services/wpQuery";
import { ConoceSucursalProps } from "@/types/generalQuery.types";
import { queryConoceSucursal } from "@/graphql/general.query";
import { toReversed } from "@/utils/toReversed";

export const SomosConoceSucursal = async () => {
  const conoceSucursal: ConoceSucursalProps = await WpQuery({
    query: queryConoceSucursal,
  });

  const conoceSucursalReverse = toReversed(conoceSucursal.posts.nodes);

  return (
    <div className="border border-zinc-500 p-10">
      <h4 className="mb-3 text-center text-3xl font-bold">
        Conoce a tu sucursal
      </h4>

      <CarouselVertical carousels={conoceSucursalReverse} />
    </div>
  );
};

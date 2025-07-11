import { SucursalCarousel } from "./SucursalCarousel";
import { WpQuery } from "@/services/wpQuery";
import { SucursalesProps } from "@/types/generalQuery.types";
import { querySucursales } from "@/graphql/general.query";

export const Sucursales = async () => {
  const sucursales: SucursalesProps = await WpQuery({
    query: querySucursales,
  });

  return (
    <section className="bg-[#ebebeb] px-4 py-20">
      <div className="container mx-auto">
        <div className="space-y-10 text-center">
          <h2 className="text-5xl font-bold">Sucursales</h2>
          <hr className="border-secondaryColor mx-auto my-3 w-[120px] border-2 outline-none" />
        </div>

        <SucursalCarousel sucursales={sucursales} />
      </div>
    </section>
  );
};

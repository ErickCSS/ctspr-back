import { Hero } from "@/modules/shared/components/Hero";
import { Unete } from "@/modules/shared/components/Unete";
import { SomosComponent } from "@modules/Somos/components/SomosComponent";
import { SomosAfiliaciones } from "@modules/Somos/components/SomosAfiliaciones";
import { SomosValues } from "@modules/Somos/components/SomosValues";
import { SomosNosotros } from "@modules/Somos/components/SomosNosotros";
import { SomosTransformamos } from "@modules/Somos/components/SomosTransformamos";

export const SomosPage = () => {
  return (
    <>
      <Hero title="Quiénes Somos" />
      <SomosNosotros />
      <SomosValues />
      <SomosTransformamos />
      <SomosAfiliaciones background="bg-zinc-100" />
      <Unete />
      <SomosComponent />
    </>
  );
};

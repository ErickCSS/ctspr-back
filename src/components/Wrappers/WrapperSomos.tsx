import { Hero } from "@components/shared/Hero";
import { Unete } from "@components/shared/Unete";
import { SomosComponent } from "@components/Somos/SomosComponent";
import { SomosAfiliaciones } from "@components/Somos/SomosAfiliaciones";
import { SomosValues } from "@components/Somos/SomosValues";
import { SomosNosotros } from "@components/Somos/SomosNosotros";
import { SomosTransformamos } from "@components/Somos/SomosTransformamos";

export const WrapperSomos = () => {
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

import { Hero } from "@components/shared/Hero";
import { Unete } from "@components/shared/Unete";
import { SomosComponent } from "@components/Somos/SomosComponent";
import { SomosAfiliaciones } from "@components/Somos/SomosAfiliaciones";

export const WrapperSomos = () => {
  return (
    <>
      <Hero title="Quiénes Somos" />
      <SomosAfiliaciones />
      <Unete />
      <SomosComponent />
    </>
  );
};

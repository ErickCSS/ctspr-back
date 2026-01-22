import { SomosAdministrativo } from "./SomosAdministrativo";
import { SomosGerencia } from "./SomosGerencia";

export const SomosComponent = () => {
  return (
    <section className="gradientCTS px-4 py-32">
      <div className="container mx-auto">
        <SomosAdministrativo />
        <SomosGerencia />
      </div>
    </section>
  );
};

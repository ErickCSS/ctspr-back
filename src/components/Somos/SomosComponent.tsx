import { SomosAdministrativo } from "./SomosAdministrativo";
import { SomosGerencia } from "./SomosGerencia";

export const SomosComponent = () => {
  return (
    <section className="from-primaryColor via-primaryColor to-secondaryColor bg-gradient-to-tr px-4 py-32">
      <div className="container mx-auto">
        <SomosAdministrativo />
        <SomosGerencia />
      </div>
    </section>
  );
};

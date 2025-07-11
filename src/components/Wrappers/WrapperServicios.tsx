import { Hero } from "@components/shared/Hero";
import { ServiciosContent } from "@components/Servicios/ServiciosContent";
import { ServiciosPropuestaValor } from "@components/Servicios/ServiciosPropuestaValor";
import { SomosAfiliaciones } from "@components/Somos/SomosAfiliaciones";
import { ServiciosList } from "@components/Servicios/ServiciosList";

export const WrapperServicios = () => {
  return (
    <>
      <Hero title="Servicios" />
      <ServiciosContent />
      <ServiciosPropuestaValor />
      <ServiciosList />
      <SomosAfiliaciones />
    </>
  );
};

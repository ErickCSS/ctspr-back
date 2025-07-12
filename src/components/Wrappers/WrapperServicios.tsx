import { Hero } from "@components/shared/Hero";
import { ServiciosContent } from "@components/Servicios/ServiciosContent";
import { ServiciosPropuestaValor } from "@components/Servicios/ServiciosPropuestaValor";
import { SomosAfiliaciones } from "@components/Somos/SomosAfiliaciones";
import { ServiciosList } from "@components/Servicios/ServiciosList";
import { ServiciosMiddle } from "@components/Servicios/ServiciosMiddle";
import { ServiciosALaMedida } from "@components/Servicios/ServiciosALaMedida";
import { ServiciosCallActions } from "@components/Servicios/ServiciosCallActions";
import { ServiciosRecursosHumanos } from "@components/Servicios/ServiciosRecursosHumanos";
import { ServiciosPeritajeIndustrias } from "@components/Servicios/ServiciosPeritajeIndustrias";
import { ServiciosSeguridadSalud } from "@components/Servicios/ServiciosSeguridadSalud";
import { ServiciosPreguntasFrecuentes } from "@components/Servicios/ServiciosPreguntasFrecuentes";

export const WrapperServicios = () => {
  return (
    <>
      <Hero title="Servicios" />
      <ServiciosContent />
      <ServiciosPropuestaValor />
      <ServiciosList />
      <ServiciosMiddle />
      <ServiciosALaMedida />
      <ServiciosCallActions />
      <ServiciosRecursosHumanos />
      <ServiciosPeritajeIndustrias />
      <ServiciosSeguridadSalud />
      <ServiciosPreguntasFrecuentes />
      <SomosAfiliaciones background="bg-white" />
    </>
  );
};

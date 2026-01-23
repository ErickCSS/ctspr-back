import { Hero } from "@modules/shared/components/Hero";
import { ServiciosContent } from "@modules/Servicios/components/ServiciosContent";
import { ServiciosPropuestaValor } from "@modules/Servicios/components/ServiciosPropuestaValor";
import { SomosAfiliaciones } from "@modules/Somos/components/SomosAfiliaciones";
import { ServiciosList } from "@modules/Servicios/components/ServiciosList";
import { ServiciosMiddle } from "@modules/Servicios/components/ServiciosMiddle";
import { ServiciosALaMedida } from "@modules/Servicios/components/ServiciosALaMedida";
import { ServiciosCallActions } from "@modules/Servicios/components/ServiciosCallActions";
import { ServiciosRecursosHumanos } from "@modules/Servicios/components/ServiciosRecursosHumanos";
import { ServiciosPeritajeIndustrias } from "@modules/Servicios/components/ServiciosPeritajeIndustrias";
import { ServiciosSeguridadSalud } from "@modules/Servicios/components/ServiciosSeguridadSalud";
import { ServiciosPreguntasFrecuentes } from "@modules/Servicios/components/ServiciosPreguntasFrecuentes";
import { getLocale } from "next-intl/server";

export const ServiciosPage = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";

  return (
    <>
      <Hero title={isEnglish ? "Services" : "Servicios"} />
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

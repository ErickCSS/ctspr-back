import { Hero } from "@/modules/shared/components/Hero";
import { EmpleosMapSelect } from "@modules/Empleos/components/EmpleosMapSelect";
import { EmpleosBeneficios } from "@modules/Empleos/components/EmpleosBeneficios";

import { EmpleoPreguntaFrecuentes } from "@modules/Empleos/components/EmpleoPreguntaFrecuentes";
import { Testimonials } from "@modules/home/components/Testimonials";
import { getLocale } from "next-intl/server";

export const OfertaEmpleoPage = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";

  return (
    <>
      <Hero title={isEnglish ? "Job Offers" : "Oferta de Empleo"} />
      <EmpleosMapSelect />
      <EmpleosBeneficios />
      <Testimonials />
      <EmpleoPreguntaFrecuentes />
    </>
  );
};

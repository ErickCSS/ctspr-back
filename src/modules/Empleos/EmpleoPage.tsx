import { Hero } from "@/modules/shared/components/Hero";
import { EmpleosMapSelect } from "@modules/Empleos/components/EmpleosMapSelect";
import { EmpleosBeneficios } from "@modules/Empleos/components/EmpleosBeneficios";

import { EmpleoPreguntaFrecuentes } from "@modules/Empleos/components/EmpleoPreguntaFrecuentes";
import { Testimonials } from "@modules/home/components/Testimonials";

export const EmpleoPage = () => {
  return (
    <>
      <Hero title="Empleo" />
      <EmpleosMapSelect />
      <EmpleosBeneficios />
      <Testimonials />
      <EmpleoPreguntaFrecuentes />
    </>
  );
};

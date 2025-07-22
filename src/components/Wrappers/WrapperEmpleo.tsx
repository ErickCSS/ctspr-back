import { Hero } from "@components/shared/Hero";
import { EmpleosMapSelect } from "@components/Empleos/EmpleosMapSelect";
import { EmpleosBeneficios } from "@components/Empleos/EmpleosBeneficios";

import { EmpleoPreguntaFrecuentes } from "@components/Empleos/EmpleoPreguntaFrecuentes";
import { Testimonials } from "@components/Home/Testimonials";

export const WrapperEmpleo = () => {
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

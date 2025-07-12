import { Hero } from "@components/shared/Hero";
import { EmpleosMapSelect } from "@components/Empleos/EmpleosMapSelect";
import { EmpleosBeneficios } from "../Empleos/EmpleosBeneficios";
import { EmpleoConoceSucursal } from "../Empleos/EmpleoConoceSucursal";
import { EmpleoPreguntaFrecuentes } from "../Empleos/EmpleoPreguntaFrecuentes";

export const WrapperEmpleo = () => {
  return (
    <>
      <Hero title="Empleo" />
      <EmpleosMapSelect />
      <EmpleosBeneficios />
      <EmpleoConoceSucursal />
      <EmpleoPreguntaFrecuentes />
    </>
  );
};

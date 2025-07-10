import { Sucursales } from "../Sucursales/Sucursales";
import { ContactComponent } from "../Contacto/ContactComponent";
import { Hero } from "../shared/Hero";

export const WrapperContact = () => {
  return (
    <>
      <Hero title="Contáctenos" />
      <Sucursales />
      <ContactComponent />
    </>
  );
};

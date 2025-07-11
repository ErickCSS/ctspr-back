import { Sucursales } from "../Sucursales/Sucursales";
import { ContactComponent } from "../Contacto/ContactComponent";
import { Hero } from "../shared/Hero";
import { Unete } from "../shared/Unete";

export const WrapperContact = () => {
  return (
    <>
      <Hero title="Contáctenos" />
      <Sucursales />
      <ContactComponent />
      <Unete />
    </>
  );
};

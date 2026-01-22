import { Sucursales } from "@modules/Sucursales/components/Sucursales";
import { ContactComponent } from "@/modules/contact/components/ContactComponent";
import { Hero } from "../shared/components/Hero";
import { Unete } from "../shared/components/Unete";

export const ContactPage = () => {
  return (
    <>
      <Hero title="Contáctenos" />
      <Sucursales />
      <ContactComponent />
      <Unete />
    </>
  );
};

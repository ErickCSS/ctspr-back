import { Sucursales } from "@modules/Sucursales/components/Sucursales";
import { ContactComponent } from "@/modules/contact/components/ContactComponent";
import { Hero } from "../shared/components/Hero";
import { Unete } from "../shared/components/Unete";
import { getLocale } from "next-intl/server";

export const ContactPage = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";

  return (
    <>
      <Hero title={isEnglish ? "Contact Us" : "Contáctenos"} />
      <Sucursales />
      <ContactComponent />
      <Unete />
    </>
  );
};

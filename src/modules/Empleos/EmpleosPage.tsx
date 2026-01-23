import { Hero } from "@modules/shared/components/Hero";
import { EmpleosList } from "./components/EmpleosList";
import { getLocale } from "next-intl/server";

export const EmpleosPage = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";

  return (
    <>
      <Hero title={isEnglish ? "Job Listing" : "Listado de Empleos"} />
      <EmpleosList />
    </>
  );
};

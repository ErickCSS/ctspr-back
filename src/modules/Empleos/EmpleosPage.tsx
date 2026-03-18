import { Hero } from "@modules/shared/components/Hero";
import { EmpleosList } from "./components/EmpleosList";
import { getLocale } from "next-intl/server";
import { Header } from "@modules/shared/components/general/header";

export const EmpleosPage = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";

  return (
    <>
      <Header />
      <main>
        <Hero title={isEnglish ? "Job Listing" : "Listado de Empleos"} />
        <EmpleosList />
      </main>
    </>
  );
};

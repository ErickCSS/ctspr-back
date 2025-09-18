import { Hero } from "@modules/shared/components/Hero";
import { EmpleosList } from "./components/EmpleosList";

export const EmpleosPage = () => {
  return (
    <>
      <Hero title="Empleo" />
      <EmpleosList />
    </>
  );
};

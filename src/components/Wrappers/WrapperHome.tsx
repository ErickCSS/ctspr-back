import { Hero } from "@components/Home/Hero";
import { Sucursales } from "@/components/Sucursales/Sucursales";
import { Testimonials } from "@components/Home/Testimonials";

export const WrapperHome = () => {
  return (
    <>
      <Hero />
      <Testimonials />
      <Sucursales />
    </>
  );
};

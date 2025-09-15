import { Hero } from "@modules/home/components/Hero";
import { Sucursales } from "@modules/Sucursales/components/Sucursales";
import { Testimonials } from "@modules/home/components/Testimonials";
import { CallActions } from "@modules/home/components/CallActions";
import { WhyChooseUs } from "@modules/home/components/WhyChooseUs";
import { About } from "@modules/home/components/About";

export const WrapperHome = () => {
  return (
    <>
      <Hero />
      <CallActions />
      <About />
      <WhyChooseUs />
      <Testimonials />
      <Sucursales />
    </>
  );
};

import { Hero } from "@components/Home/Hero";
import { Sucursales } from "@/components/Sucursales/Sucursales";
import { Testimonials } from "@components/Home/Testimonials";
import { CallActions } from "@components/Home/CallActions";
import { WhyChooseUs } from "@components/Home/WhyChooseUs";
import { About } from "@components/Home/About";

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

import { WpQuery } from "@/services/wpQuery";
import { queryTestimonios } from "@/const/general.query";
import { TestimoniosProps } from "@/types/generalQuery.types";
import { TestimonialCarousel } from "./TestimonialCarousel";

export const Testimonials = async () => {
  const testimonios: TestimoniosProps = await WpQuery({
    query: queryTestimonios,
  });

  return (
    <section className="bg-white px-4 py-20">
      <div className="container mx-auto">
        <div className="space-y-10 text-center">
          <h2 className="text-5xl font-bold">Testimoniales</h2>
          <hr className="border-secondaryColor mx-auto my-3 w-[120px] border-2 outline-none" />
        </div>

        <div className="mt-14">
          <TestimonialCarousel testimonios={testimonios} />
        </div>
      </div>
    </section>
  );
};

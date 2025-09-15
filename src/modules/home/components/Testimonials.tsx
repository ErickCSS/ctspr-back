import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryTestimonios } from "@/modules/shared/graphql/general.query";
import { TestimoniosProps } from "@/modules/shared/types/generalQuery.types";
import { CarouselButtonTop } from "@/modules/shared/components/CarouselButtonTop";
import { toReversed } from "@/modules/shared/utils/toReversed";

export const Testimonials = async () => {
  const testimonios: TestimoniosProps = await WpQuery({
    query: queryTestimonios,
  });

  const testimoniosReverse = toReversed(testimonios.posts.nodes);

  return (
    <section className="bg-white px-4 py-20">
      <div className="container mx-auto">
        <div className="space-y-10 text-center">
          <h2 className="text-5xl font-bold">Testimoniales</h2>
          <hr className="border-secondaryColor mx-auto my-3 w-[120px] border-2 outline-none" />
        </div>

        <div className="mt-14">
          <CarouselButtonTop carousels={testimoniosReverse} />
        </div>
      </div>
    </section>
  );
};

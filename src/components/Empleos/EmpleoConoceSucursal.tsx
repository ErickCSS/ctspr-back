import { WpQuery } from "@/services/wpQuery";
import { queryTestimonios } from "@/graphql/general.query";
import { TestimoniosProps } from "@/types/generalQuery.types";
import { CarouselButtonTop } from "@/components/shared/CarouselButtonTop";
import { toReversed } from "@/utils/toReversed";

export const EmpleoConoceSucursal = async () => {
  const testimonios: TestimoniosProps = await WpQuery({
    query: queryTestimonios,
  });

  const testimoniosReverse = toReversed(testimonios.posts.nodes);

  return (
    <section className="bg-white px-4 py-20">
      <div className="container mx-auto">
        <div className="space-y-10 text-center">
          <h2 className="text-5xl font-bold">Conoce nuestras sucursales</h2>
          <hr className="border-secondaryColor mx-auto my-3 w-[120px] border-2 outline-none" />
        </div>

        <div className="mt-14">
          <CarouselButtonTop carousels={testimoniosReverse} />
        </div>
      </div>
    </section>
  );
};

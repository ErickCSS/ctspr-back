"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { TestimoniosProps } from "@/types/generalQuery.types";
import { Navigation } from "swiper/modules";
import { parseContent } from "@/utils/parseContent.utils";
import Image from "next/image";
import { toReversed } from "@/utils/toReversed";

export const TestimonialCarousel = ({
  testimonios,
}: {
  testimonios: TestimoniosProps;
}) => {
  const testimoniosReversed = toReversed(testimonios.posts.nodes);

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation={true}
      modules={[Navigation]}
      className="TestimonialCarousel w-[1100px] rounded-xl bg-zinc-100"
    >
      {testimoniosReversed?.map((testimonio, index) => (
        <SwiperSlide key={index} className="px-10 pt-22 pb-10">
          <div className="grid grid-cols-[200px_1fr] items-center gap-10">
            <Image
              src={testimonio.featuredImage.node.sourceUrl}
              alt={testimonio.title}
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              quality={60}
              className="h-auto w-full"
            />

            <div className="flex flex-col space-y-2">
              <h4 className="mb-2 flex items-end gap-x-3 text-3xl font-bold">
                {testimonio.title}{" "}
                <span className="text-lg">
                  {testimonio.excerpt.includes("Casa Bacardí")
                    ? parseContent(testimonio.excerpt)
                    : ""}
                </span>
              </h4>
              <div className="text-lg">
                {parseContent(testimonio.content, {
                  configs: {
                    p: {
                      className: "font-balance",
                    },
                  },
                })}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

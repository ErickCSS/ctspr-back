"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { TestimoniosProps } from "@/types/generalQuery.types";
import { Navigation } from "swiper/modules";
import { parseContent } from "@/utils/parseContent.utils";
import Image from "next/image";

export const TestimonialCarousel = ({
  testimonios,
}: {
  testimonios: TestimoniosProps;
}) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation={true}
      modules={[Navigation]}
      loop={true}
      className="w-[1200px] rounded-xl bg-zinc-100"
    >
      {testimonios.posts.nodes.reverse().map((testimonio, index) => (
        <SwiperSlide key={index} className="px-10 pt-15 pb-10">
          <div className="grid grid-cols-[200px_1fr] items-center gap-10">
            <Image
              src={testimonio.featuredImage.node.sourceUrl}
              alt={testimonio.title}
              width={200}
              height={200}
              className="h-auto w-full"
            />

            <div className="flex flex-col space-y-2">
              <h4 className="text-3xl font-black">{testimonio.title}</h4>
              <p className="text-lg">{parseContent(testimonio.content)}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

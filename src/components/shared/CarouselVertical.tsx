"use clients";

"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { CarouselProps } from "@/types/generalQuery.types";
import { Navigation, Autoplay } from "swiper/modules";
import { parseContent } from "@/utils/parseContent.utils";
import Image from "next/image";
import { TruncatedHtml } from "@/lib/Truncated";

export const CarouselVertical = ({
  carousels,
}: {
  carousels: CarouselProps[];
}) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay]}
      className="carousel-vertical rounded-xl bg-white"
    >
      {carousels?.map((carousel, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={carousel.featuredImage.node.sourceUrl}
              alt={carousel.title}
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              quality={60}
              className="size-[180px] rounded-full border-8 border-white object-cover object-top shadow-2xl"
            />

            <div className="mt-2 flex flex-col">
              <div className="flex flex-col items-center">
                <h4 className="text-secondaryColor text-center text-3xl font-black">
                  {carousel.title}
                </h4>
                <h5 className="text-base font-bold text-black">
                  {parseContent(carousel.excerpt)}
                </h5>
              </div>
              <div className="text-center text-base [&_h6]:mb-4 [&_h6]:font-bold [&_h6]:text-zinc-500 [&_p]:text-balance">
                <TruncatedHtml
                  html={carousel.content}
                  limit={200}
                  moreLabel="Leer más"
                  lessLabel="Leer menos"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

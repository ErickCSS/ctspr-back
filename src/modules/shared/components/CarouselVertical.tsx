"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { CarouselProps } from "@/modules/shared/types/generalQuery.types";
import { Navigation, Autoplay } from "swiper/modules";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";
import Image from "next/image";
import { TruncatedHtml } from "@/modules/shared/lib/Truncated";
import { useState, useEffect, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

export const CarouselVertical = ({
  carousels,
}: {
  carousels: CarouselProps[];
}) => {
  const [autoplay, setAutoplay] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
      swiperRef.current.autoplay.start();
    }
  }, [autoplay]);

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation={true}
      autoplay={{
        delay: autoplay === true ? 10000 : 600000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay]}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      className="carousel-vertical rounded-xl bg-white"
    >
      {carousels?.map((carousel, index) => (
        <SwiperSlide key={index} className="overflow-hidden">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={carousel.featuredImage.node.sourceUrl}
              alt={carousel.title}
              width={200}
              height={200}
              sizes="(max-width: 768px) 120px, 180px"
              loading="lazy"
              decoding="async"
              quality={60}
              className="size-[180px] rounded-full border-8 border-white object-cover object-top shadow-2xl"
            />

            <div className="mx-auto mt-2 flex w-full max-w-full flex-col px-4">
              <div className="flex flex-col items-center">
                <h2 className="text-secondaryColor text-center text-3xl font-black">
                  {carousel.title}
                </h2>
                <div className="text-center text-base font-bold text-balance text-black">
                  {parseContent(carousel.excerpt)}
                </div>
              </div>
              <div className="text-center text-base [&_h6]:mb-4 [&_h6]:font-bold [&_h6]:text-zinc-500 [&_p]:w-full [&_p]:border-none [&_p]:text-balance">
                <TruncatedHtml
                  html={carousel.content}
                  limit={200}
                  moreLabel="Leer más"
                  lessLabel="Leer menos"
                  onClickMore={() => setAutoplay(false)}
                  onClickLess={() => setAutoplay(true)}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

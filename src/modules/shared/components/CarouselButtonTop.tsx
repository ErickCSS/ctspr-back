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
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";

export const CarouselButtonTop = ({
  carousels,
}: {
  carousels: CarouselProps[];
}) => {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/es" || pathname === "/en";
  const showFirstSix = carousels.slice(0, 6);
  const showLastSix = carousels.slice(-6);
  const SHOW_SLIDES = isHome ? showFirstSix : showLastSix;

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
      modules={[Navigation, Autoplay]}
      loop={true}
      autoplay={{
        delay: autoplay === true ? 10000 : 600000,
        disableOnInteraction: false,
      }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      className="TestimonialCarousel rounded-xl bg-zinc-100 xl:w-[1100px]"
    >
      {SHOW_SLIDES?.map((carousel, index) => (
        <SwiperSlide key={index} className="px-10 pt-22 pb-10">
          <div className="grid grid-cols-1 items-center gap-5 text-center md:text-left lg:grid-cols-[200px_1fr] lg:gap-10">
            <Image
              src={carousel.featuredImage.node.sourceUrl}
              alt={carousel.title}
              width={200}
              height={200}
              sizes="(max-width: 768px) 150px, 200px"
              loading="lazy"
              decoding="async"
              quality={60}
              className="mx-auto size-[200px] rounded-full object-cover md:m-auto"
            />

            <div className="flex flex-col space-y-2">
              <h2 className="mb-2 flex flex-col items-center gap-x-3 text-3xl font-bold lg:flex-row lg:items-end">
                {carousel.title}{" "}
                <span className="text-lg">
                  {carousel.excerpt.includes("BACARDÍ")
                    ? parseContent(carousel.excerpt)
                    : ""}
                </span>
              </h2>
              <div className="text-base [&>h6]:mb-4 [&>h6]:font-bold [&>h6]:text-zinc-500">
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

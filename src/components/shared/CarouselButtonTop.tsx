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
import { usePathname } from "next/navigation";

export const CarouselButtonTop = ({
  carousels,
}: {
  carousels: CarouselProps[];
}) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const showFirstSix = carousels.slice(0, 6);
  const showLastSix = carousels.slice(-6);
  const SHOW_SLIDES = isHome ? showFirstSix : showLastSix;

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation={true}
      modules={[Navigation, Autoplay]}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
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
              loading="lazy"
              decoding="async"
              quality={60}
              className="mx-auto size-[200px] rounded-full object-cover md:m-auto"
            />

            <div className="flex flex-col space-y-2">
              <h4 className="mb-2 flex flex-col items-center gap-x-3 text-3xl font-bold lg:flex-row lg:items-end">
                {carousel.title}{" "}
                <span className="text-lg">
                  {carousel.excerpt.includes("BACARDÍ")
                    ? parseContent(carousel.excerpt)
                    : ""}
                </span>
              </h4>
              <div className="text-base [&>h6]:mb-4 [&>h6]:font-bold [&>h6]:text-zinc-500">
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

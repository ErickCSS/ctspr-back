"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { CarouselProps } from "@/types/generalQuery.types";
import { Navigation } from "swiper/modules";
import { parseContent } from "@/utils/parseContent.utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const CarouselButtonTop = ({
  carousels,
}: {
  carousels: CarouselProps[];
}) => {
  const pathname = usePathname();
  const isEmpleo = pathname.includes("empleo");

  const styleImage = isEmpleo
    ? "size-[180px] rounded-full border-8 border-white object-cover object-center shadow-2xl"
    : "h-auto w-[170px] lg:w-full";

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation={true}
      modules={[Navigation]}
      className="TestimonialCarousel rounded-xl bg-zinc-100 xl:w-[1100px]"
    >
      {carousels?.map((carousel, index) => (
        <SwiperSlide key={index} className="px-10 pt-22 pb-10">
          <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[200px_1fr] lg:gap-10">
            <Image
              src={carousel.featuredImage.node.sourceUrl}
              alt={carousel.title}
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              quality={60}
              className={styleImage}
            />

            <div className="flex flex-col space-y-2">
              <h4 className="mb-2 flex flex-col items-start gap-x-3 text-3xl font-bold lg:flex-row lg:items-end">
                {carousel.title}{" "}
                <span className="text-lg">
                  {!isEmpleo && carousel.excerpt.includes("Casa Bacardí")
                    ? parseContent(carousel.excerpt)
                    : isEmpleo && carousel.excerpt
                      ? parseContent(carousel.excerpt)
                      : ""}
                </span>
              </h4>
              <div className="text-lg [&>h6]:mb-4 [&>h6]:font-bold [&>h6]:text-zinc-500">
                {parseContent(carousel.content, {
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

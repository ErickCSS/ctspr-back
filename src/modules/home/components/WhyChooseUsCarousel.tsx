"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { WhyChooseUsProps } from "@/modules/shared/types/generalQuery.types";
import { Navigation } from "swiper/modules";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";
import Image from "next/image";
import { toReversed } from "@/modules/shared/utils/toReversed";

export const WhyChooseUsCarousel = ({
  whyChooseUs,
}: {
  whyChooseUs: WhyChooseUsProps;
}) => {
  const whyChooseUsReversed = toReversed(whyChooseUs.posts.nodes);

  return (
    <Swiper
      spaceBetween={10}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1280: {
          slidesPerView: 5,
        },
      }}
      navigation={true}
      modules={[Navigation]}
      className="whyChooseUsCarousel h-[500px]"
    >
      {whyChooseUsReversed?.map((choose, index) => (
        <SwiperSlide
          key={index}
          className="bg-primaryColor h-full px-10 pt-22 pb-10"
        >
          <div className="flex flex-col items-center">
            <Image
              src={choose.featuredImage.node.sourceUrl}
              alt={choose.title}
              width={100}
              height={100}
              className="h-auto w-26 md:w-32"
              loading="lazy"
              decoding="async"
              quality={50}
            />

            <div className="mt-3 flex flex-col space-y-2">
              <div className="text-center text-5xl font-bold text-white xl:text-7xl">
                {choose.content && parseContent(choose.content)}
              </div>

              <h2
                className={`text-center text-white ${choose.title.includes("HISTORIAS DE ÉXITO") ? "text-base font-normal" : "text-3xl font-bold lg:text-2xl xl:text-3xl"}`}
              >
                {choose.title}
              </h2>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

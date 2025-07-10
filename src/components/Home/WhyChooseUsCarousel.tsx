"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { WhyChooseUsProps } from "@/types/generalQuery.types";
import { Navigation } from "swiper/modules";
import { parseContent } from "@/utils/parseContent.utils";
import Image from "next/image";
import { toReversed } from "@/utils/toReversed";

export const WhyChooseUsCarousel = ({
  whyChooseUs,
}: {
  whyChooseUs: WhyChooseUsProps;
}) => {
  const whyChooseUsReversed = toReversed(whyChooseUs.posts.nodes);

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={5}
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
              className="h-auto w-32"
              loading="lazy"
              decoding="async"
              quality={50}
            />

            <div className="mt-3 flex flex-col space-y-2">
              <div className="text-center text-7xl font-bold text-white">
                {choose.content && parseContent(choose.content)}
              </div>

              <h4
                className={`text-center text-white ${choose.title.includes("HISTORIAS DE ÉXITO") ? "text-base font-normal" : "text-3xl font-bold"}`}
              >
                {choose.title}
              </h4>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

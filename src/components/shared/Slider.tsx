"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import parse from "html-react-parser";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { SliderProps } from "@/types/hero.types";
import { Navigation, Autoplay } from "swiper/modules";
import { parsePhoneNumbers } from "@/utils/parseContent.utils";

export const SliderHero = ({ sliders }: { sliders: SliderProps[] }) => {
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
      className="SliderHero h-[250px] md:h-[700px]"
    >
      {sliders.map((slider, index) => (
        <SwiperSlide
          style={{
            backgroundImage: `url(${slider.featuredImage.node.sourceUrl})`,
          }}
          key={index}
          className="h-full bg-cover bg-[top_center] bg-no-repeat"
        >
          <div className="container mx-auto flex h-full items-center px-4">
            <div className="flex w-[500px] flex-col bg-black/60 p-5 md:p-10">
              <h2 className="mb-2 text-xl font-bold text-white md:text-4xl">
                {slider.title}
              </h2>
              <hr className="border-secondaryColor my-1 w-[250px] border outline-none md:my-3 md:w-[250px] md:border-2" />
              <div className="text-base text-white md:text-2xl">
                {parse(slider.excerpt)}
              </div>
              <div className="mt-3 [&>a]:text-xl md:[&>a]:text-4xl">
                {parsePhoneNumbers(slider.content)}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

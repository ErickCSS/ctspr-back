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
      className="SliderHero h-[700px]"
    >
      {sliders.map((slider, index) => (
        <SwiperSlide
          style={{
            backgroundImage: `url(${slider.featuredImage.node.sourceUrl})`,
          }}
          key={index}
          className="h-full bg-cover bg-center bg-no-repeat"
        >
          <div className="container mx-auto flex h-full items-center px-4">
            <div className="flex w-[500px] flex-col bg-black/60 p-10">
              <h2 className="mb-2 text-4xl font-bold text-white">
                {slider.title}
              </h2>
              <hr className="border-secondaryColor my-3 w-[250px] border-2 outline-none" />
              <div className="text-2xl text-white">{parse(slider.excerpt)}</div>
              <div className="mt-3">{parsePhoneNumbers(slider.content)}</div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

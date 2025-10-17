"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import parse from "html-react-parser";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { SliderProps } from "@modules/shared/types/hero.types";
import { Navigation, Autoplay } from "swiper/modules";
import { parsePhoneNumbers } from "@modules/shared/utils/parseContent.utils";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { useState } from "react";

export const SliderHero = ({ sliders }: { sliders: SliderProps[] }) => {
  const [muted, setMuted] = useState(true);

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation={true}
      modules={[Navigation, Autoplay]}
      loop={true}
      // autoplay={{
      //   delay: 5000,
      //   disableOnInteraction: false,
      // }}
      className="SliderHero h-[250px] md:h-[750px]"
    >
      {sliders.map((slider, index) => (
        <SwiperSlide
          key={index}
          className={`h-full ${
            slider.isVideo
              ? "flex items-center justify-center bg-black"
              : `bg-cover bg-[top_center] bg-no-repeat ${index === 2 ? "bg-center" : ""}`
          }`}
          style={
            !slider.isVideo
              ? {
                  backgroundImage: `url(${slider.featuredImage.node.sourceUrl})`,
                }
              : undefined
          }
        >
          {slider.isVideo && slider.routeVideo ? (
            // Slide con video de YouTube como fondo
            <div className="relative h-full w-full">
              {/* Video de fondo */}
              <div className="absolute inset-0 h-full w-full">
                <video
                  autoPlay
                  loop
                  muted={muted}
                  playsInline
                  controls={false}
                  preload="metadata"
                  poster="/images/fallback-video.webp"
                  className="h-full w-full object-cover xl:h-[810px] xl:object-fill"
                >
                  <source src={`${slider.routeVideo}.webm`} type="video/webm" />
                  <source src={`${slider.routeVideo}.mp4`} type="video/mp4" />
                </video>
              </div>

              {/* Muted Button */}
              <div className="group absolute top-4 right-4 z-10 flex cursor-pointer items-center gap-2">
                {/* Call to action - solo visible cuando está muted */}
                {muted && (
                  <div
                    onClick={() => setMuted(!muted)}
                    className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm text-black opacity-50 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
                  >
                    <span>Activa el audio para una mejor experiencia</span>
                  </div>
                )}

                <button
                  onClick={() => setMuted(!muted)}
                  className="cursor-pointer rounded-full bg-white p-2 shadow-md transition-opacity duration-300 group-hover:opacity-100 md:opacity-50 md:hover:opacity-100"
                >
                  {muted ? (
                    <IconVolumeOff stroke={1.5} />
                  ) : (
                    <IconVolume stroke={1.5} />
                  )}
                </button>
              </div>

              {/* Overlay oscuro para legibilidad del texto */}
              {/* <div className="absolute inset-0 bg-black/40"></div> */}

              {/* Contenido sobre el video */}
              {/* <div className="relative z-10 container mx-auto flex h-full items-center px-4">
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
              </div> */}
            </div>
          ) : (
            // Slide con imagen (comportamiento original)
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
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

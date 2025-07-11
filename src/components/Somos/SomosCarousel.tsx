"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { AfiliadosProps } from "@/types/generalQuery.types";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

export const SomosCarousel = ({ afiliados }: { afiliados: AfiliadosProps }) => {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        loop={true}
        className="SucursalCarousel mt-14 max-w-7xl [&>.swiper-wrapper]:items-center"
      >
        {afiliados.posts.nodes.reverse().map((afiliado, index) => (
          <SwiperSlide key={index}>
            <Image
              src={afiliado.featuredImage.node.sourceUrl}
              alt={afiliado.title}
              width={100}
              height={100}
              className="h-auto w-42"
              loading="lazy"
              decoding="async"
              quality={50}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

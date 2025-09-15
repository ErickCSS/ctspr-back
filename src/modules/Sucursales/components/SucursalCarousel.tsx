"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { SucursalesProps } from "@/modules/shared/types/generalQuery.types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import Image from "next/image";
import {
  parseContent,
  parsePhoneNumbers,
} from "@/modules/shared/utils/parseContent.utils";
import Link from "next/link";
import { IconBrandFacebookFilled } from "@tabler/icons-react";
import { toReversed } from "@/modules/shared/utils/toReversed";

export const SucursalCarousel = ({
  sucursales,
}: {
  sucursales: SucursalesProps;
}) => {
  const sucursalesReverse = toReversed(sucursales.posts.nodes);

  return (
    <>
      <Swiper
        slidesPerView={3}
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
        }}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="SucursalCarousel mt-20"
      >
        {sucursalesReverse.map((sucursal, index) => (
          <SwiperSlide key={index} className="w-2xs">
            <article className="flex flex-col justify-center bg-white p-10">
              <Image
                src={sucursal.featuredImage.node.sourceUrl}
                alt={sucursal.title}
                width={500}
                height={500}
                className={`h-[250px] w-full object-cover ${sucursal.title === "Salinas" ? "object-left" : "object-center"}`}
              />
              <div className="mt-5">
                <h3 className="text-secondaryColor text-3xl font-bold">
                  {sucursal.title}
                </h3>
                <div className="mt-1 text-lg text-black">
                  {parseContent(sucursal.excerpt)}
                </div>
                <div className="mt-1 flex flex-col gap-y-1">
                  {parsePhoneNumbers(sucursal.content, {
                    className: "text-black text-xl font-black",
                  })}
                </div>

                <Link
                  className="mt-3 flex w-fit items-center gap-x-2 bg-[#1877F2] p-2"
                  href={
                    sucursal.title === "Salinas"
                      ? `https://www.facebook.com/ctssucursallaspiedras`
                      : `https://www.facebook.com/ctssucursal${sucursal.title
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/\s+/g, "")}`
                  }
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <div className="flex size-7 items-center justify-center bg-white">
                    <IconBrandFacebookFilled
                      className="text-[#1877F2]"
                      stroke={1.5}
                    />
                  </div>
                  <span className="text-white">Síguenos en Facebook</span>
                </Link>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

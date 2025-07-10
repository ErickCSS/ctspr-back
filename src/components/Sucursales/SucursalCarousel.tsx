"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { SucursalesProps } from "@/types/generalQuery.types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { parseContent, parsePhoneNumbers } from "@/utils/parseContent.utils";
import Link from "next/link";
import { IconBrandFacebookFilled } from "@tabler/icons-react";

export const SucursalCarousel = ({
  sucursales,
}: {
  sucursales: SucursalesProps;
}) => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="SucursalCarousel mt-20"
      >
        {sucursales.posts.nodes.reverse().map((sucursal, index) => (
          <SwiperSlide key={index} className="w-2xs">
            <article className="flex flex-col justify-center bg-white p-10">
              <Image
                src={sucursal.featuredImage.node.sourceUrl}
                alt={sucursal.title}
                width={500}
                height={500}
                className="h-[250px] w-full object-cover object-center"
              />
              <div className="mt-5">
                <h2 className="text-secondaryColor text-3xl font-bold">
                  {sucursal.title}
                </h2>
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
                      ? `https://www.facebook.com/CTSEmpleos`
                      : `https://www.facebook.com/ctssucursal${sucursal.title.toLowerCase().replace(" ", "")}`
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

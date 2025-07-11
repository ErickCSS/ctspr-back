import Link from "next/link";
import Image from "next/image";
import { Social } from "../shared/Social";

import { WpQuery } from "@/services/wpQuery";

import { parseContent, parsePhoneNumbers } from "@/utils/parseContent.utils";
import { MediaProps, SucursalesProps } from "@/types/generalQuery.types";
import { queryMedia, querySucursales } from "@/const/general.query";
import { IconBrandFacebookFilled } from "@tabler/icons-react";

export const Footer = async () => {
  const logo: MediaProps = await WpQuery({
    query: queryMedia({ title: "cts-white-brand" }),
  });

  const superpages: MediaProps = await WpQuery({
    query: queryMedia({ title: "superpages" }),
  });
  const axesa: MediaProps = await WpQuery({
    query: queryMedia({ title: "axesa" }),
  });

  const sucursales: SucursalesProps = await WpQuery({
    query: querySucursales,
  });

  return (
    <>
      <footer className="bg-[#1a2256] px-4 py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 items-center gap-x-5 md:grid-cols-2 lg:grid-cols-3">
            <Image
              src={logo.mediaItems.nodes[0].link}
              alt="logo"
              width={250}
              height={250}
              className="h-auto w-[150px] lg:w-[450px]"
              loading="lazy"
              decoding="async"
            />

            <div className="space-y-3">
              <p className="text-sm text-white md:text-base lg:text-lg">
                Caribbean Temporary Services, LLC. (CTS), es una Agencia de
                Empleos local establecida en 1983 con la misión de proveer
                amplias oportunidades de empleo.
              </p>
              <p className="text-sm text-white md:text-base lg:text-lg">
                Patrono con Igualdad de Oportunidades en el Empleo.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <Social className="size-10" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] space-y-5">
            {sucursales.posts.nodes.reverse().map((sucursal) => (
              <article key={sucursal.id}>
                <h5 className="text-secondaryColor mb-1 text-xl font-bold">
                  {sucursal.title}
                </h5>
                <div className="text-white">
                  {parseContent(sucursal.excerpt)}
                </div>
                <div className="mt-1 flex flex-col">
                  {parsePhoneNumbers(sucursal.content, {
                    className: "text-lg text-white font-bold",
                  })}
                </div>
                <Link
                  className="mt-3 flex items-center gap-x-2 text-white"
                  href={
                    sucursal.title === "Salinas"
                      ? `https://www.facebook.com/CTSEmpleos`
                      : `https://www.facebook.com/ctssucursal${sucursal.title.toLowerCase().replace(" ", "")}`
                  }
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <div className="flex size-7 items-center justify-center bg-white">
                    <IconBrandFacebookFilled className="text-primaryColor" />
                  </div>
                  <span>Síguenos en Facebook</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </footer>

      <div className="bg-[#3d3d3d] px-4 py-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link
              href="https://superpagespr.com/es/business/search/puerto-rico/n/caribbean-temporary-services"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Image
                src={superpages.mediaItems.nodes[0].link}
                alt="superpages"
                width={200}
                height={200}
                className="h-auto w-[190px]"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <Link
              href="https://axesa.com/"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Image
                src={axesa.mediaItems.nodes[0].link}
                alt="axesa"
                width={100}
                height={100}
                className="h-auto w-[120px]"
                loading="lazy"
                decoding="async"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

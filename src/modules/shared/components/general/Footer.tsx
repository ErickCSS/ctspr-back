import Link from "next/link";
import Image from "next/image";
import { Social } from "@modules/shared/components/Social";

import { WpQuery } from "@/modules/shared/services/wpQuery";

import {
  parseContent,
  parsePhoneNumbers,
} from "@/modules/shared/utils/parseContent.utils";
import {
  MediaProps,
  SucursalesProps,
} from "@/modules/shared/types/generalQuery.types";
import {
  queryMedia,
  querySucursales,
} from "@/modules/shared/graphql/general.query";
import { IconBrandFacebookFilled } from "@tabler/icons-react";
import { getLocale, getTranslations } from "next-intl/server";

export const Footer = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";

  const logo: MediaProps = await WpQuery({
    query: queryMedia({ title: "logo-ctspr-whitecolor" }),
  });

  const superpages: MediaProps = await WpQuery({
    query: queryMedia({ title: "superpages" }),
  });
  const axesa: MediaProps = await WpQuery({
    query: queryMedia({ title: "axesa" }),
  });

  const sucursales: SucursalesProps = await WpQuery({
    query: querySucursales,
    variables: {
      category: isEnglish ? "sucursales-en" : "sucursales",
    },
  });

  const t = await getTranslations("footer");

  return (
    <>
      <footer className="bg-[#1a2256] px-4 py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 items-center gap-x-5 md:grid-cols-2 lg:grid-cols-3">
            <Image
              src={logo.mediaItems.nodes[0].link}
              alt="logo"
              width={450}
              height={450}
              sizes="(max-width: 1024px) 280px, 450px"
              className="h-auto w-[280px] lg:w-[450px]"
              loading="lazy"
              decoding="async"
              quality={80}
            />

            <div className="space-y-3">
              <p className="text-sm text-white md:text-base lg:text-lg">
                {t("description")}
              </p>
              <p className="text-sm text-white md:text-base lg:text-lg">
                {t("EqualOpportunity")}
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <Social className="size-10" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] space-y-5">
            {sucursales.posts.nodes.reverse().map((sucursal) => (
              <article key={sucursal.id}>
                <h2 className="text-secondaryColor mb-1 text-xl font-bold">
                  {sucursal.title}
                </h2>
                <div className="text-balance text-white">
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
                    <IconBrandFacebookFilled className="text-primaryColor" />
                  </div>
                  <span>{t("FollowUs")}</span>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-y-4">
            <h2 className="font-lato text-xl font-bold text-white">
              {t("documents")}
            </h2>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="https://blog.ctspr.com/wp-content/uploads/2025/09/normativa-cliente-spanish.pdf"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="font-lato border-secondaryColor border-l-4 pl-2 text-base font-normal text-white"
              >
                {t("normativeClient")}
              </Link>
              <Link
                href="https://blog.ctspr.com/wp-content/uploads/2025/09/normativa-cliente-english.pdf"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="font-lato border-secondaryColor border-l-4 pl-2 text-base font-normal text-white"
              >
                {t("normativeClientEnglish")}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ==== Copyright ==== */}
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
                sizes="190px"
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
                sizes="120px"
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

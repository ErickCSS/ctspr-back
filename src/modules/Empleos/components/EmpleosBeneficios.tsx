import { WpQuery } from "@/modules/shared/services/wpQuery";
import {
  EmpleosBeneficiosProps,
  BeneficiosUneteProps,
} from "@/modules/shared/types/generalQuery.types";
import {
  queryEmpleosBeneficios,
  queryBeneficiosUnete,
} from "@/modules/shared/graphql/general.query";
import Image from "next/image";
import { parseWithIcons } from "@/modules/shared/utils/ParseWithIcon.utils";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";
import { getLocale } from "next-intl/server";
import { cn } from "@/modules/shared/lib/utils";

export const EmpleosBeneficios = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";

  const empleosBeneficios: EmpleosBeneficiosProps = await WpQuery({
    query: queryEmpleosBeneficios,
    variables: {
      category: isEnglish ? "empleos-en" : "empleos",
      in: isEnglish ? "cG9zdDoxMTE2" : "cG9zdDoyMjU=",
    },
  });

  const beneficiosUnete: BeneficiosUneteProps = await WpQuery({
    query: queryBeneficiosUnete,
    variables: {
      category: isEnglish ? "unete-en" : "unete",
    },
  });

  const title = empleosBeneficios.posts.nodes[0].title;
  const content = empleosBeneficios.posts.nodes[0].content;
  const featuredImage =
    empleosBeneficios.posts.nodes[0].featuredImage.node.sourceUrl;

  const titleUnete = beneficiosUnete.posts.nodes[0].title;
  const contentUnete = beneficiosUnete.posts.nodes[0].content;
  const excerptUnete = beneficiosUnete.posts.nodes[0].excerpt;

  return (
    <section className="gradientCTS relative overflow-hidden px-4 py-28">
      <div className="container mx-auto">
        <div className="flex h-full min-h-[1600px] lg:min-h-auto">
          <div className="w-full lg:w-1/2">
            <h2 className="mb-10 text-center text-5xl font-black text-black lg:text-left lg:text-7xl">
              {title}
            </h2>
            <div className="flex flex-col gap-y-10 text-lg text-black md:text-xl xl:text-2xl">
              {parseWithIcons(content, "text-secondaryColor size-10")}
            </div>

            <div
              className={cn(
                "flex flex-col justify-center gap-y-5",
                isEnglish ? "mt-7" : "",
              )}
            >
              <h3 className="text-center text-5xl font-black text-black lg:text-7xl">
                {titleUnete}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-2 lg:items-start">
                <div className="text-center text-2xl text-black md:text-4xl">
                  {parseContent(excerptUnete)}
                </div>
                <div className="text-black">
                  {parseContent(contentUnete, {
                    configs: { phone: { className: "font-black text-5xl" } },
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-8 bottom-0 xl:right-20">
            <Image
              src={featuredImage}
              alt={title}
              width={400}
              height={1000}
              loading="lazy"
              decoding="async"
              quality={100}
              className="h-full w-[700px] lg:w-[500px] xl:w-[700px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

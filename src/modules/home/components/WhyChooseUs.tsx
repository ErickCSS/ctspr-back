import { WhyChooseUsProps } from "@/modules/shared/types/generalQuery.types";
import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryWhyChooseUs } from "@/modules/shared/graphql/general.query";
import { toReversed } from "@/modules/shared/utils/toReversed";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import CounterAnimation from "./CounterAnimation";

const extractNumberFromHTML = (htmlContent: string): number => {
  const textContent = htmlContent.replace(/<[^>]*>/g, "");

  const matches = textContent.match(/\d+/);
  const number = matches ? parseInt(matches[0], 10) : 0;

  return number;
};

export const WhyChooseUs = async () => {
  const locale = await getLocale();

  const whyChooseUs: WhyChooseUsProps = await WpQuery({
    query: queryWhyChooseUs,
    variables: {
      category: `porque-elegirnos-${locale}`,
    },
  });

  const whyChooseUsReversed = toReversed(whyChooseUs.posts.nodes);

  return (
    <section className="bg-accentColor w-full">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {whyChooseUsReversed?.map((choose, index) => {
          const formattedValue = choose.content
            ? extractNumberFromHTML(choose.content)
            : 0;

          return (
            <div
              key={index}
              className="bg-primaryColor h-full px-10 pt-22 pb-10"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={choose.featuredImage.node.sourceUrl}
                  alt={choose.title}
                  width={100}
                  height={100}
                  sizes="(max-width: 768px) 104px, 128px"
                  className="h-auto w-26 md:w-32"
                  loading="lazy"
                  decoding="async"
                  quality={50}
                />

                <div className="mt-3 flex flex-col space-y-2">
                  <div className="flex items-center justify-center gap-x-1 text-5xl font-bold text-white xl:text-7xl">
                    <CounterAnimation value={formattedValue} />
                  </div>

                  <h2
                    className={`text-center text-xl font-bold text-white lg:text-2xl xl:text-3xl`}
                  >
                    {choose.title}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

import { WhyChooseUsProps } from "@/types/generalQuery.types";
import { WpQuery } from "@/services/wpQuery";
import { queryWhyChooseUs } from "@/graphql/general.query";
import { toReversed } from "@/utils/toReversed";
import Image from "next/image";

import CounterAnimation from "./CounterAnimation";

const extractNumberFromHTML = (htmlContent: string): number => {
  const textContent = htmlContent.replace(/<[^>]*>/g, "");

  const matches = textContent.match(/\d+/);
  return matches ? parseInt(matches[0], 10) : 0;
};

export const WhyChooseUs = async () => {
  const whyChooseUs: WhyChooseUsProps = await WpQuery({
    query: queryWhyChooseUs,
  });

  const whyChooseUsReversed = toReversed(whyChooseUs.posts.nodes);

  return (
    <section className="bg-accentColor w-full">
      <div className="grid grid-cols-4 gap-3">
        {whyChooseUsReversed?.map((choose, index) => {
          const numericValue = choose.content
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
                  className="h-auto w-26 md:w-32"
                  loading="lazy"
                  decoding="async"
                  quality={50}
                />

                <div className="mt-3 flex flex-col space-y-2">
                  <div className="flex items-center justify-center gap-x-1 text-5xl font-bold text-white xl:text-7xl">
                    <CounterAnimation value={numericValue} />
                  </div>

                  <h4
                    className={`text-center text-3xl font-bold text-white lg:text-2xl xl:text-3xl`}
                  >
                    {choose.title}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

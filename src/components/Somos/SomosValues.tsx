import Image from "next/image";

import { WpQuery } from "@/services/wpQuery";

import { toReversed } from "@/utils/toReversed";
import { parseContent } from "@/utils/parseContent.utils";

import { ValuesProps, titleValues } from "@/types/generalQuery.types";
import { queryTitleValues, queryValues } from "@/graphql/general.query";

export const SomosValues = async () => {
  const values: ValuesProps = await WpQuery({
    query: queryValues,
  });

  const titleValues: titleValues = await WpQuery({
    query: queryTitleValues,
  });

  const title = titleValues.posts.nodes[0].title;
  const content = titleValues.posts.nodes[0].content;
  const valuesList = toReversed(values.posts.nodes);

  return (
    <section className="gradientCTS px-4 py-32">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-y-5 text-white">
          <h2 className="text-center text-5xl font-bold uppercase">{title}</h2>
          <p className="text-center text-2xl">{parseContent(content)}</p>
        </div>

        <div className="mx-auto mt-22 max-w-7xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
            {valuesList.map((value) => (
              <article
                key={value.id}
                className="flex flex-col items-center gap-y-5"
              >
                <h4 className="text-center text-2xl font-bold text-balance text-white">
                  {value.title}
                </h4>
                <Image
                  src={value.featuredImage.node.sourceUrl}
                  alt={value.title}
                  width={500}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  quality={50}
                  className="h-auto w-32"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

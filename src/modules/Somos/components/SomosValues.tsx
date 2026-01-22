import Image from "next/image";

import { WpQuery } from "@/modules/shared/services/wpQuery";

import { toReversed } from "@/modules/shared/utils/toReversed";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";

import {
  ValuesProps,
  titleValues,
} from "@/modules/shared/types/generalQuery.types";
import {
  queryTitleValues,
  queryValues,
} from "@/modules/shared/graphql/general.query";

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
        <div className="flex flex-col items-center gap-y-5 text-black">
          <h2 className="text-center text-5xl font-bold uppercase">{title}</h2>
          <div className="text-center text-2xl">
            {content && parseContent(content)}
          </div>
        </div>

        <div className="mx-auto mt-22 max-w-7xl">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-14">
            {valuesList.map((value) => (
              <article
                key={value.id}
                className="flex w-[250px] flex-col items-center gap-y-5"
              >
                <h4 className="text-center text-2xl font-bold text-balance text-black">
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

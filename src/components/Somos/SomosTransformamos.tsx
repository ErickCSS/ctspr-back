import { WpQuery } from "@/services/wpQuery";
import { querySomosTransformamos } from "@/graphql/general.query";
import { SomosTransformamosProps } from "@/types/generalQuery.types";
import { parseContent } from "@/utils/parseContent.utils";
import Image from "next/image";

export const SomosTransformamos = async () => {
  const somosTransformamos: SomosTransformamosProps = await WpQuery({
    query: querySomosTransformamos,
  });

  const title = somosTransformamos.posts.nodes[0].title;
  const content = somosTransformamos.posts.nodes[0].content;
  const excerpt = somosTransformamos.posts.nodes[0].excerpt;
  const featuredImage =
    somosTransformamos.posts.nodes[0].featuredImage.node.sourceUrl;

  return (
    <section className="bg-white px-4 py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 overflow-hidden rounded-xl bg-zinc-100 lg:grid-cols-[550px_1fr]">
          <Image
            src={featuredImage}
            alt={title}
            width={400}
            height={400}
            className="h-full w-full object-cover object-center"
          />

          <div className="flex flex-col items-center justify-center gap-5 p-8 lg:p-14">
            <h2 className="text-3xl font-bold text-balance lg:text-4xl xl:text-5xl">
              {title}
            </h2>

            <div className="mt-10 w-full">
              <div className="[&_h6]:text-secondaryColor/60 w-full space-y-10 [&_h6]:text-5xl [&_h6]:font-black [&_p]:text-lg [&_p]:text-balance xl:[&_p]:text-2xl [&>div_div]:flex [&>div_div]:flex-col [&>div_div]:gap-x-5 lg:[&>div_div]:flex-row lg:[&>div_div]:items-center">
                {parseContent(content)}
              </div>
            </div>
          </div>
        </div>

        <video className="mx-auto mt-16" autoPlay loop muted>
          <source src="/videos/text-animado-cts.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

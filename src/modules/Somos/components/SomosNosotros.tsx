import { WpQuery } from "@/modules/shared/services/wpQuery";
import { SomosNosotrosProps } from "@/modules/shared/types/generalQuery.types";
import { querySomosNosotros } from "@/modules/shared/graphql/general.query";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";
import { SomosConoceSucursal } from "./SomosConoceSucursal";
import { getLocale } from "next-intl/server";

export const SomosNosotros = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";

  const somosNosotros: SomosNosotrosProps = await WpQuery({
    query: querySomosNosotros,
    variables: {
      category: isEnglish ? `somos-en` : `somos`,
    },
  });

  const title = somosNosotros.posts.nodes[0].title;
  const content = somosNosotros.posts.nodes[0].content;

  return (
    <section className="bg-white px-4 py-20 lg:py-32">
      <div className="container mx-auto">
        <div className="space-y-10 text-center">
          <h2 className="text-3xl font-bold text-balance lg:text-5xl">
            {title}
          </h2>
          <hr className="border-secondaryColor mx-auto my-3 w-[120px] border-2 outline-none" />
        </div>

        <div className="mx-auto mt-20 max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_400px]">
            <div className="space-y-20 lg:w-[600px] lg:text-left [&_h3]:mb-3 [&_h3]:text-4xl [&_h3]:font-bold [&_h3]:uppercase [&_p]:text-justify [&_p]:text-lg">
              {parseContent(content)}
            </div>

            <SomosConoceSucursal />
          </div>
        </div>
      </div>
    </section>
  );
};

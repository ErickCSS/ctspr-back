import { SomosCarousel } from "./SomosCarousel";
import {
  AfiliadosProps,
  AfiliadosTitle,
} from "@/modules/shared/types/generalQuery.types";
import { WpQuery } from "@/modules/shared/services/wpQuery";
import {
  queryAfiliados,
  queryTitle,
} from "@/modules/shared/graphql/general.query";
import { getLocale } from "next-intl/server";

export const SomosAfiliaciones = async ({
  background,
}: {
  background: string;
}) => {
  const locale = await getLocale();
  const isEnglish = locale === "en";

  const afiliados: AfiliadosProps = await WpQuery({
    query: queryAfiliados,
    variables: {
      category: isEnglish ? "afiliaciones-en" : "afiliaciones",
      notIn: isEnglish ? "cG9zdDo5ODk=" : "cG9zdDoxMjQ=",
    },
  });

  const title: AfiliadosTitle = await WpQuery({
    query: queryTitle,
    variables: {
      category: isEnglish ? "afiliaciones-en" : "afiliaciones",
      in: isEnglish ? "cG9zdDo5ODk=" : "cG9zdDoxMjQ=",
    },
  });

  return (
    <section className={`${background} px-4 py-26 lg:py-32`}>
      <div className="flex flex-col items-center gap-y-5">
        <h2 className="text-center text-4xl font-bold lg:text-5xl">
          {title.posts.nodes[0]?.title}
        </h2>
        <hr className="border-secondaryColor mx-auto my-3 w-[120px] border-2 outline-none" />
      </div>
      <SomosCarousel afiliados={afiliados} />
    </section>
  );
};

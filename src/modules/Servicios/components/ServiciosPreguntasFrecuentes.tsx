import { AccordionComponent } from "@/modules/shared/components/AccordionComponent";
import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryPreguntasFrecuentesEmpresas } from "@/modules/shared/graphql/general.query";
import { PreguntasFrecuentesProps } from "@/modules/shared/types/generalQuery.types";
import { toReversed } from "@/modules/shared/utils/toReversed";
import { getTranslations, getLocale } from "next-intl/server";

export const ServiciosPreguntasFrecuentes = async () => {
  const t = await getTranslations("FrequentlyAskedQuestions");
  const locale = await getLocale();
  const isEnglish = locale === "en";
  const preguntasFrecuentes: PreguntasFrecuentesProps = await WpQuery({
    query: queryPreguntasFrecuentesEmpresas,
    variables: {
      category: isEnglish
        ? "preguntas-frecuentes-empresas-en"
        : "preguntas-frecuentes-empresas",
    },
  });

  const preguntasFrecuentesReverse = toReversed(
    preguntasFrecuentes.posts.nodes,
  );

  return (
    <section className="bg-zinc-100 px-4 py-28">
      <div className="mx-auto w-full lg:max-w-4xl xl:max-w-6xl">
        <div className="flex flex-col gap-y-7">
          <h2 className="text-center text-4xl font-bold text-balance text-black lg:text-5xl">
            {t("title")}
          </h2>
          <hr className="border-secondaryColor mx-auto my-3 w-[120px] border-2 outline-none" />
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <AccordionComponent contentAccordion={preguntasFrecuentesReverse} />
        </div>
      </div>
    </section>
  );
};

import { AccordionComponent } from "@components/shared/AccordionComponent";
import { WpQuery } from "@/services/wpQuery";
import { PreguntasFrecuentesProps } from "@/types/generalQuery.types";
import { queryPreguntasFrecuentesCandidatos } from "@/graphql/general.query";

export const EmpleoPreguntaFrecuentes = async () => {
  const preguntasFrecuentesCandidatos: PreguntasFrecuentesProps = await WpQuery(
    {
      query: queryPreguntasFrecuentesCandidatos,
    },
  );

  return (
    <section className="bg-zinc-100 px-4 py-28">
      <div className="mx-auto w-full lg:max-w-4xl xl:max-w-6xl">
        <div className="flex flex-col gap-y-7">
          <h2 className="text-center text-4xl font-bold text-balance text-black lg:text-5xl">
            Preguntas Frecuentes para Candidatos
          </h2>
          <hr className="border-secondaryColor mx-auto my-3 w-[120px] border-2 outline-none" />
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <AccordionComponent
            contentAccordion={preguntasFrecuentesCandidatos.posts.nodes}
          />
        </div>
      </div>
    </section>
  );
};

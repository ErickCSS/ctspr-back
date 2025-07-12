import { AccordionComponent } from "@components/shared/AccordionComponent";

export const EmpleoPreguntaFrecuentes = async () => {
  const PREGUNTAS_MOCK = [
    {
      title: "Prueba de Accordion 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent massa nisi, aliquam ut laoreet sit amet, laoreet non diam. Phasellus vehicula, risus eu dapibus pellentesque, sem lorem pellentesque urna, quis vulputate ligula velit at lectus. In eget nulla ipsum. Nulla facilisi. Nulla facilisi. In tempus consequat magna vitae vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut mattis metus.",
    },
    {
      title: "Prueba de Accordion 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent massa nisi, aliquam ut laoreet sit amet, laoreet non diam. Phasellus vehicula, risus eu dapibus pellentesque, sem lorem pellentesque urna, quis vulputate ligula velit at lectus. In eget nulla ipsum. Nulla facilisi. Nulla facilisi. In tempus consequat magna vitae vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut mattis metus.",
    },
    {
      title: "Prueba de Accordion 3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent massa nisi, aliquam ut laoreet sit amet, laoreet non diam. Phasellus vehicula, risus eu dapibus pellentesque, sem lorem pellentesque urna, quis vulputate ligula velit at lectus. In eget nulla ipsum. Nulla facilisi. Nulla facilisi. In tempus consequat magna vitae vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut mattis metus.",
    },
  ];

  return (
    <section className="bg-zinc-100 px-4 py-28">
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-7">
          <h2 className="text-center text-4xl font-bold text-balance text-black lg:text-5xl">
            Preguntas Frecuentes para Candidatos
          </h2>
          <hr className="border-secondaryColor mx-auto my-3 w-[120px] border-2 outline-none" />
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <AccordionComponent contentAccordion={PREGUNTAS_MOCK} />
        </div>
      </div>
    </section>
  );
};

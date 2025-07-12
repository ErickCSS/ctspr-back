import { WpQuery } from "@/services/wpQuery";
import { queryServiciosPeritajeIndustrias } from "@/graphql/general.query";
import { ServiciosPeritajeIndustriasProps } from "@/types/generalQuery.types";
import { parseWithIcons } from "@/utils/ParseWithIcon.utils";

export const ServiciosPeritajeIndustrias = async () => {
  const serviciosPeritajeIndustrias: ServiciosPeritajeIndustriasProps =
    await WpQuery({
      query: queryServiciosPeritajeIndustrias,
    });

  const title = serviciosPeritajeIndustrias.posts.nodes[0].title;
  const content = serviciosPeritajeIndustrias.posts.nodes[0].content;
  const featuredImage =
    serviciosPeritajeIndustrias.posts.nodes[0].featuredImage.node.sourceUrl;

  return (
    <section
      className="flex min-h-[700px] flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-20"
      style={{ backgroundImage: `url(${featuredImage})` }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-10">
          <h2 className="text-center text-5xl font-bold text-white">{title}</h2>
          <hr className="border-secondaryColor mx-auto w-[120px] border-2" />
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="columns-1 space-y-4 text-2xl text-white md:columns-2 lg:columns-3">
            {parseWithIcons(content, "text-secondaryColor size-8")}
          </div>
        </div>
      </div>
    </section>
  );
};

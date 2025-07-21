import { WpQuery } from "@/services/wpQuery";
import { ServiciosProps } from "@/types/generalQuery.types";
import { queryServiciosContent } from "@/graphql/general.query";
import { parseContent } from "@/utils/parseContent.utils";

export const ServiciosContent = async () => {
  const servicios: ServiciosProps = await WpQuery({
    query: queryServiciosContent,
  });

  const content = servicios.posts.nodes[0].content;

  return (
    <section className="bg-white px-4 py-20 lg:py-28">
      <div className="container mx-auto space-y-5">
        <div className="mx-auto w-full max-w-5xl space-y-3 text-xl font-normal text-black lg:text-left [&>p]:text-justify">
          {parseContent(content)}
        </div>
      </div>
    </section>
  );
};

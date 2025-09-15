import { WpQuery } from "@/modules/shared/services/wpQuery";
import { AboutProps } from "@/modules/shared/types/generalQuery.types";
import { queryAbout } from "@/modules/shared/graphql/general.query";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";

export const About = async () => {
  const about: AboutProps = await WpQuery({
    query: queryAbout,
  });

  return (
    <section className="bg-white px-4 py-20">
      <div className="container mx-auto space-y-5">
        <h1 className="text-center text-2xl font-bold text-black lg:text-4xl">
          {about.posts.nodes[0].title}
        </h1>
        <h2 className="text-center text-2xl font-bold text-black lg:text-4xl">
          {parseContent(about.posts.nodes[0].content)}
        </h2>
      </div>
    </section>
  );
};

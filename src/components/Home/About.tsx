import { WpQuery } from "@/services/wpQuery";
import { AboutProps } from "@/types/generalQuery.types";
import { queryAbout } from "@/graphql/general.query";
import { parseContent } from "@/utils/parseContent.utils";

export const About = async () => {
  const about: AboutProps = await WpQuery({
    query: queryAbout,
  });

  return (
    <section className="bg-white px-4 py-20">
      <div className="container mx-auto space-y-5">
        <h1 className="text-center text-4xl font-bold text-black">
          {about.posts.nodes[0].title}
        </h1>
        <h2 className="text-center text-4xl font-bold text-black">
          {parseContent(about.posts.nodes[0].content)}
        </h2>
      </div>
    </section>
  );
};

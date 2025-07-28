import { WpQuery } from "@/services/wpQuery";
import { queryBlogObjetives } from "@/graphql/general.query";
import { BlogObjetivesProps } from "@/types/generalQuery.types";
import { parseContent } from "@/utils/parseContent.utils";
import { Button } from "@components/ui/button";
import { Link } from "next-view-transitions";
import { IconCaretRightFilled } from "@tabler/icons-react";
import { YouTubeEmbed } from "@next/third-parties/google";

export const BlogObjetives = async () => {
  const blogObjetives: BlogObjetivesProps = await WpQuery({
    query: queryBlogObjetives,
  });

  const title = blogObjetives.posts.nodes[0].title;
  const content = blogObjetives.posts.nodes[0].content;

  return (
    <section className="gradientCTS px-4 py-28">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-5 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <YouTubeEmbed videoid="27mJNeFXUcE" />
          </div>
          <div className="w-full space-y-10 lg:w-1/2">
            <h2 className="text-4xl font-black text-balance text-black lg:text-left">
              {title}
            </h2>
            <div className="flex flex-col">
              {parseContent(content, {
                configs: {
                  phone: {
                    className: "text-black text-4xl mt-2 font-normal",
                  },
                  email: {
                    className: "text-black text-4xl mt-2 font-normal",
                  },
                },
              })}
            </div>

            <Button
              asChild
              className="bg-secondaryColor h-18 !pr-6 !pl-10 text-xl font-black uppercase transition-colors duration-300 hover:bg-pink-700 lg:text-2xl"
            >
              <Link href="/contacto" className="flex items-center gap-x-5">
                <span>Contáctanos</span>{" "}
                <IconCaretRightFilled size={32} className="size-[32px]" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryBlogObjetives } from "@/modules/shared/graphql/general.query";
import { BlogObjetivesProps } from "@/modules/shared/types/generalQuery.types";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";
import { Button } from "@modules/ui/button";
import { Link } from "next-view-transitions";
import { IconCaretRightFilled } from "@tabler/icons-react";
import { YouTubeEmbed } from "@next/third-parties/google";
import { getLocale } from "next-intl/server";

export const BlogObjetives = async () => {
  const locale = await getLocale();
  const isEnglish = locale === "en";
  const blogObjetives: BlogObjetivesProps = await WpQuery({
    query: queryBlogObjetives,
    variables: {
      category: isEnglish ? "blog-page-en" : "blog-page",
    },
  });

  const title = blogObjetives.posts.nodes[0].title;
  const content = blogObjetives.posts.nodes[0].content;

  return (
    <section className="gradientCTS px-4 py-28">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-5 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <YouTubeEmbed videoid="mefstEAwJDU" height={315} />
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
              <Link
                href={`/${locale}/contacto`}
                className="flex items-center gap-x-5"
              >
                <span>{isEnglish ? "Contact us" : "Contáctanos"}</span>{" "}
                <IconCaretRightFilled size={32} className="size-[32px]" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

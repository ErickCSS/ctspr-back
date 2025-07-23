import { BlogProps } from "@/types/blog.types";
import { WpQuery } from "@/services/wpQuery";
import { queryBlog } from "@/graphql/general.query";
import { parseContent } from "@/utils/parseContent.utils";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const blog: BlogProps = await WpQuery({
    query: queryBlog,
  });

  const post = blog.posts.nodes.find((post) => post.slug === id);

  return (
    <>
      <section
        style={{
          backgroundImage: `url("${post?.featuredImage?.node?.sourceUrl || "https://stagingctspr.axesawebhosting9.net/wp-content/uploads/2025/07/img-transformacion.webp"}")`,
          boxShadow: "inset 0 0 0 200px rgba(0, 0, 0, 0.5)",
        }}
        className="h-[250px] bg-cover bg-center bg-no-repeat md:h-[400px]"
      >
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full items-center">
            <h1 className="text-4xl font-bold text-white lg:text-6xl">
              {post?.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-y-10">
            <div className="hashtags w-full text-left text-pretty">
              {parseContent(post?.content || "")}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

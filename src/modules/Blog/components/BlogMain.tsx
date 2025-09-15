import { BlogCard } from "./BlogCard";
import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryBlog } from "@/modules/shared/graphql/general.query";
import { BlogProps } from "@/modules/shared/types/blog.types";

export const BlogMain = async () => {
  const blog: BlogProps = await WpQuery({
    query: queryBlog,
  });

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-y-10">
          <h2 className="text-center text-4xl font-bold text-black lg:text-5xl">
            Al día con CTS
          </h2>
          <hr className="border-secondaryColor w-[120px] border-2 outline-none" />
        </div>

        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blog.posts.nodes.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

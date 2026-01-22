import { BlogProps } from "@/modules/shared/types/blog.types";
import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryBlogBySlug } from "@/modules/shared/graphql/general.query";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";
import {
  normalizeSlug,
  getSlugVariations,
} from "@/modules/shared/utils/parseContent.utils";
import { SharePopover } from "@/modules/shared/components/SharePopover";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  // Normalize the slug to handle emoji encoding issues
  const normalizedSlug = normalizeSlug(id);

  let blog: BlogProps = await WpQuery({
    query: queryBlogBySlug,
    variables: {
      slug: normalizedSlug,
    },
  });

  let post = blog.posts.edges[0];

  // If post not found, try slug variations (handles different emoji encodings)
  if (!post) {
    const slugVariations = getSlugVariations(id);

    for (const variation of slugVariations) {
      if (variation === normalizedSlug) continue; // Skip already tried

      try {
        blog = await WpQuery({
          query: queryBlogBySlug,
          variables: {
            slug: variation,
          },
        });

        post = blog.posts.edges[0];
        if (post) break; // Found it!
      } catch (error) {
        console.error(`Error trying slug variation "${variation}":`, error);
      }
    }
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20">Post no encontrado</div>
    );
  }

  const { title, content, featuredImage } = post.node;

  return (
    <>
      <section
        style={{
          backgroundImage: `url("${featuredImage?.node?.sourceUrl || "https://stagingctspr.axesawebhosting9.net/wp-content/uploads/2025/07/img-transformacion.webp"}")`,
          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",
        }}
        className="h-[250px] bg-cover bg-[50%_40%] bg-no-repeat md:h-[600px]"
      >
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full items-center">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-6xl">
              {title}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SharePopover />
          <div className="mt-10 flex flex-col items-center gap-y-10">
            <div className="hashtags w-full text-left text-pretty">
              {parseContent(content || "")}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

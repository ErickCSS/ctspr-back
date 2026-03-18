import { BlogProps } from "@/modules/shared/types/blog.types";
import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryBlogBySlug } from "@/modules/shared/graphql/general.query";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";
import {
  normalizeSlug,
  getSlugVariations,
} from "@/modules/shared/utils/parseContent.utils";
import { SharePopover } from "@/modules/shared/components/SharePopover";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { PostTranslation } from "@/modules/shared/types/blog.types";
import { BlogPageWrapper } from "@/modules/shared/components/BlogPageWrapper";

async function getPostData(id: string): Promise<{
  title: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  } | null;
  excerpt: string;
  slug: string;
  uri: string;
  language: {
    code: string;
  };
  translations?: PostTranslation[];
} | null> {
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
    return null;
  }

  const {
    title,
    content,
    featuredImage,
    excerpt,
    slug,
    uri,
    language,
    translations,
  } = post.node;

  return {
    title,
    content,
    featuredImage,
    excerpt,
    slug,
    uri,
    language,
    translations,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const locale = await getLocale();
  const id = (await params).id;
  const postData = await getPostData(id);

  if (!postData) {
    return {
      title: "Post no encontrado - CTS PR",
    };
  }

  const enTranslation =
    postData.language.code.toLowerCase() === "en"
      ? postData
      : postData.translations?.find(
          (translation) => translation.language.code.toLowerCase() === "en",
        );

  const esTranslation =
    postData.language.code.toLowerCase() === "es"
      ? postData
      : postData.translations?.find(
          (translation) => translation.language.code.toLowerCase() === "es",
        );

  return {
    metadataBase: new URL("https://ctspr.com"),
    title: `${postData.title} - CTS PR`,
    alternates: {
      canonical: `/${locale}/blog/${id}`,
      languages: {
        en: enTranslation ? `/en/blog/${enTranslation.slug}` : `/en/blog/${id}`,
        es: esTranslation ? `/es/blog/${esTranslation.slug}` : `/es/blog/${id}`,
      },
    },
    openGraph: {
      title: postData.title,
      description: postData.excerpt.slice(3, 160) || "",
      images: postData.featuredImage?.node?.sourceUrl
        ? [postData.featuredImage.node.sourceUrl]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.excerpt.slice(3, 160) || "",
      images: postData.featuredImage?.node?.sourceUrl
        ? [postData.featuredImage.node.sourceUrl]
        : undefined,
      creator: "ctspr",
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const postData = await getPostData(id);

  if (!postData) {
    return (
      <div className="container mx-auto px-4 py-20">Post no encontrado</div>
    );
  }

  const { title, content, featuredImage, translations, slug, language } =
    postData;

  return (
    <BlogPageWrapper
      translations={translations}
      currentSlug={slug}
      currentLanguage={language.code}
    >
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
    </BlogPageWrapper>
  );
}

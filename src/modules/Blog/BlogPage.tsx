import { Hero } from "@/modules/shared/components/Hero";
import { BlogObjetives } from "@modules/Blog/components/BlogObjetives";
import { BlogMain } from "@modules/Blog/components/BlogMain";

export const BlogPage = () => {
  return (
    <>
      <Hero title="Blog" />
      <BlogMain />
      <BlogObjetives />
    </>
  );
};

import { Hero } from "@components/shared/Hero";
import { BlogObjetives } from "@components/Blog/BlogObjetives";
import { BlogMain } from "@components/Blog/BlogMain";

export const WrapperBlog = () => {
  return (
    <>
      <Hero title="Blog" />
      <BlogMain />
      <BlogObjetives />
    </>
  );
};

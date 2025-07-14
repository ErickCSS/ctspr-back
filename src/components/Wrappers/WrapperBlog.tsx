import { Hero } from "@components/shared/Hero";
import { BlogObjetives } from "@components/Blog/BlogObjetives";
import { UnderConstruction } from "@components/shared/UnderConstruction";

export const WrapperBlog = () => {
  return (
    <>
      <Hero title="Blog" />
      <UnderConstruction />
      <BlogObjetives />
    </>
  );
};

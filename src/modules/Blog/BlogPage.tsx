import { Hero } from "@/modules/shared/components/Hero";
import { BlogObjetives } from "@modules/Blog/components/BlogObjetives";
import { BlogMain } from "@modules/Blog/components/BlogMain";
import { Header } from "@modules/shared/components/general/header";

export const BlogPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero title="Blog" />
        <BlogMain />
        <BlogObjetives />
      </main>
    </>
  );
};

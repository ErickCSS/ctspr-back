import { WpQuery } from "@/services/wpQuery";
import { HeroProps } from "@/types/generalQuery.types";
import { queryHero } from "@/const/general.query";

export const Hero = async ({ title }: { title: string }) => {
  const hero: HeroProps = await WpQuery({
    query: queryHero(title),
  });

  const heroImage = hero.posts.nodes[0].featuredImage.node.sourceUrl;

  console.log(heroImage);

  return (
    <section
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
      className="h-[400px] bg-cover bg-center bg-no-repeat"
    >
      <div className="container mx-auto h-full">
        <div className="flex h-full items-center">
          <h1 className="text-6xl font-bold text-white">
            {hero.posts.nodes[0].title}
          </h1>
        </div>
      </div>
    </section>
  );
};

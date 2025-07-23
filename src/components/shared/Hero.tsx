import { WpQuery } from "@/services/wpQuery";
import { HeroProps } from "@/types/generalQuery.types";
import { queryHero } from "@/graphql/general.query";
import { cn } from "@/lib/utils";

export const Hero = async ({ title }: { title: string }) => {
  const hero: HeroProps = await WpQuery({
    query: queryHero(title),
  });

  const heroImage = hero.posts.nodes[0].featuredImage.node.sourceUrl;
  const isContact = title === "Contáctenos";

  console.log(isContact);

  return (
    <section
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
      className={cn(
        "h-[250px] bg-cover bg-no-repeat md:h-[400px]",
        isContact ? "bg-[70%_center] md:bg-center" : "bg-center",
      )}
    >
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full items-center">
          <h1 className="text-4xl font-bold text-white lg:text-6xl">
            {hero.posts.nodes[0].title}
          </h1>
        </div>
      </div>
    </section>
  );
};

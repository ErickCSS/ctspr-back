import { WpQuery } from "@/modules/shared/services/wpQuery";
import { HeroProps } from "@/modules/shared/types/generalQuery.types";
import { queryHero } from "@/modules/shared/graphql/general.query";
import { cn } from "@/modules/shared/lib/utils";

export const Hero = async ({ title }: { title: string }) => {
  const hero: HeroProps = await WpQuery({
    query: queryHero(title),
  });

  const heroImage = hero.posts.nodes[0].featuredImage.node.sourceUrl;
  const isContact = title === "Contáctenos";
  const isEmpleos = title === "Empleo";

  return (
    <section
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
      className={cn(
        "relative h-[120px] bg-cover bg-no-repeat md:h-[400px]",
        isContact ? "bg-[70%_center] md:bg-center" : "bg-center",
      )}
    >
      {isEmpleos && (
        <div className="from-primaryColor/50 absolute inset-0 z-0 h-full w-[50%] bg-gradient-to-r to-transparent"></div>
      )}
      <div className="relative z-5 container mx-auto h-full px-4">
        <div className="flex h-full items-center">
          <h1 className="text-4xl font-bold text-white lg:text-6xl">
            {hero.posts.nodes[0].title}
          </h1>
        </div>
      </div>
    </section>
  );
};

import { WpQuery } from "@/services/wpQuery";
import { SliderHero } from "../shared/Slider";
import { sliderQuery } from "@/graphql/slider.query";
import { HeroProps } from "@/types/hero.types";

export const Hero = async () => {
  const sliders: HeroProps = await WpQuery({
    query: sliderQuery,
  });

  return <SliderHero sliders={sliders.posts.nodes} />;
};

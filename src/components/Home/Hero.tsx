import { WpQuery } from "@/services/wpQuery";
import { SliderHero } from "../shared/Slider";
import { sliderQuery } from "@/graphql/slider.query";
import { HeroProps } from "@/types/hero.types";
import { toReversed } from "@/utils/toReversed";

export const Hero = async () => {
  const sliders: HeroProps = await WpQuery({
    query: sliderQuery,
  });

  const slidersReverse = toReversed(sliders.posts.nodes);

  return <SliderHero sliders={slidersReverse} />;
};

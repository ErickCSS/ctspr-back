import { WpQuery } from "@/modules/shared/services/wpQuery";
import { SliderHero } from "@/modules/shared/components/Slider";
import { sliderQuery } from "@/modules/shared/graphql/slider.query";
import { HeroProps } from "@/modules/shared/types/hero.types";
import { toReversed } from "@/modules/shared/utils/toReversed";

export const Hero = async () => {
  const sliders: HeroProps = await WpQuery({
    query: sliderQuery,
  });

  const slidersReverse = toReversed(sliders.posts.nodes);

  return <SliderHero sliders={slidersReverse} />;
};

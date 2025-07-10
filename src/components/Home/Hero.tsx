import { WpQuery } from "@/services/wpQuery";
import Slider from "../shared/Slider";
import { sliderQuery } from "@/const/slider.query";
import { HeroProps } from "@/types/hero.types";

export const Hero = async () => {
  const sliders: HeroProps = await WpQuery({
    query: sliderQuery,
  });

  return <Slider sliders={sliders.posts.nodes} />;
};

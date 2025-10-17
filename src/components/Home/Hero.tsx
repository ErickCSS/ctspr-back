import { WpQuery } from "@/services/wpQuery";
import { SliderHero } from "../shared/Slider";
import { sliderQuery } from "@/graphql/slider.query";
import { HeroProps } from "@/types/hero.types";
import { toReversed } from "@/utils/toReversed";
import { createYouTubeSlide, combineSlides } from "@/utils/sliderUtils";

export const Hero = async () => {
  const sliders: HeroProps = await WpQuery({
    query: sliderQuery,
  });

  const slidersReverse = toReversed(sliders.posts.nodes);
  const videoSlides = [
    createYouTubeSlide("/videos/video-cts.webm", "", "", ""),
  ];

  const combinedSlides = combineSlides(slidersReverse, videoSlides, 0);

  return <SliderHero sliders={combinedSlides} />;
};

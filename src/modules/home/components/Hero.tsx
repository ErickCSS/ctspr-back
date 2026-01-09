import { WpQuery } from "@/modules/shared/services/wpQuery";
import { SliderHero } from "@/modules/shared/components/Slider";
import { sliderQuery } from "@/modules/shared/graphql/slider.query";
import { HeroProps } from "@/modules/shared/types/hero.types";
import { toReversed } from "@/modules/shared/utils/toReversed";
import {
  createYouTubeSlide,
  combineSlides,
} from "@modules/shared/utils/slider.utils";
import { getLocale } from "next-intl/server";

export const Hero = async () => {
  const locale = await getLocale();

  const sliders: HeroProps = await WpQuery({
    query: sliderQuery,
    variables: {
      lang: `slider-${locale}`,
    },
  });

  const slidersReverse = toReversed(sliders.posts.nodes);
  const videoSlides = [createYouTubeSlide("/videos/video-cts", "", "", "")];
  const combinedSlides = combineSlides(slidersReverse, videoSlides, 0);

  return <SliderHero sliders={combinedSlides} />;
};

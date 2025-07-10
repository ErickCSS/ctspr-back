import { WhyChooseUsCarousel } from "./WhyChooseUsCarousel";
import { WhyChooseUsProps } from "@/types/generalQuery.types";
import { WpQuery } from "@/services/wpQuery";
import { queryWhyChooseUs } from "@/const/general.query";

export const WhyChooseUs = async () => {
  const whyChooseUs: WhyChooseUsProps = await WpQuery({
    query: queryWhyChooseUs,
  });

  return (
    <section className="bg-accentColor w-full">
      <WhyChooseUsCarousel whyChooseUs={whyChooseUs} />
    </section>
  );
};

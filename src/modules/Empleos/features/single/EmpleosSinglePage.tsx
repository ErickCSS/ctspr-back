import { EmpleoSingleHero } from "./components/EmpleoSingleHero";
import { EmpleoSingleContent } from "./components/EmpleoSingleContent";

export const EmpleosSinglePage = ({ slug }: { slug: string }) => {
  return (
    <>
      <EmpleoSingleHero slug={slug} />
      <EmpleoSingleContent slug={slug} />
    </>
  );
};

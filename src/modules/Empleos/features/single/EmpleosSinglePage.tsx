import { EmpleoSingleHero } from "./components/EmpleoSingleHero";
import { EmpleoSingleContent } from "./components/EmpleoSingleContent";
import { Header } from "@modules/shared/components/general/header";

export const EmpleosSinglePage = ({ slug }: { slug: string }) => {
  return (
    <>
      <Header />
      <main>
        <EmpleoSingleHero slug={slug} />
        <EmpleoSingleContent slug={slug} />
      </main>
    </>
  );
};

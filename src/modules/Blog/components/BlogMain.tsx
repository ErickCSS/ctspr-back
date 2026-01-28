import { TotalPost } from "@modules/shared/services/TotalPost";
import { BlogList } from "./BlogList";
import { getTranslations } from "next-intl/server";

export const BlogMain = async () => {
  const { totalPages } = await TotalPost();
  const t = await getTranslations("blog");

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-y-10">
          <h2 className="text-center text-4xl font-bold text-black lg:text-5xl">
            {t("title")}
          </h2>
          <hr className="border-secondaryColor w-[120px] border-2 outline-none" />
        </div>

        <BlogList totalPages={totalPages} />
      </div>
    </section>
  );
};

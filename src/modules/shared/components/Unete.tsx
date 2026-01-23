import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const Unete = async () => {
  const t = await getTranslations("JoinUs");

  return (
    <section className="bg-white px-4 py-26">
      <div className="mx-auto max-w-7xl">
        <div className="bg-primaryColor flex flex-col items-center justify-between gap-5 rounded-xl p-10 lg:flex-row lg:p-20">
          <h3 className="w-1/3 text-center text-5xl font-black text-white lg:text-left lg:text-5xl xl:text-6xl">
            {t("title")}
          </h3>

          <div className="flex w-2/3 flex-col gap-2 text-center text-2xl text-white lg:flex-row lg:items-center lg:text-left xl:text-3xl">
            <span className="w-2/3">{t("subtitle")}</span>
            <Link
              href="tel:787-620-5500"
              className="w-1/3 text-right font-black"
            >
              787-620-5500
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

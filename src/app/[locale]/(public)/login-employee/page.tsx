import { Button } from "@modules/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Login Employee",
  description: "Login to your employee account",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginEmployee() {
  const t = await getTranslations("loginEmployee");

  return (
    <section className="bg-white px-4 py-20">
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-bold">{t("title")}</h1>
        <div className="mt-16 flex flex-col items-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-secondaryColor w-[200px] text-lg text-white transition-colors duration-300 hover:bg-pink-700"
          >
            <Link
              href="https://osaswebsrv.ctspr.com/osashomepa.htm"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {t("buttonLogin")}
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            className="bg-primaryColor min-h-auto w-fit px-20 !py-6 text-lg text-white transition-colors duration-300 hover:bg-blue-950"
          >
            <Link
              href="https://ctspr.typeform.com/to/RKYJZ6uD"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {t("buttonRequestCredentials")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

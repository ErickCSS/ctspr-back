import Image from "next/image";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";
import { getLocale } from "next-intl/server";
import { cn } from "@/modules/shared/lib/utils";

export const SomosCard = async ({
  name,
  position,
  image,
}: {
  name: string;
  position: string;
  image: string;
}) => {
  const locale = await getLocale();
  const isEnglish = locale === "en";

  return (
    <article className="relative flex flex-col items-center border border-zinc-50/20">
      <Image
        src={image}
        alt={name}
        width={500}
        height={500}
        decoding="async"
        loading="lazy"
        className="h-[320px] w-full object-cover object-[top_center]"
      />
      <div className="to-primaryColor/90 via-primaryColor/10 absolute inset-0 bg-gradient-to-b from-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h2 className="text-2xl font-black">{name}</h2>
        <div
          className={cn(
            "text-sm text-balance uppercase",
            isEnglish ? "flex flex-wrap items-center gap-1" : "",
          )}
        >
          {position && parseContent(position)}
        </div>
      </div>
    </article>
  );
};

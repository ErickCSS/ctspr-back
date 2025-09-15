import Image from "next/image";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";

export const SomosCard = ({
  name,
  position,
  image,
}: {
  name: string;
  position: string;
  image: string;
}) => {
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
        <h4 className="text-2xl font-black">{name}</h4>
        <div className="text-sm text-balance uppercase">
          {position && parseContent(position)}
        </div>
      </div>
    </article>
  );
};

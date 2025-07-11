import Image from "next/image";

export const SomosCard = () => {
  return (
    <article className="relative flex flex-col items-center border border-zinc-50/20">
      <Image
        src="/images/owner.webp"
        alt="Image for Test"
        width={500}
        height={500}
        className="h-[320px] w-full object-cover object-[top_center]"
      />
      <div className="to-primaryColor via-primaryColor/10 absolute inset-0 bg-gradient-to-b from-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h4 className="text-3xl font-black">Rose Villamil</h4>
        <p className="text-base uppercase">Presidenta</p>
      </div>
    </article>
  );
};

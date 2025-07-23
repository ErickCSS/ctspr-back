import { BlogCard } from "./BlogCard";

export const BlogMain = () => {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-y-10">
          <h2 className="text-center text-4xl font-bold text-black lg:text-5xl">
            Al día con CTS
          </h2>
          <hr className="border-secondaryColor w-[120px] border-2 outline-none" />
        </div>

        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <BlogCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

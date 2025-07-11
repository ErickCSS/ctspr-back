import Link from "next/link";

export const Unete = () => {
  return (
    <section className="bg-white px-4 py-26">
      <div className="mx-auto max-w-7xl">
        <div className="bg-primaryColor flex flex-col items-center justify-between gap-5 rounded-xl p-10 lg:flex-row lg:p-20">
          <h3 className="text-center text-5xl font-black text-white lg:text-left lg:text-6xl">
            ¡Únete a CTS!
          </h3>

          <div className="flex flex-col gap-2 text-center text-2xl text-white lg:flex-row lg:items-center lg:text-left lg:text-3xl">
            <span>¡Llámanos o solicita en línea hoy!</span>
            <Link href="tel:787-620-5500" className="font-black">
              787-620-5500
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

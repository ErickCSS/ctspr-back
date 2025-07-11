import Link from "next/link";

export const Unete = () => {
  return (
    <section className="bg-white px-4 py-26">
      <div className="mx-auto max-w-7xl">
        <div className="bg-primaryColor flex items-center justify-between gap-5 rounded-xl p-20">
          <h3 className="text-6xl font-black text-white">¡Únete a CTS!</h3>

          <div className="flex items-center gap-x-2 text-3xl text-white">
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

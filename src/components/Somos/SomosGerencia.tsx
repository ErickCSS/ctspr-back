import { SomosCard } from "./SomosCard";

export const SomosGerencia = () => {
  return (
    <div className="mt-32 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-y-10">
        <h2 className="text-5xl font-bold text-white">Equipo Gerencial</h2>
        <hr className="w-[120px] border-2 border-white outline-none" />
      </div>

      <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 lg:w-6xl">
        {Array.from({ length: 12 }).map((_, index) => (
          <SomosCard key={index} />
        ))}
      </div>
    </div>
  );
};

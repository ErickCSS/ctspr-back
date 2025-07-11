import { SomosCard } from "./SomosCard";

export const SomosAdministrativo = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-y-10">
        <h2 className="text-5xl font-bold text-white">Equipo Administrativo</h2>
        <hr className="w-[120px] border-2 border-white outline-none" />
      </div>

      <div className="mt-16 grid w-6xl grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <SomosCard key={index} />
        ))}
      </div>
    </div>
  );
};

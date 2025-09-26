"use client";

import { Skeleton } from "@/modules/ui/skeleton";

export const EmpleoSingleHeroSkeleton = () => {
  return (
    <section className="bg-[#ffe5ec] px-4 py-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center md:gap-0">
          {/* LeftSide */}
          <div className="flex flex-col items-start gap-5 md:flex-row">
            {/* Icono/Industria */}
            <div className="flex size-20 items-center justify-center rounded-xl bg-pink-400/60 p-2">
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>

            {/* Título, código, meta info, badges */}
            <div className="flex flex-col gap-2">
              {/* Título + Código */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-64 rounded-md" />
                <Skeleton className="h-4 w-16 rounded-md" />
              </div>

              {/* Location / Fecha / Oficina */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-x-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-32 rounded-md" />
                </div>
                <div className="flex items-center gap-x-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-28 rounded-md" />
                </div>
                <div className="flex items-center gap-x-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-36 rounded-md" />
                </div>
              </div>

              {/* Badges */}
              <div className="mt-2 flex items-center gap-2">
                <Skeleton className="h-7 w-24 rounded-full" />
                <Skeleton className="h-7 w-28 rounded-full" />
              </div>
            </div>
          </div>

          {/* RightSide */}
          <div className="flex flex-row gap-5 md:flex-col">
            {/* Botón Aplicar */}
            <Skeleton className="h-12 w-40 rounded-md" />

            {/* Salario */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-28 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const EmpleoSingleContentSkeleton = () => {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto w-full max-w-4xl space-y-14">
        {/* Botón volver */}
        <Skeleton className="h-12 w-60 rounded-md" />

        {/* Overview */}
        <EmployeeOverviewSkeleton />

        {/* Contenido */}
        <EmployeeContentSkeleton />
      </div>
    </section>
  );
};

const EmployeeOverviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="h-7 w-56">
        <Skeleton className="h-7 w-56 rounded-md" />
      </div>

      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3">
        {/* 5 tarjetas como tu array description */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            {/* Icono */}
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-40 rounded-md" />
              <Skeleton className="h-5 w-44 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmployeeContentSkeleton = () => {
  return (
    <div className="space-y-10">
      {/* Descripción */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-7 w-40 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-11/12 rounded-md" />
          <Skeleton className="h-4 w-10/12 rounded-md" />
          <Skeleton className="h-4 w-9/12 rounded-md" />
        </div>
      </div>

      {/* Requisitos Académicos */}
      <SectionListSkeleton titleWidth="w-64" items={4} />

      {/* Habilidades Requeridas */}
      <SectionListSkeleton titleWidth="w-72" items={5} />

      {/* Certificados Requeridos */}
      <SectionListSkeleton titleWidth="w-72" items={3} />

      {/* Licencias Requeridas */}
      <SectionListSkeleton titleWidth="w-64" items={3} />

      {/* Compensaciones y Beneficios */}
      <SectionListSkeleton titleWidth="w-[22rem]" items={5} />

      {/* Botón aplicar */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-14 w-56 rounded-md" />
      </div>
    </div>
  );
};

const SectionListSkeleton = ({
  titleWidth = "w-56",
  items = 4,
}: {
  titleWidth?: string;
  items?: number;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className={`h-7 ${titleWidth}`}>
        <Skeleton className={`h-7 ${titleWidth} rounded-md`} />
      </div>
      <div className="space-y-3 pl-6">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            {/* Bullet visual */}
            <Skeleton className="h-2 w-2 rounded-full" />
            {/* Línea de texto */}
            <Skeleton
              className={[
                "h-4 rounded-md",
                i % 3 === 0 ? "w-9/12" : i % 3 === 1 ? "w-7/12" : "w-5/12",
              ].join(" ")}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

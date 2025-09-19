import { EmpleosServices } from "@modules/Empleos/services/empleos.services";
import { CONVERT_UPPER } from "@modules/shared/utils";
import { CONVERT_MONEY } from "@modules/shared/utils/convertMoney";
import { MapHeroIcons } from "@modules/Empleos/features/single/libs/MapHeroIcons";
import {
  IconBuildingEstate,
  IconCalendarClock,
  IconMapPin,
} from "@tabler/icons-react";
import { Badge } from "@modules/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@modules/ui/button";
import { Link } from "next-view-transitions";
import { EmployeeType } from "@modules/Dashboard/types/employee.type";

export const EmpleoSingleHero = async ({ slug }: { slug: string }) => {
  const employee = await EmpleosServices.getEmployeeBySlug(slug);
  if (!employee) {
    return null;
  }

  return (
    <section className="bg-[#ffe5ec] px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <LeftSide employee={employee} />
          <RightSide employee={employee} />
        </div>
      </div>
    </section>
  );
};

const LeftSide = ({ employee }: { employee: EmployeeType }) => {
  const formattedDate = formatDistanceToNow(employee.created_at, {
    addSuffix: true,
    locale: es,
  });

  return (
    <div className="flex items-start gap-5">
      <div className="flex size-20 items-center justify-center rounded-xl bg-pink-400 p-2">
        {MapHeroIcons[employee.industry.toLowerCase()]}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h4 className="font-lato text-3xl font-bold">
            {employee.vacancy || "Titulo de la Vacante"}
          </h4>
          <div className="font-lato text-sm font-bold text-zinc-500">
            #{employee.code || "000000"}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-x-2 text-base text-zinc-600">
            <IconMapPin stroke={1.5} size={20} />
            <span className="font-lato">
              {employee.location || "Ciudad, Pais"}
            </span>
          </div>
          <div className="flex items-center gap-x-2 text-base text-zinc-600">
            <IconCalendarClock stroke={1.5} size={20} />
            <span className="font-lato">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-x-2 text-base text-zinc-600">
            <IconBuildingEstate stroke={1.5} size={20} />
            <span className="font-lato">
              {CONVERT_UPPER(employee.regionalOffice.replace("-", " ") ?? "") ||
                "Oficina Regional"}
            </span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Badge className="bg-primaryColor px-3 text-base text-white">
            {CONVERT_UPPER(employee?.typeOfEmployment ?? "") || "Full-Time"}
          </Badge>
          <Badge className="bg-secondaryColor px-3 text-base text-white">
            {CONVERT_UPPER(employee?.industry ?? "") || "Development"}
          </Badge>
        </div>
      </div>
    </div>
  );
};

const RightSide = ({ employee }: { employee: EmployeeType }) => {
  return (
    <div className="flex flex-col gap-5">
      <Button
        size="lg"
        className="bg-primaryColor hover:bg-secondaryColor font-lato cursor-pointer py-6 text-base font-bold text-white transition-colors duration-300"
        asChild
      >
        <Link href={`${employee.linkToApply}`} target="_blank">
          Aplicar Ahora
        </Link>
      </Button>

      <div className="font-lato flex items-center gap-1 text-2xl">
        <span className="font-bold">
          {CONVERT_MONEY(employee?.salary || 0)}
        </span>

        <span className="text-base font-normal text-zinc-500">/mensual</span>
      </div>
    </div>
  );
};

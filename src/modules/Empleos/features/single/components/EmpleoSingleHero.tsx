import { EmpleosServices } from "@modules/Empleos/services/empleos.services";
import {
  CONVERT_CAPITALIZE,
  CONVERT_UPPER,
  getCityLabel,
} from "@modules/shared/utils";
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
import { EmployeeType } from "@/modules/shared/types/employee.type";
import { SELECT_INDUSTRIES } from "@modules/shared/lib/SelectInifo";
import { getTranslations } from "next-intl/server";

export const EmpleoSingleHero = async ({ slug }: { slug: string }) => {
  const employee = await EmpleosServices.getEmployeeBySlug(slug);

  if (!employee) {
    return null;
  }

  return (
    <section className="bg-[#ffe5ec] px-4 py-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center md:gap-0">
          <LeftSide employee={employee} />
          <RightSide employee={employee} />
        </div>
      </div>
    </section>
  );
};

const LeftSide = async ({ employee }: { employee: EmployeeType }) => {
  const t = await getTranslations("singleEmployee");

  const formattedDate = formatDistanceToNow(employee.created_at, {
    addSuffix: true,
    locale: es,
  });

  return (
    <div className="flex flex-col items-start gap-5 md:flex-row">
      <div className="flex size-20 items-center justify-center rounded-xl bg-pink-400 p-2">
        {MapHeroIcons[employee.industry]}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h2 className="font-lato text-2xl font-bold">
            {employee.vacancy.toUpperCase() || "Titulo de la Vacante"}
          </h2>
          <div className="font-lato text-sm font-bold text-zinc-500">
            #{employee.code || "000000"}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-x-2 text-base text-zinc-600">
            <IconMapPin stroke={1.5} size={20} />
            <span>{t("location")}:</span>
            <span className="font-lato">
              {getCityLabel(employee.location) || "Ciudad, Pais"}
            </span>
          </div>
          {/* <div className="flex items-center gap-x-2 text-base text-zinc-600">
            <IconCalendarClock stroke={1.5} size={20} />
            <span className="font-lato">{formattedDate}</span>
          </div> */}
          <div className="flex items-center gap-x-2 text-base text-zinc-600">
            <IconBuildingEstate stroke={1.5} size={20} />
            <span>{t("office")}:</span>
            <span className="font-lato">
              {CONVERT_CAPITALIZE(
                (employee.regionalOffice.replace("-", " ") === "san german"
                  ? "San Germán"
                  : "") ||
                  employee.regionalOffice.replace("-", " ") ||
                  "",
              ) || "Oficina Regional"}
            </span>
          </div>
        </div>
        {/* <div className="mt-2 flex items-center gap-2">
          <Badge className="bg-primaryColor px-3 text-base text-white">
            {CONVERT_UPPER(employee?.typeOfEmployment ?? "") || "Full-Time"}
          </Badge>
          <Badge className="bg-secondaryColor px-3 text-base text-white">
            {SELECT_INDUSTRIES.find(
              (industry) => industry.value === employee?.industry,
            )?.label || "Development"}
          </Badge>
        </div> */}
      </div>
    </div>
  );
};

const RightSide = async ({ employee }: { employee: EmployeeType }) => {
  const t = await getTranslations("singleEmployee");

  const IS_SHOW_BUTTON = ({ linkToApply }: { linkToApply: string }) => {
    if (!linkToApply) {
      return null;
    }

    return (
      <div className="flex flex-col gap-4">
        <Button
          size="lg"
          className="bg-primaryColor hover:bg-secondaryColor font-lato max-w-sm cursor-pointer py-6 text-lg font-bold text-white transition-colors duration-300"
          asChild
        >
          <Link href={`${linkToApply}`} target="_blank">
            {t("buttonApply")}
          </Link>
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-row gap-5 md:flex-col">
      {IS_SHOW_BUTTON({ linkToApply: employee.linkToApply })}

      {/* ===== SALARY ===== */}
      {(() => {
        const minSalaryEmployee = Number(employee?.min_salary);
        const maxSalaryEmployee = Number(employee?.max_salary);

        // Check if any salary value is greater than 0
        const hasValidSalary = minSalaryEmployee > 0 || maxSalaryEmployee > 0;

        // Don't render salary section if no valid salary exists
        if (!hasValidSalary) return null;

        return (
          <div className="font-lato flex items-center gap-1 text-2xl">
            <span className="font-bold">
              {CONVERT_MONEY(minSalaryEmployee)} -{" "}
              {CONVERT_MONEY(maxSalaryEmployee)}
            </span>

            <span className="text-base font-normal text-zinc-500">
              /mensual
            </span>
          </div>
        );
      })()}
    </div>
  );
};

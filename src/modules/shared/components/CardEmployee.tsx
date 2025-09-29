"use client";

import { Separator } from "@/modules/ui/separator";
import { Card, CardContent, CardHeader } from "@modules/ui/card";
import {
  IconBuildingEstate,
  IconCalendarClock,
  IconMapPin,
} from "@tabler/icons-react";
import { Badge } from "@modules/ui/badge";
import { CONVERT_MONEY } from "@modules/shared/utils/convertMoney";
import { useAddEmployeeStore } from "@modules/Dashboard/features/add/store/addEmployeeStore";
import { CONVERT_UPPER } from "@modules/shared/utils";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { EmployeeType } from "@/modules/shared/types/employee.type";
import { usePathname } from "next/navigation";
import { cn } from "@modules/shared/lib/utils";
import {
  SELECT_EMPLOYMENT,
  SELECT_INDUSTRIES,
} from "@modules/shared/lib/SelectInifo";
import { useMediaQuery } from "@modules/shared/hooks/useMediaQuery.hooks";

export const CardEmployee = ({ employee }: { employee?: EmployeeType }) => {
  const { formData } = useAddEmployeeStore();
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const formattedDate = formatDistanceToNow(
    employee?.created_at ?? new Date(),
    {
      addSuffix: true,
      locale: es,
    },
  );

  return (
    <Card
      className={cn(
        "justify-between overflow-hidden shadow-sm",
        isDashboard ? "h-fit" : "h-full",
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <h4 className="font-lato text-xl font-bold">
            {formData.vacancy || employee?.vacancy || "Titulo de la Vacante"}
          </h4>
          <div className="font-lato text-sm font-bold text-zinc-500">
            #{formData.code || employee?.code || "000000"}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex items-center gap-x-2 text-sm text-zinc-500">
            <IconMapPin stroke={1.5} size={20} />
            <span className="font-lato">
              {formData.location || employee?.location || "Ciudad, Pais"}
            </span>
          </div>
          <div className="flex items-center gap-x-2 text-sm text-zinc-500">
            <IconCalendarClock stroke={1.5} size={20} />
            <span className="font-lato">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-x-2 text-sm text-zinc-500">
            <IconBuildingEstate stroke={1.5} size={20} />
            <span className="font-lato">
              {CONVERT_UPPER(formData.regionalOffice) ||
                CONVERT_UPPER(employee?.regionalOffice ?? "") ||
                "Oficina Regional"}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Separator className="mb-4" />

        <div
          className={cn(
            "flex items-center justify-between gap-4",
            isDesktop ? "" : "flex-wrap",
          )}
        >
          <div className="flex items-center gap-2">
            <Badge className="bg-primaryColor text-sm text-white">
              {CONVERT_UPPER(formData.typeOfEmployment) ||
                SELECT_EMPLOYMENT.find(
                  (type) => type.value === employee?.typeOfEmployment,
                )?.label ||
                "Full-Time"}
            </Badge>
            <Badge className="bg-secondaryColor text-sm text-white">
              {CONVERT_UPPER(formData.industry) ||
                SELECT_INDUSTRIES.find(
                  (industry) => industry.value === employee?.industry,
                )?.label ||
                "Industria"}
            </Badge>
          </div>

          <div className="font-lato flex items-center gap-1 text-lg">
            <span className="font-bold">
              {(() => {
                const formMinSalary = Number(formData.min_salary);
                const minSalaryEmployee = Number(employee?.min_salary);

                // Use formData.salary if it's a valid number > 0
                if (formMinSalary && formMinSalary > 0) {
                  return CONVERT_MONEY(formMinSalary);
                }

                // Fallback to employee.salary if it's a valid number > 0
                if (minSalaryEmployee && minSalaryEmployee > 0) {
                  return CONVERT_MONEY(minSalaryEmployee);
                }

                // Default fallback
                return CONVERT_MONEY(1000);
              })()}
            </span>

            <span className="text-lg font-bold text-black">-</span>

            <span className="font-bold">
              {(() => {
                const formMaxSalary = Number(formData.max_salary);
                const maxSalaryEmployee = Number(employee?.max_salary);

                // Use formData.salary if it's a valid number > 0
                if (formMaxSalary && formMaxSalary > 0) {
                  return CONVERT_MONEY(formMaxSalary);
                }

                // Fallback to employee.salary if it's a valid number > 0
                if (maxSalaryEmployee && maxSalaryEmployee > 0) {
                  return CONVERT_MONEY(maxSalaryEmployee);
                }

                // Default fallback
                return CONVERT_MONEY(1000);
              })()}
            </span>

            <span className="text-sm font-normal text-zinc-500">
              {" "}
              /
              {formData.payment_frequency ||
                employee?.payment_frequency ||
                "Mensual"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

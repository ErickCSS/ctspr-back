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
import { EmployeeType } from "@modules/Dashboard/types/employee.type";
import { usePathname } from "next/navigation";
import { cn } from "@modules/shared/lib/utils";

export const CardEmployee = ({ employee }: { employee?: EmployeeType }) => {
  const { formData } = useAddEmployeeStore();
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");

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
        "justify-between shadow-sm",
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

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-primaryColor text-sm text-white">
              {CONVERT_UPPER(formData.typeOfEmployment) ||
                CONVERT_UPPER(employee?.typeOfEmployment ?? "") ||
                "Full-Time"}
            </Badge>
            <Badge className="bg-secondaryColor text-sm text-white">
              {CONVERT_UPPER(formData.industry) ||
                CONVERT_UPPER(employee?.industry ?? "") ||
                "Development"}
            </Badge>
          </div>

          <div className="font-lato flex items-center gap-1 text-lg">
            <span className="font-bold">
              {CONVERT_MONEY(employee?.salary || 0) ||
                CONVERT_MONEY(Number(formData.salary)) ||
                CONVERT_MONEY(1000)}
            </span>

            <span className="text-sm font-normal text-zinc-500">/mensual</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

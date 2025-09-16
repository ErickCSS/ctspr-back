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

export const CardEmployee = () => {
  const { formData } = useAddEmployeeStore();

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h4 className="font-lato text-xl font-bold">
            {formData.vacancy || "Titulo de la Vacante"}
          </h4>
          <div className="font-lato text-sm font-bold text-zinc-500">
            #{formData.code || "000000"}
          </div>
        </div>
        <div className="flex items-center gap-x-5">
          <div className="flex items-center gap-x-2 text-sm text-zinc-500">
            <IconMapPin stroke={1.5} size={20} />
            <span className="font-lato">
              {formData.location || "Ciudad, Pais"}
            </span>
          </div>
          <div className="flex items-center gap-x-2 text-sm text-zinc-500">
            <IconCalendarClock stroke={1.5} size={20} />
            <span className="font-lato">Hoy</span>
          </div>
          <div className="flex items-center gap-x-2 text-sm text-zinc-500">
            <IconBuildingEstate stroke={1.5} size={20} />
            <span className="font-lato">
              {CONVERT_UPPER(formData.regionalOffice) || "Oficina Regional"}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Separator className="mb-4" />

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-primaryColor text-sm text-white">
              {CONVERT_UPPER(formData.typeOfEmployment) || "Full-Time"}
            </Badge>
            <Badge className="bg-secondaryColor text-sm text-white">
              {CONVERT_UPPER(formData.industry) || "Development"}
            </Badge>
          </div>

          <div className="font-lato flex items-center gap-1 text-lg">
            <span className="font-bold">
              {formData.salary
                ? CONVERT_MONEY(Number(formData.salary))
                : CONVERT_MONEY(1000)}
            </span>
            <span className="text-sm font-normal text-zinc-500">/mensual</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

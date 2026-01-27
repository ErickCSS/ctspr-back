import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@modules/ui/dropdown-menu";
import { Button } from "@modules/ui/button";
import { Link } from "next-view-transitions";
import { IconFilePlus, IconFileUpload } from "@tabler/icons-react";
import { DashboardClearTable } from "./DashboardClearTable";

export const DashboardBarButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-primaryColor border-primaryColor hover:text-primaryColor cursor-pointer border px-6 py-5 text-white transition-colors duration-300 hover:bg-transparent">
            Agregar Empleo
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-40 space-y-1"
          side="bottom"
          align="end"
        >
          <DropdownMenuItem asChild className="gap-3 focus:bg-transparent">
            <Link
              href={`/dashboard/add`}
              className="group hover:!border-primaryColor/80 hover:!bg-primaryColor/20 hover:!text-primaryColor flex cursor-pointer items-center gap-2 border border-transparent font-medium"
            >
              <IconFilePlus
                stroke={1.5}
                className="group-hover:!text-primaryColor"
              />
              Añadir Empleo
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/addCSV`}
              className="group hover:!border-primaryColor/80 hover:!bg-primaryColor/20 hover:!text-primaryColor flex cursor-pointer items-center gap-2 border border-transparent font-medium"
            >
              <IconFileUpload
                stroke={1.5}
                className="group-hover:!text-primaryColor"
              />
              Subir CSV
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DashboardClearTable />
    </div>
  );
};

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@modules/ui/dropdown-menu";
import { Button } from "@modules/ui/button";
import { EmployeeDeleteAlert } from "@modules/Dashboard/features/delete/components/DashboardDeleteDialog";
import { Link } from "next-view-transitions";
import { IconEdit } from "@tabler/icons-react";

export const DashboardActions = ({
  id,
  slug,
}: {
  id: number;
  slug: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        asChild
        size="sm"
        className="bg-secondaryColor border-secondaryColor hover:bg-secondaryColor/20 hover:border-secondaryColor hover:text-secondaryColor cursor-pointer border text-white transition-colors duration-300"
      >
        <Link href={`/empleos/${slug}`} target="_blank">
          Ver Detalle
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="hover:border-primaryColor/80 hover:bg-primaryColor/20 hover:text-primaryColor cursor-pointer shadow-none transition-colors duration-300"
          >
            Más
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-40 space-y-1"
          side="bottom"
          align="end"
        >
          <DropdownMenuItem asChild className="gap-3 focus:bg-transparent">
            <Link
              href={`/dashboard/edit/${id}`}
              className="group hover:!border-primaryColor/80 hover:!bg-primaryColor/20 hover:!text-primaryColor flex cursor-pointer items-center gap-2 border border-transparent font-medium"
            >
              <IconEdit
                stroke={1.5}
                className="group-hover:!text-primaryColor"
              />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <EmployeeDeleteAlert employeeId={id} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

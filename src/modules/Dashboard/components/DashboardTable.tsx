import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@modules/ui/table";

import { CONVERT_MONEY } from "@/modules/shared/utils/convertMoney";
import { DashboardServices } from "@modules/Dashboard/services/dashboard.services";
import { format } from "date-fns";
import { DashboardActions } from "./DashboardActions";

export const DashboardTable = async () => {
  const employees = await DashboardServices.getEmployees();
  const formattedDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  const employeesFilter = employees?.filter((item) => !item.is_deleted);

  const TABLE_HEAD = [
    "ID",
    "Vacante",
    "Industria",
    "Ubicación",
    "Salario",
    "Fecha",
    "Acciones",
  ];

  return (
    <Table className="table-auto">
      <TableHeader className="bg-zinc-100 p-2">
        <TableRow className="border-y border-zinc-200 px-2">
          {TABLE_HEAD.map((head) => (
            <TableHead key={head} className="py-4">
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {employeesFilter?.map((item) => (
          <TableRow key={item.id} className="border-zinc-200">
            <TableCell className="py-4">{item.code}</TableCell>
            <TableCell className="py-4">{item.vacancy}</TableCell>
            <TableCell className="py-4">{item.industry}</TableCell>
            <TableCell className="py-4">{item.location}</TableCell>
            <TableCell className="py-4">{CONVERT_MONEY(item.salary)}</TableCell>
            <TableCell className="py-4">
              {formattedDate(item.created_at)}
            </TableCell>
            <TableCell className="py-4">
              <DashboardActions id={item.id} slug={item.slug} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

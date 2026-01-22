import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@modules/ui/table";

export function EmployeesTableSkeleton() {
  const TABLE_HEAD = [
    "ID",
    "Vacante",
    "Industria",
    "Ubicación",
    "Rango Salarial",
    "Fecha",
    "Acciones",
  ];

  return (
    <Table className="table-auto animate-pulse">
      <TableHeader className="bg-zinc-100 p-2">
        <TableRow className="border-y border-zinc-200 px-2">
          {TABLE_HEAD.map((head) => (
            <TableHead key={head} className="py-4">
              <div className="h-4 w-20 rounded bg-zinc-200" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, i) => (
          <TableRow key={i} className="border-zinc-200">
            <TableCell className="py-4">
              <div className="h-4 w-10 rounded bg-zinc-200" />
            </TableCell>
            <TableCell className="py-4">
              <div className="h-4 w-32 rounded bg-zinc-200" />
            </TableCell>
            <TableCell className="py-4">
              <div className="h-4 w-24 rounded bg-zinc-200" />
            </TableCell>
            <TableCell className="py-4">
              <div className="h-4 w-24 rounded bg-zinc-200" />
            </TableCell>
            <TableCell className="py-4">
              <div className="h-4 w-28 rounded bg-zinc-200" />
            </TableCell>
            <TableCell className="py-4">
              <div className="h-4 w-20 rounded bg-zinc-200" />
            </TableCell>
            <TableCell className="flex items-center gap-2 py-4">
              <div className="h-8 w-20 rounded bg-zinc-200" />
              <div className="h-8 w-13 rounded bg-zinc-200" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

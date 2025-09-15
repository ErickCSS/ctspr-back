import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@modules/ui/table";

export const MOCK_TABLE = [
  {
    id: 1,
    vacante: "Oferta de Empleo en Santurce",
    industria: "Tecnología",
    ubicacion: "Santurce",
    salario: "2,000",
    fecha: "2025-09-15",
    acciones: "Acciones",
  },
  {
    id: 2,
    vacante: "Oferta de Empleo en Santurce",
    industria: "Tecnología",
    ubicacion: "Santurce",
    salario: "2,000",
    fecha: "2025-09-15",
    acciones: "Acciones",
  },
];

export const DashboardTable = () => {
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
    <Table>
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
        {MOCK_TABLE.map((item) => (
          <TableRow key={item.id} className="border-zinc-200">
            <TableCell className="py-4">{item.id}</TableCell>
            <TableCell className="py-4">{item.vacante}</TableCell>
            <TableCell className="py-4">{item.industria}</TableCell>
            <TableCell className="py-4">{item.ubicacion}</TableCell>
            <TableCell className="py-4">{item.salario}</TableCell>
            <TableCell className="py-4">{item.fecha}</TableCell>
            <TableCell className="py-4">{item.acciones}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

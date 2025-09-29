import { Button } from "@modules/ui/button";
import { Card, CardContent, CardHeader } from "@modules/ui/card";
import { DashboardTable } from "./components/DashboardTable";
import { Link } from "next-view-transitions";
import Pagination from "@modules/shared/components/pagination/Pagination";
import { DashboardServices } from "./services/dashboard.services";

export const DashboardPage = async () => {
  const {
    records,
    items_per_page,
    previous_page,
    current_page,
    next_page,
    total_pages,
  } = await DashboardServices.getEmployeesPagination();

  console.log(records);

  const pagination = {
    records: records,
    items_per_page: items_per_page,
    previous_page: previous_page,
    current_page: current_page,
    next_page: next_page,
    total_pages: total_pages,
  };

  return (
    <section className="bg-white px-4 py-20">
      <div className="container mx-auto overflow-hidden">
        <Card>
          <CardHeader className="flex w-full items-center justify-between">
            <div className="w-full">
              <h2 className="text-2xl font-bold">Lista de Empleos</h2>
            </div>
            <Button
              variant="outline"
              asChild
              className="bg-primaryColor border-primaryColor hover:text-primaryColor cursor-pointer text-white transition-colors duration-300 hover:bg-transparent"
            >
              <Link href="/dashboard/add">Agregar Empleo</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <DashboardTable />
            <Pagination pagination={pagination} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

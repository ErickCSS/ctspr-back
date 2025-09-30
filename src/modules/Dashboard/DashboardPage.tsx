import { Button } from "@modules/ui/button";
import { Card, CardContent, CardHeader } from "@modules/ui/card";
import { DashboardList } from "./components/DashboardList";
import { Link } from "next-view-transitions";

export const DashboardPage = async () => {
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
            <DashboardList />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

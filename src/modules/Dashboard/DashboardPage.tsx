import { Card, CardContent, CardHeader } from "@modules/ui/card";
import { DashboardList } from "./components/DashboardList";
import { DashboardBarButtons } from "./components/DashboardBarButtons";

export const DashboardPage = async () => {
  return (
    <section className="bg-white px-4 py-20">
      <div className="container mx-auto overflow-hidden">
        <Card>
          <CardHeader className="flex w-full items-center justify-between">
            <div className="w-full">
              <h2 className="text-2xl font-bold">Lista de Empleos</h2>
            </div>
            <DashboardBarButtons />
          </CardHeader>
          <CardContent>
            <DashboardList />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

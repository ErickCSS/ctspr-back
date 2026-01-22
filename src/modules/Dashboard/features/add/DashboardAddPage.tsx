import { Card, CardContent, CardHeader } from "@modules/ui/card";
import { DashAddForm } from "./components/DashAddForm";
import { Button } from "@modules/ui/button";
import { Link } from "next-view-transitions";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { CardEmployee } from "@modules/shared/components/CardEmployee";

export const DashboardAddPage = () => {
  return (
    <section className="bg-white px-4 py-20">
      <div className="container mx-auto">
        <div className="mb-4">
          <Button
            variant="outline"
            asChild
            className="bg-primaryColor border-primaryColor cursor-pointer text-white shadow-none transition-colors duration-300 hover:bg-transparent"
          >
            <Link href="/dashboard" className="flex items-center gap-x-2">
              <IconArrowNarrowLeft stroke={1.5} />{" "}
              <span>Regresar a la lista</span>
            </Link>
          </Button>
        </div>
        <div className="flex justify-center gap-4">
          <div className="w-2/3 overflow-hidden">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Agregar Empleo</h2>
              </CardHeader>
              <CardContent>
                <DashAddForm />
              </CardContent>
            </Card>
          </div>
          <div className="w-1/3">
            <div className="mb-4">
              <h3 className="text-2xl font-bold">Vista Previa</h3>
            </div>
            <CardEmployee />
          </div>
        </div>
      </div>
    </section>
  );
};

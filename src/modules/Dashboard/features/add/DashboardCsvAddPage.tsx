import { Card, CardContent, CardHeader } from "@modules/ui/card";
import { UploadEmployeesCSV } from "./components/DashUpCsv";
import { Button } from "@modules/ui/button";
import { Link } from "next-view-transitions";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { createClient } from "@modules/shared/utils/supabase/server";

export const DashboardCsvAddPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
        <div className="w-full overflow-hidden">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Agregar Empleo</h2>
            </CardHeader>
            <CardContent>
              <UploadEmployeesCSV user={user!} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

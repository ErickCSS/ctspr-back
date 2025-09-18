import { CardEmployee } from "@/modules/shared/components/CardEmployee";
import { EmpleosServices } from "@modules/Empleos/services/empleos.services";
import { Link } from "next-view-transitions";

export const EmpleosList = async () => {
  const employees = await EmpleosServices.getEmployees();
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {employees?.map((employee) => (
            <Link key={employee.id} href={`/empleos/${employee.slug}`}>
              <CardEmployee employee={employee} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

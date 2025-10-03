import { EmpleosServices } from "@/modules/Empleos/services/empleos.services";
import { CONVERT_UPPER } from "@/modules/shared/utils";
import { EmployeeType } from "@/modules/shared/types/employee.type";
import {
  IconCalendar,
  IconMap,
  IconClock,
  IconChartBarPopular,
  IconContract,
  IconArrowNarrowLeft,
} from "@tabler/icons-react";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@modules/ui/button";
import { Link } from "next-view-transitions";

export const EmpleoSingleContent = async ({ slug }: { slug: string }) => {
  const employee = await EmpleosServices.getEmployeeBySlug(slug);

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto w-full max-w-4xl space-y-14">
        <Button
          size="lg"
          className="bg-primaryColor hover:bg-secondaryColor font-lato max-w-sm cursor-pointer text-base font-bold text-white transition-colors duration-300"
          asChild
        >
          <Link
            href="/empleos"
            target="_self"
            className="flex items-center gap-2"
          >
            <IconArrowNarrowLeft stroke={1.2} size={40} />
            <span>Volver al Listado</span>
          </Link>
        </Button>
        <EmployeeOverview employee={employee} />
        <EmployeeContent employee={employee} />
      </div>
    </section>
  );
};

const EmployeeOverview = ({ employee }: { employee: EmployeeType }) => {
  const description = [
    {
      title: "Fecha de Publicación",
      description: formatDate(employee.created_at, "dd MMMM, yyyy", {
        locale: es,
      }),
      icon: <IconCalendar stroke={1.2} size={42} className="text-black" />,
    },
    {
      title: "Localidad",
      description: employee.location,
      icon: <IconMap stroke={1.2} size={42} className="text-black" />,
    },
    {
      title: "Horario",
      description: employee.hoursJob,
      icon: <IconClock stroke={1.2} size={42} className="text-black" />,
    },
    {
      title: "Experiencia",
      description: employee.experienceRequirements,
      icon: (
        <IconChartBarPopular stroke={1.2} size={42} className="text-black" />
      ),
    },

    {
      title: "Tipo de Contrato",
      description: CONVERT_UPPER(employee.typeOfEmployment),
      icon: <IconContract stroke={1.2} size={42} className="text-black" />,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <h3 className="font-lato text-2xl font-bold text-black">
        Descripción General
      </h3>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3">
        {description.map((item) => (
          <div key={item.title} className="flex items-center gap-2">
            <div className="w-full max-w-12">{item.icon}</div>
            <div className="flex flex-col">
              <span className="text-medium text-base text-zinc-600">
                {item.title}:
              </span>
              <span className="text-base font-bold text-black">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmployeeContent = ({ employee }: { employee: EmployeeType }) => {
  const parseData = (data: any) => {
    if (typeof data === "object" && data !== null) {
      return data;
    }

    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.warn("Failed to parse JSON data:", data, error);
        return [];
      }
    }

    return [];
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4">
        <h3 className="font-lato text-2xl font-bold text-black">Descripción</h3>
        <div className="text-base text-pretty text-zinc-600">
          {employee.description}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-lato text-2xl font-bold text-black">
          Requisitos Académicos
        </h3>
        <div className="text-base text-balance text-zinc-600">
          <ul className="list-disc space-y-3 pl-6">
            {parseData(employee.academicRequirements).map(
              (requirement: { value: string; label: string }) => (
                <li key={requirement.value}>{requirement.label}</li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-lato text-2xl font-bold text-black">
          Habilidades Requeridas
        </h3>
        <div className="text-base text-balance text-zinc-600">
          <ul className="list-disc space-y-3 pl-6">
            {parseData(employee.skills).map(
              (skill: { value: string; label: string }) => (
                <li key={skill.value}>{skill.label}</li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-lato text-2xl font-bold text-black">
          Certificados Requeridos
        </h3>
        <div className="text-base text-balance text-zinc-600">
          <ul className="list-disc space-y-3 pl-6">
            {parseData(employee.certificateRequirements).map(
              (certificate: { value: string; label: string }) => (
                <li key={certificate.value}>{certificate.label}</li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-lato text-2xl font-bold text-black">
          Licencias Requeridas
        </h3>
        <div className="text-base text-balance text-zinc-600">
          <ul className="list-disc space-y-3 pl-6">
            {parseData(employee.licenseRequirements).map(
              (license: { value: string; label: string }) => (
                <li key={license.value}>{license.label}</li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-lato text-2xl font-bold text-black">
          Compensaciones y Beneficios
        </h3>
        <div className="text-base text-balance text-zinc-600">
          <ul className="list-disc space-y-3 pl-6">
            {parseData(employee.benefits).map(
              (benefit: { value: string; label: string }) => (
                <li key={benefit.value}>{benefit.label}</li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          size="lg"
          className="bg-primaryColor hover:bg-secondaryColor font-lato max-w-sm cursor-pointer py-6 text-lg font-bold text-white transition-colors duration-300"
          asChild
        >
          <Link href={`${employee.linkToApply}`} target="_blank">
            Aplicar Ahora
          </Link>
        </Button>
      </div>
    </div>
  );
};

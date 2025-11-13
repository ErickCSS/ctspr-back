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
  type DescriptionType = {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  const description: DescriptionType[] = [
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

  const SHOW_CONTENT = ({
    description,
  }: {
    description: DescriptionType[];
  }) => {
    // Filtrar elementos con valores vacíos, nulos o undefined
    const filteredDescription = description.filter(
      (item) =>
        item.description &&
        item.description.trim() !== "" &&
        item.description.toLowerCase() !== "no suministrado",
    );

    return (
      <>
        {filteredDescription.map((item) => (
          <div key={item.title} className="flex items-center gap-2">
            <div className="w-full max-w-12">{item.icon}</div>
            <div className="flex flex-col">
              <span className="text-medium text-base text-zinc-600">
                {item.title}:
              </span>
              <span className="text-base font-bold text-black">
                {item.description.charAt(0).toUpperCase() +
                  item.description.slice(1).toLowerCase()}
              </span>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <h3 className="font-lato text-2xl font-bold text-black">
        Descripción General
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {SHOW_CONTENT({ description })}
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

  const SHOW_CONTENT = (data: any, title: string) => {
    const dataParsed = parseData(data);

    if (dataParsed[0].label === "No suministrado") {
      return null;
    }

    return (
      <div className="flex flex-col gap-4">
        <h3 className="font-lato text-2xl font-bold text-black">{title}</h3>
        <div className="text-base text-balance text-zinc-600">
          <ul className="list-disc space-y-3 pl-6">
            {dataParsed.map((requirement: { value: string; label: string }) => (
              <li key={requirement.value}>{requirement.label}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const IS_SHOW_BUTTON = ({ linkToApply }: { linkToApply: string }) => {
    if (!linkToApply) {
      return null;
    }

    return (
      <div className="flex flex-col gap-4">
        <Button
          size="lg"
          className="bg-primaryColor hover:bg-secondaryColor font-lato max-w-sm cursor-pointer py-6 text-lg font-bold text-white transition-colors duration-300"
          asChild
        >
          <Link href={`${linkToApply}`} target="_blank">
            Aplicar Ahora
          </Link>
        </Button>
      </div>
    );
  };

  // Metodo para detectar ";" y hacer un salto de linea con bullets
  const LIST_DESCRIPTION = (description: string) => {
    const list = description.split(";");
    return (
      <ul className="list-disc space-y-3 pl-6">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4">
        <h3 className="font-lato text-2xl font-bold text-black">Descripción</h3>
        <div className="text-base text-pretty text-zinc-600">
          {LIST_DESCRIPTION(employee.description)}
        </div>
      </div>

      {SHOW_CONTENT(employee.academicRequirements, "Requisitos Académicos")}
      {SHOW_CONTENT(employee.skills, "Habilidades Requeridas")}
      {SHOW_CONTENT(
        employee.certificateRequirements,
        "Certificados Requeridos",
      )}
      {SHOW_CONTENT(employee.licenseRequirements, "Licencias Requeridas")}
      {SHOW_CONTENT(employee.benefits, "Compensaciones y Beneficios")}

      {IS_SHOW_BUTTON({ linkToApply: employee.linkToApply })}
    </div>
  );
};

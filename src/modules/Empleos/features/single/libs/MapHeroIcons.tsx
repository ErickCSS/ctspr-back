import {
  IconBackhoe,
  IconBeach,
  IconBriefcase2Filled,
  IconBrush,
  IconBuildingCog,
  IconBuildingFactory,
  IconBuildingFactory2,
  IconBuildingSkyscraper,
  IconBuildingStore,
  IconChefHat,
  IconCoin,
  IconCpu,
  IconCrane,
  IconEyeSearch,
  IconGavel,
  IconGeometry,
  IconHorse,
  IconMedicalCross,
  IconMicrophone,
  IconReportMoney,
  IconSchema,
  IconSchool,
  IconTrees,
  IconTruckLoading,
  IconWriting,
} from "@tabler/icons-react";
import { JSX } from "react";

interface MapHeroIcons {
  [key: string]: JSX.Element;
}

export const MapHeroIcons: MapHeroIcons = {
  Empleo: (
    <IconBriefcase2Filled stroke={1.5} size={50} className="text-white" />
  ),
  IT: <IconCpu stroke={1.5} size={50} className="text-white" />,
  Marketing: <IconWriting stroke={1.5} size={50} className="text-white" />,
  Finanzas: <IconReportMoney stroke={1.5} size={50} className="text-white" />,
  Salud: <IconMedicalCross stroke={1.5} size={50} className="text-white" />,
  Educacion: <IconSchool stroke={1.5} size={50} className="text-white" />,
  Gobierno: (
    <IconBuildingSkyscraper stroke={1.5} size={50} className="text-white" />
  ),
  Arquitectura: <IconGeometry stroke={1.5} size={50} className="text-white" />,
  Ingenieria: <IconBackhoe stroke={1.5} size={50} className="text-white" />,
  Legal: <IconGavel stroke={1.5} size={50} className="text-white" />,
  Ventas: <IconCoin stroke={1.5} size={50} className="text-white" />,
  RecursosHumanos: <IconSchema stroke={1.5} size={50} className="text-white" />,
  Manufactura: (
    <IconBuildingFactory2 stroke={1.5} size={50} className="text-white" />
  ),

  Logistica: <IconTruckLoading stroke={1.5} size={50} className="text-white" />,
  Construccion: <IconCrane stroke={1.5} size={50} className="text-white" />,
  ArteDiseno: <IconBrush stroke={1.5} size={50} className="text-white" />,
  Comunicacion: (
    <IconMicrophone stroke={1.5} size={50} className="text-white" />
  ),
  Ciencias: <IconEyeSearch stroke={1.5} size={50} className="text-white" />,
  Turismo: <IconBeach stroke={1.5} size={50} className="text-white" />,
  Gastronomia: <IconChefHat stroke={1.5} size={50} className="text-white" />,
  Energia: (
    <IconBuildingFactory stroke={1.5} size={50} className="text-white" />
  ),
  RecursosNaturales: (
    <IconTrees stroke={1.5} size={50} className="text-white" />
  ),
  Agropecuario: <IconHorse stroke={1.5} size={50} className="text-white" />,
  Retail: <IconBuildingStore stroke={1.5} size={50} className="text-white" />,
  Startup: <IconBuildingCog stroke={1.5} size={50} className="text-white" />,
};

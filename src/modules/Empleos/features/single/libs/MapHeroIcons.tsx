import {
  IconCpu,
  IconMedicalCross,
  IconReportMoney,
  IconSchool,
  IconWriting,
} from "@tabler/icons-react";
import { JSX } from "react";

interface MapHeroIcons {
  [key: string]: JSX.Element;
}

export const MapHeroIcons: MapHeroIcons = {
  IT: <IconCpu stroke={1.5} size={50} className="text-white" />,
  Marketing: <IconWriting stroke={1.5} size={50} className="text-white" />,
  Finanzas: <IconReportMoney stroke={1.5} size={50} className="text-white" />,
  Salud: <IconMedicalCross stroke={1.5} size={50} className="text-white" />,
  Educacion: <IconSchool stroke={1.5} size={50} className="text-white" />,
  Gobierno: <IconReportMoney stroke={1.5} size={50} className="text-white" />,
  Arquitectura: (
    <IconReportMoney stroke={1.5} size={50} className="text-white" />
  ),
  Ingenieria: <IconReportMoney stroke={1.5} size={50} className="text-white" />,
  Legal: <IconReportMoney stroke={1.5} size={50} className="text-white" />,
  Ventas: <IconReportMoney stroke={1.5} size={50} className="text-white" />,
  RecursosHumanos: (
    <IconReportMoney stroke={1.5} size={50} className="text-white" />
  ),
  Manufactura: (
    <IconReportMoney stroke={1.5} size={50} className="text-white" />
  ),
  Logistica: <IconReportMoney stroke={1.5} size={50} className="text-white" />,
  Construccion: (
    <IconReportMoney stroke={1.5} size={50} className="text-white" />
  ),
  ArteDiseno: <IconReportMoney stroke={1.5} size={50} className="text-white" />,
  Comunicacion: (
    <IconReportMoney stroke={1.5} size={50} className="text-white" />
  ),
  Ciencias: <IconReportMoney stroke={1.5} size={50} className="text-white" />,
  Turismo: <IconReportMoney stroke={1.5} size={50} className="text-white" />,
  Gastronomia: (
    <IconReportMoney stroke={1.5} size={50} className="text-white" />
  ),
  Energia: <IconReportMoney stroke={1.5} size={50} className="text-white" />,
  RecursosNaturales: (
    <IconReportMoney stroke={1.5} size={50} className="text-white" />
  ),
  Agropecuario: (
    <IconReportMoney stroke={1.5} size={50} className="text-white" />
  ),
  Retail: <IconReportMoney stroke={1.5} size={50} className="text-white" />,
  Startup: <IconReportMoney stroke={1.5} size={50} className="text-white" />,
};

import { normalizeText } from "./normalizeText";

/**
 * Genera el texto de búsqueda normalizado para un empleado
 * Concatena todos los campos relevantes y los normaliza (sin acentos, minúsculas)
 *
 * @param data - Datos del empleado
 * @returns Texto normalizado para búsqueda
 */
export function generateSearchText(data: {
  vacancy?: string;
  description?: string;
  industry?: string;
  location?: string;
  typeOfEmployment?: string;
  regionalOffice?: string;
  [key: string]: any;
}): string {
  const fields = [
    data.vacancy || "",
    data.description || "",
    data.industry || "",
    data.location || "",
    data.typeOfEmployment || "",
    data.regionalOffice || "",
  ];

  // Concatenar todos los campos y normalizar
  const combined = fields.join(" ");
  return normalizeText(combined);
}

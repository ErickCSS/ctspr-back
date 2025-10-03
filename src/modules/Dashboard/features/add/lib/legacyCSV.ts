// --- LEGACY ADAPTER UTILS ---
import { SELECT_LOCATION } from "@modules/shared/lib/SelectInifo";
import { toKebabIfMulti } from "@modules/shared/utils/KebabMulti";
import { CONVERT_CAPITALIZE } from "@modules/shared/utils/index";

type LegacyBuckets = {
  alt_city: string[];
  requirements: string[];
  schedule: string[];
  compensation: string[];
  availability: string[];
  notes: string[];
};

const CITIES_PR = new Set(SELECT_LOCATION.map((f) => f.value));

function extractCitiesFromText(text: string): string[] {
  if (!text) return ["No suministrada"];

  const foundCities: string[] = [];
  const normalizedText = text.toUpperCase();

  // Buscar cada ciudad de la lista en el texto
  for (const location of SELECT_LOCATION) {
    const cityValue = location.value.toUpperCase();
    const cityLabel = location.label.toUpperCase();

    // Buscar por value y label, considerando palabras completas
    const valueRegex = new RegExp(
      `\\b${cityValue.replace(/\s+/g, "\\s+")}\\b`,
      "i",
    );
    const labelRegex = new RegExp(
      `\\b${cityLabel.replace(/\s+/g, "\\s+")}\\b`,
      "i",
    );

    if (valueRegex.test(normalizedText) || labelRegex.test(normalizedText)) {
      foundCities.push(location.value);
    }
  }

  return foundCities.length > 0 ? foundCities : ["No suministrada"];
}

function classifyLegacyPart(p: string): keyof LegacyBuckets | "notes" {
  const up = p.toUpperCase();
  if (/\b(AM|PM)\b/.test(up) || /\d{1,2}:\d{2}/.test(p)) return "schedule";
  if (
    /(BACHILLERATO|DIPLOMA|GRADO|LICENCI|EXPERIEN|CERTIFIC|CURR[IÍ]CULUM|REQUISIT|ESTUDIOS)/.test(
      up,
    )
  ) {
    return "requirements";
  }
  if (/(SALARIO|PAGA|COMPENSACI[ÓO]N|POR HORA|HORA|SEMANALES|PAGO)/.test(up)) {
    // Si además trae hora, lo dejamos en schedule; sino, compensation
    if (/\b(AM|PM)\b|\d{1,2}:\d{2}/.test(up)) return "schedule";
    return "compensation";
  }
  const token = up.replace(/[^A-ZÑ ]/g, "").trim();
  if (CITIES_PR.has(token)) return "alt_city";
  if (/DISPONIBILIDAD|INMEDIATA/.test(up)) return "availability";
  return "notes";
}

function splitLegacyCell(cell?: string): string[] {
  if (!cell) return [];
  return cell
    .split("]")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseLegacyCompensation(txt: string) {
  // Mejora si luego quieres extraer valores numéricos/rangos
  const up = txt.toUpperCase();
  let payment_frequency: "hourly" | "weekly" | "monthly" | "annual" | null =
    null;
  if (/HORA|HORAS|HR|HOUR/.test(up)) payment_frequency = "hourly";
  if (/SEMANA/.test(up)) payment_frequency = "weekly";
  if (/MES|MENSUAL/.test(up)) payment_frequency = "monthly";
  if (/ANUAL|A[NÑ]O/.test(up)) payment_frequency = "annual";
  return {
    min_salary: null as number | null,
    max_salary: null as number | null,
    payment_frequency,
  };
}

function toSlug(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Convierte una fila legacy (array sin headers): [code, vacancy, city, longBlob, row_index]
 * a un objeto con tus headers modernos para que luego pase por normalizeRowForDB.
 */
export function mapLegacyArrayToModernObject(
  arr: string[],
): Record<string, string> {
  const code = arr?.[0] ?? "";
  const vacancy = arr?.[1] ?? "";
  const city = arr?.[2] ?? "";
  const blob = arr?.[3] ?? ""; // columna larga con ] separadores

  const parts = splitLegacyCell(blob);
  const buckets: LegacyBuckets = {
    alt_city: [],
    requirements: [],
    schedule: [],
    compensation: [],
    availability: [],
    notes: [],
  };

  for (const p of parts) {
    const tag = classifyLegacyPart(p);
    buckets[tag]?.push(p);
  }

  // Extraer ciudades adicionales de la descripción completa
  const descriptionText = parts.join(" ");
  const extractedCities = extractCitiesFromText(descriptionText);

  // Agregar las ciudades encontradas al bucket alt_city si no están ya
  for (const extractedCity of extractedCities) {
    if (
      extractedCity !== "No suministrada" &&
      !buckets.alt_city.includes(extractedCity)
    ) {
      buckets.alt_city.push(extractedCity);
    }
  }

  // Si no se encontraron ciudades en el texto y alt_city está vacío, usar "No suministrada"
  if (buckets.alt_city.length === 0) {
    buckets.alt_city.push(CONVERT_CAPITALIZE(city) || "No suministrada");
  }

  // Distribuimos requirements en campos más específicos si procede:
  const reqText = buckets.requirements.join("; ");
  const academic = /BACHILLERATO|DIPLOMA|GRADO|T[ÍI]TULO/i.test(reqText)
    ? reqText
    : "";
  const license = /LICENCI/i.test(reqText) ? reqText : "";
  const certs = /CERTIFIC/i.test(reqText) ? reqText : "";
  const exp = /EXPERIEN/i.test(reqText) ? reqText : "";

  const compText = buckets.compensation.join("; ");
  const comp = parseLegacyCompensation(compText);
  const convertCity = toKebabIfMulti(city, { lowercaseSingle: true });

  // Objeto base con tus headers modernos (vacíos donde no haya dato)
  const modern: Record<string, string> = {
    code: String(code || ""),
    vacancy: CONVERT_CAPITALIZE(vacancy),
    industry: "", // opcional: heurística o default
    location: buckets.alt_city[0] || "",
    min_salary: comp.min_salary == null ? "" : String(comp.min_salary),
    max_salary: comp.max_salary == null ? "" : String(comp.max_salary),
    hoursJob: buckets.schedule.join("; "),
    academicRequirements: academic,
    licenseRequirements: license,
    certificateRequirements: certs,
    experienceRequirements: exp,
    typeOfEmployment: "Full-time", // opcional: derivar de texto (Tiempo completo / Parcial)
    skills: "", // opcional
    benefits: "", // opcional
    regionalOffice: convertCity, // si aparece una ciudad alterna
    linkToApply: "",
    description: [
      buckets.availability.join("; "),
      buckets.notes.join("; "),
      compText,
    ]
      .filter(Boolean)
      .join(" | "),
    owner_email: "",
    user_id: "",
    is_deleted: "",
    slug: toSlug(`${vacancy}-${city}`),
    payment_frequency: comp.payment_frequency ?? "",
    created_at: "",
    // Puedes agregar aquí otros campos que manejes (search_text, deleted_at, etc.)
  };

  return modern;
}

/**
 * Heurística: decide si el archivo es del formato NUEVO o LEGACY.
 * - Nuevo: tiene headers “modernos” (ej. 'vacancy', 'industry', etc.)
 * - Legacy: no tiene headers o los headers son números/textos "raros" y la 4ta columna es un blob.
 */
export function looksLikeModernHeaders(fields: string[] = []) {
  const f = new Set(fields.map((s) => s.trim().toLowerCase()));
  const mustHave = ["code", "vacancy", "location"]; // mínimos razonables
  return mustHave.every((k) => f.has(k));
}

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

  // Detectar horarios: AM/PM, horas con/sin dos puntos, días de la semana, turnos
  if (
    /\b(AM|PM)\b/.test(up) ||
    /\d{1,2}:\d{2}/.test(p) ||
    /\d{1,2}\s*(AM|PM)/.test(up) ||
    /(LUNES|MARTES|MI[ÉE]RCOLES|JUEVES|VIERNES|S[ÁA]BADO|DOMINGO)/.test(up) ||
    /(TURNO|1ER|2DO|3ER|4TO|PRIMER|SEGUNDO|TERCER|CUARTO|ROTATIVOS?)/.test(up)
  ) {
    return "schedule";
  }

  if (
    /(BACHILLERATO|DIPLOMA|GRADO|LICENCI|EXPERIEN|CERTIFIC|CURR[IÍ]CULUM|REQUISIT|ESTUDIOS)/.test(
      up,
    )
  ) {
    return "requirements";
  }

  if (/(SALARIO|PAGA|COMPENSACI[ÓO]N|POR HORA|SEMANALES|PAGO)/.test(up)) {
    // Si además trae hora, lo dejamos en schedule; sino, compensation
    if (
      /\b(AM|PM)\b/.test(up) ||
      /\d{1,2}:\d{2}/.test(up) ||
      /\d{1,2}\s*(AM|PM)/.test(up)
    ) {
      return "schedule";
    }
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
 * Procesa el nuevo formato CSV con headers específicos:
 * Orden, Labor Description, Sucursal, Link Typeform, Location, Experience, Education, Description, Numero consecutivo
 */
export function mapNewCSVFormatToModernObject(
  row: Record<string, string>,
): Record<string, string> {
  const code = row["Orden"] ?? row["orden"] ?? "";
  const vacancy = row["Labor Description"] ?? row["labor description"] ?? "";
  const sucursal = row["Sucursal"] ?? row["sucursal"] ?? "";
  const linkTypeform = row["Link Typeform"] ?? row["link typeform"] ?? "";
  const location = row["Location"] ?? row["location"] ?? "";
  const experience = row["Experience"] ?? row["experience"] ?? "";
  const education = row["Education"] ?? row["education"] ?? "";
  const description = row["Description"] ?? row["description"] ?? "";

  // Procesar el campo Description que viene con separadores "]"
  const descriptionParts = splitLegacyCell(description);
  const buckets: LegacyBuckets = {
    alt_city: [],
    requirements: [],
    schedule: [],
    compensation: [],
    availability: [],
    notes: [],
  };

  // Clasificar cada parte del Description usando las palabras clave
  for (const p of descriptionParts) {
    const tag = classifyLegacyPart(p);
    buckets[tag]?.push(p);
  }

  // Extraer ciudades del campo Location y Description
  const locationText = `${location} ${descriptionParts.join(" ")}`;
  const extractedCities = extractCitiesFromText(locationText);

  // Agregar las ciudades encontradas
  for (const extractedCity of extractedCities) {
    if (
      extractedCity !== "No suministrada" &&
      !buckets.alt_city.includes(extractedCity)
    ) {
      buckets.alt_city.push(extractedCity);
    }
  }

  // Si no se encontraron ciudades, usar Location o Sucursal
  if (buckets.alt_city.length === 0) {
    const cityFromLocation = extractCitiesFromText(location);
    if (cityFromLocation[0] !== "No suministrada") {
      buckets.alt_city.push(cityFromLocation[0]);
    } else {
      buckets.alt_city.push(CONVERT_CAPITALIZE(sucursal) || "No suministrada");
    }
  }

  // Procesar Experience y Education junto con los requirements del Description
  const allRequirements = [
    ...buckets.requirements,
    experience,
    education,
  ].filter(Boolean);

  const reqItems = allRequirements
    .flatMap((r) => r.split(/[,;|]/))
    .map((s) =>
      s.replace(/\b(requisitos?|requerimientos?)\b[:\s]*/gi, "").trim(),
    )
    .filter(Boolean);

  const academicItems: string[] = [];
  const licenseItems: string[] = [];
  const certItems: string[] = [];
  const expItems: string[] = [];

  for (const item of reqItems) {
    const up = item.toUpperCase();
    if (/LICEN[CS]I/i.test(item)) {
      licenseItems.push(item);
    } else if (/CERTIFIC/i.test(item)) {
      certItems.push(item);
    } else if (/EXPERIEN/i.test(item)) {
      expItems.push(item);
    } else if (/BACHILLERATO|DIPLOMA|GRADO|T[ÍI]TULO|ESTUDIOS/i.test(item)) {
      academicItems.push(item);
    } else {
      academicItems.push(item);
    }
  }

  const academic = academicItems.join("; ");
  const license = licenseItems.join("; ");
  const certs = certItems.join("; ");
  const exp = expItems.join("; ");

  const compText = buckets.compensation.join("; ");
  const comp = parseLegacyCompensation(compText);
  const convertCity = toKebabIfMulti(sucursal, { lowercaseSingle: true });

  const modern: Record<string, string> = {
    code: String(code || ""),
    vacancy: CONVERT_CAPITALIZE(vacancy),
    industry: "",
    location: buckets.alt_city[0] || "",
    min_salary: comp.min_salary == null ? "" : String(comp.min_salary),
    max_salary: comp.max_salary == null ? "" : String(comp.max_salary),
    hoursJob: buckets.schedule.join("; "),
    academicRequirements: academic,
    licenseRequirements: license,
    certificateRequirements: certs,
    experienceRequirements: exp,
    typeOfEmployment: "Full-time",
    skills: "",
    benefits: "",
    regionalOffice: convertCity,
    linkToApply: linkTypeform || "",
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
    slug: toSlug(`${vacancy}-${sucursal}`),
    payment_frequency: comp.payment_frequency ?? "",
    created_at: "",
  };

  return modern;
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
  const reqItems = buckets.requirements
    .flatMap((r) => r.split(/[,;|]/))
    .map((s) =>
      s.replace(/\b(requisitos?|requerimientos?)\b[:\s]*/gi, "").trim(),
    )
    .filter(Boolean);

  const academicItems: string[] = [];
  const licenseItems: string[] = [];
  const certItems: string[] = [];
  const expItems: string[] = [];

  for (const item of reqItems) {
    const up = item.toUpperCase();
    if (/LICEN[CS]I/i.test(item)) {
      licenseItems.push(item);
    } else if (/CERTIFIC/i.test(item)) {
      certItems.push(item);
    } else if (/EXPERIEN/i.test(item)) {
      expItems.push(item);
    } else if (/BACHILLERATO|DIPLOMA|GRADO|T[ÍI]TULO|ESTUDIOS/i.test(item)) {
      academicItems.push(item);
    } else {
      // Si no coincide con ninguna categoría específica, va a academic por defecto
      academicItems.push(item);
    }
  }

  const academic = academicItems.join("; ");
  const license = licenseItems.join("; ");
  const certs = certItems.join("; ");
  const exp = expItems.join("; ");

  const compText = buckets.compensation.join("; ");
  const comp = parseLegacyCompensation(compText);
  const convertCity = toKebabIfMulti(city, { lowercaseSingle: true });

  const FORM_SANTURCE = "https://ctspr.typeform.com/to/ZUNTWj";
  const FORM_LAS_PIEDRAS = "https://ctspr.typeform.com/to/BtYyWuqq";
  const FORM_SAN_GERMAN = "https://ctspr.typeform.com/to/wBjjgLk7";
  const FORM_BARCELONETA = "https://ctspr.typeform.com/to/tkuaVHCH";

  const SelectForm = () => {
    switch (convertCity) {
      case "santurce":
        return FORM_SANTURCE;
      case "las-piedras":
        return FORM_LAS_PIEDRAS;
      case "san-german":
        return FORM_SAN_GERMAN;
      case "barceloneta":
        return FORM_BARCELONETA;
      default:
        return "";
    }
  };

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
    linkToApply: SelectForm(),
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
 * Detecta si el CSV tiene el nuevo formato con headers específicos:
 * Orden, Labor Description, Sucursal, Link Typeform, Location, Experience, Education, Description
 */
export function looksLikeNewCSVFormat(fields: string[] = []) {
  const f = new Set(fields.map((s) => s.trim().toLowerCase()));
  const newFormatHeaders = [
    "orden",
    "labor description",
    "location",
    "description",
  ];
  // Si tiene al menos 3 de estos headers, es el nuevo formato
  const matches = newFormatHeaders.filter((h) => f.has(h)).length;
  return matches >= 3;
}

/**
 * Heurística: decide si el archivo es del formato NUEVO o LEGACY.
 * - Nuevo: tiene headers "modernos" (ej. 'vacancy', 'industry', etc.)
 * - Legacy: no tiene headers o los headers son números/textos "raros" y la 4ta columna es un blob.
 */
export function looksLikeModernHeaders(fields: string[] = []) {
  const f = new Set(fields.map((s) => s.trim().toLowerCase()));
  const mustHave = ["code", "vacancy", "location"]; // mínimos razonables
  return mustHave.every((k) => f.has(k));
}

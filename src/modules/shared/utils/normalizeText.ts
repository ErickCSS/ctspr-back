/**
 * Normaliza texto removiendo acentos y convirtiendo a minúsculas
 * Útil para búsquedas insensibles a acentos y mayúsculas
 *
 * @param text - Texto a normalizar
 * @returns Texto normalizado sin acentos y en minúsculas
 *
 * @example
 * normalizeText("José García") // "jose garcia"
 * normalizeText("PROGRAMACIÓN") // "programacion"
 */
export function normalizeText(text: string): string {
  if (!text) return "";

  return text
    .toLowerCase()
    .normalize("NFD") // Descompone caracteres con acentos
    .replace(/[\u0300-\u036f]/g, "") // Remueve los acentos
    .trim();
}

/**
 * Compara dos textos de forma normalizada (sin acentos ni mayúsculas)
 *
 * @param text1 - Primer texto
 * @param text2 - Segundo texto
 * @returns true si los textos son iguales después de normalizar
 */
export function normalizedIncludes(text: string, search: string): boolean {
  return normalizeText(text).includes(normalizeText(search));
}

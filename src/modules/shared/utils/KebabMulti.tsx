export function toKebabIfMulti(
  input: string,
  { lowercaseSingle = false }: { lowercaseSingle?: boolean } = {},
) {
  if (!input) return "";

  // 1) Normaliza y quita acentos
  const noDiacritics = input.normalize("NFD").replace(/\p{Diacritic}/gu, "");

  // 2) Extrae "palabras" (letras o números) ignorando signos
  const tokens = noDiacritics.match(/[\p{L}\p{N}]+/gu) || [];

  if (tokens.length <= 1) {
    const single = tokens[0] ?? "";
    return lowercaseSingle ? single.toLowerCase() : single;
  }

  // 3) 2+ palabras → kebab-case
  return tokens.map((t) => t.toLowerCase()).join("-");
}

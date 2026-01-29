import { SELECT_LOCATION } from "@modules/shared/lib/SelectInifo";

export const CONVERT_UPPER = (str: string) => {
  const separateWords = str.includes("-") ? str.replace("-", " ") : str;

  return separateWords.charAt(0).toUpperCase() + separateWords.slice(1);
};

export const CONVERT_CAPITALIZE = (str: string) => {
  const separateWords = str.includes("-") ? str.replace("-", " ") : str;

  return separateWords
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const createDelayedPromise = (delay: number = 2000) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

/**
 * Obtiene el label correcto (con tildes) de una ciudad desde SELECT_LOCATION
 * Normaliza acentos para hacer la comparación
 */
export const getCityLabel = (cityValue: string): string => {
  if (!cityValue) return "";

  // Normalizar el valor de entrada (remover acentos)
  const normalizedInput = cityValue
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  // Buscar la ciudad en SELECT_LOCATION
  const city = SELECT_LOCATION.find((location: any) => {
    const normalizedValue = location.value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const normalizedLabel = location.label
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    return (
      normalizedValue === normalizedInput || normalizedLabel === normalizedInput
    );
  });

  // Retornar el label con tildes correctas, o el valor original si no se encuentra
  return city ? city.label : CONVERT_CAPITALIZE(cityValue);
};

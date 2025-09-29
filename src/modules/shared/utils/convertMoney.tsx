export interface FormatOptions {
  decimalPlaces?: number;
}

export const CONVERT_MONEY = (
  money: number,
  { decimalPlaces }: FormatOptions = {},
) => {
  if (money === null || money === undefined) return "";

  const num = typeof money === "string" ? parseFloat(money) : money;
  if (isNaN(num)) return "";

  const useAbbreviation = Math.abs(num) >= 1000;
  const dp =
    typeof decimalPlaces === "number" ? decimalPlaces : useAbbreviation ? 1 : 0;

  if (!useAbbreviation) {
    const [intPart, fracPart] = num.toFixed(dp).split(".");
    const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fracPart ? `${withThousands}.${fracPart}` : withThousands;
  }

  const abbreviations = [
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "K" },
  ];
  const { value: div, symbol } = abbreviations.find(
    (item) => Math.abs(num) >= item.value,
  )!;

  // Fija decimales en la abreviación según dp
  const formatted = (num / div).toFixed(dp).replace(/\.0+$/, ""); // si frac 0, lo eliminamos
  return `${formatted}${symbol}`;
};

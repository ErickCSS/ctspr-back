export const CONVERT_MONEY = (money: number) => {
  return money.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
};

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

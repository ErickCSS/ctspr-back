export const CONVERT_UPPER = (str: string) => {
  const separateWords = str.includes("-") ? str.replace("-", " ") : str;

  return separateWords.charAt(0).toUpperCase() + separateWords.slice(1);
};

export const createDelayedPromise = (delay: number = 2000) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

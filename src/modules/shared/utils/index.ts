export const CONVERT_UPPER = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const createDelayedPromise = (delay: number = 2000) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

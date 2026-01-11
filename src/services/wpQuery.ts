interface WpQueryProps {
  query: string;
  variables?: object;
}

export const WpQuery = async ({ query, variables }: WpQueryProps) => {
  const API_URL =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    `https://blog.ctspr.com/graphql`;
  const MAX_RETRIES = 3;
  let lastError: any;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const responsePosts = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Referer: "https://www.ctspr.com/",
          Origin: "https://www.ctspr.com",
        },
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!responsePosts.ok) {
        throw new Error(`Failed to fetch data: ${responsePosts.statusText}`);
      }

      const { data } = await responsePosts.json();

      if (!data) {
        throw new Error("No data returned from GraphQL");
      }

      return data;
    } catch (error: any) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed:`, error.message);

      if (
        error.message.includes("fetch failed") ||
        error.code === "ECONNRESET" ||
        error.code === "ETIMEDOUT" ||
        error.name === "AbortError"
      ) {
        if (attempt < MAX_RETRIES - 1) {
          const delay = 2000 * (attempt + 1); // Exponential backoff
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }
      break;
    }
  }

  throw lastError;
};

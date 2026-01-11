interface WpQueryProps {
  query: string;
  variables?: object;
}

export const WpQuery = async ({ query, variables }: WpQueryProps) => {
  const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || `https://blog.ctspr.com/graphql`;
  const MAX_RETRIES = 3;
  let lastError: any;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const responsePosts = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
      });

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

      // Only retry on network errors or connection resets
      if (error.message.includes('fetch failed') || error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
        if (attempt < MAX_RETRIES - 1) {
          const delay = 1000 * (attempt + 1);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }
      break;
    }
  }

  throw lastError;
};

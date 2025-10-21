interface WpQueryProps {
  query: string;
  variables?: object;
}

export const WpQuery = async ({ query, variables }: WpQueryProps) => {
  const API_URL = process.env.API_URL;

  const responsePosts = await fetch(`https://blog.ctspr.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!responsePosts.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = await responsePosts.json();

  return data;
};

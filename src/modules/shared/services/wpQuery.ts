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
    const errorText = await responsePosts.text();
    throw new Error(
      `Failed to fetch data: ${responsePosts.status} - ${errorText}`,
    );
  }

  const responseData = await responsePosts.json();

  if (responseData.errors) {
    throw new Error(`GraphQL error: ${JSON.stringify(responseData.errors)}`);
  }

  const { data } = responseData;

  return data;
};

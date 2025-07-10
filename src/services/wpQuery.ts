interface WpQueryProps {
  query: string;
  variables?: object;
}

export const WpQuery = async ({ query, variables }: WpQueryProps) => {
  const API_URL = process.env.API_URL;

  const responsePosts = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!responsePosts.ok) {
    console.log(responsePosts);
    return {};
  }

  const { data } = await responsePosts.json();

  return data;
};

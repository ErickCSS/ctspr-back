export const TotalPost = async () => {
  /*
  const url =
    "https://blog.ctspr.com/wp-json/wp/v2/posts?per_page=6&categories=1";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching totals: ${response.status}`);
  }

  const total = Number(response.headers.get("X-WP-Total"));
  const totalPages = Number(response.headers.get("X-WP-TotalPages"));

  return { total, totalPages };
  */
  return { total: 10, totalPages: 2 };
};

export const TotalPost = async () => {
  const response = await fetch(
    "https://blog.ctspr.com/wp-json/wp/v2/posts?per_page=6&categories=1",
  );

  if (!response.ok) {
    throw new Error(`Error fetching totals: ${response.status}`);
  }

  const total = Number(response.headers.get("X-WP-Total"));
  const totalPages = Number(response.headers.get("X-WP-TotalPages"));

  return { total, totalPages };
};

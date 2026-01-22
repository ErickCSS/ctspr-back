export const sliderQuery = `query getPosts($lang: String!) {
  posts(where: {categoryName: $lang}) {
    nodes {
      id
      title
      slug
      content
      excerpt
      categories {
        nodes {
          name
        }
      }

      featuredImage {
        node {
          sourceUrl
        }
      }
      date
    }
  }
}`;

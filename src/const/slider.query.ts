export const sliderQuery = `query getPosts {
  posts(where: {categoryName:"slider"}) {
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

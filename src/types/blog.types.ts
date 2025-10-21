export interface BlogProps {
  posts: {
    edges: Post[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface Post {
  cursor: string;
  node: {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    dateGmt: string;
    slug: string;
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
  };
}

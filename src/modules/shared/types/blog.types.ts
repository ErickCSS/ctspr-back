export interface BlogProps {
  posts: {
    nodes: Post[];
  };
}

export interface Post {
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
}

export interface HeroProps {
  posts: {
    nodes: SliderProps[];
  };
}

export interface SliderProps {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  categories: {
    nodes: {
      name: string;
    }[];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  date: string;

  youtubeVideoId?: string;

  isVideo?: boolean;
}

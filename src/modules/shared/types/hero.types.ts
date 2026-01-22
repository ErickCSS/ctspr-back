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
<<<<<<< HEAD:src/types/hero.types.ts

  youtubeVideoId?: string;

=======
  routeVideo?: string;
>>>>>>> fase2-developer:src/modules/shared/types/hero.types.ts
  isVideo?: boolean;
}

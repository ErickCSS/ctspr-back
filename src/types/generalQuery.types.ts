export interface MediaProps {
  mediaItems: {
    nodes: {
      file: string;
      id: string;
      title: string;
      link: string;
    }[];
  };
}

export interface SucursalesProps {
  posts: {
    nodes: {
      id: string;
      title: string;
      content: string;
      excerpt: string;
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      };
    }[];
  };
}

export interface TestimoniosProps {
  posts: {
    nodes: {
      id: string;
      title: string;
      content: string;
      excerpt: string;
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      };
    }[];
  };
}

export interface WhyChooseUsProps {
  posts: {
    nodes: {
      id: string;
      title: string;
      content: string;
      excerpt: string;
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      };
    }[];
  };
}

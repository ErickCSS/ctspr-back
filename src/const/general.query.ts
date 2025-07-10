export const queryMedia = ({ title }: { title: string }) => {
  return `query media {
mediaItems(where:{title: "${title}"}){
  nodes{
    file
    id
    title
    link
  }
}
}`;
};

export const querySucursales = `query sucursales {
  posts(where: {categoryName:"sucursales"}){
    nodes{
      id
      title
      content
    	excerpt
      featuredImage{
        node{
          sourceUrl
        }
      }
    }
  }
}`;

export const queryTestimonios = `query testimonios {
  posts(where: {categoryName:"Testimonios"}){
    nodes{
      id
      title
      content
    	excerpt
      featuredImage{
        node{
          sourceUrl
        }
      }
    }
  }
}`;

export const queryWhyChooseUs = `query WhyChooseUs {
  posts(where: {categoryName:"Porque Elegirnos"}){
    nodes{
      id
      title
      content
      featuredImage{
        node{
          sourceUrl
        }
      }
    }
  }
}`;

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

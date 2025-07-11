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

export const queryAbout = `query About {
  posts(where: {categoryName:"Nosotros"}){
    nodes{
      id
      title
      content
    }
  }
}`;

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

export const queryHero = (title: string) => {
  return `query Hero {
  posts(where: {categoryName:"hero", title:"${title}"}) {
    nodes {
      id
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}`;
};

export const queryAfiliados = `query Afiliados {
  posts(where: {categoryName:"afiliaciones", notIn:"cG9zdDoxMjQ="}){
    nodes{
      id
      title
      featuredImage{
        node{
          sourceUrl
        }
      }
    }
  }
}`;

export const queryTitle = `query titleAfiliados {
  posts(where: {categoryName:"afiliaciones", in:"cG9zdDoxMjQ="}){
    nodes{
      id
      title
    }
  }
}`;

export const queryValues = `query values {
  posts(where: {categoryName:"valores", notIn:"cG9zdDoxNDc="}){
    nodes{
      id
      title
      featuredImage{
        node{
          sourceUrl
        }
      }
    }
  }
}`;

export const queryTitleValues = `query titleValues {
  posts(where: {categoryName:"valores", in:"cG9zdDoxNDc="}){
    nodes{
      id
      title
			content
    }
  }
}`;

export const querySomosNosotros = `query somosNosotros {
  posts(where: {categoryName:"somos"}){
    nodes{
      id
      title
			content
    }
  }
}`;

export const querySomosTransformamos = `query somosTransformamos {
  posts(where: {categoryName:"transformamos"}){
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

export const queryServiciosContent = `query servicios {
  posts(where: {categoryName:"servicios", in:"cG9zdDoxNzI="}){
    nodes{
      id
			content
    }
  }
}`;

export const queryPropuestaValorTitle = `query PropuestaValorTitle {
  posts(where: {categoryName:"Propuesta Valor", in: "cG9zdDoxNjE="}){
    nodes{
      title
      id
			content
    }
  }
}`;

export const queryPropuestaValor = `query PropuestaValor {
  posts(where: {categoryName:"Propuesta Valor", notIn: "cG9zdDoxNjE="}){
    nodes{
      title
      id
      featuredImage{
        node {
          sourceUrl
        }
      }
    }
  }
}`;

export const queryServiciosList = `query ServiciosList {
  posts(where: {categoryName:"Servicios", notIn:["cG9zdDoxOTE=", "cG9zdDoxNzI=", "cG9zdDoxODY="]}){
    nodes{
      title
      id
			content
      featuredImage{
        node {
          sourceUrl
        }
      }
    }
  }
}`;

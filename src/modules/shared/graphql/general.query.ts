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

export const queryAbout = `query About($category: String!) {
  posts(where: {categoryName: $category}){
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
  posts(where: {categoryName:"Testimonios"}, first: 50){
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

export const queryWhyChooseUs = `query WhyChooseUs($category: String!) {
  posts(where: {categoryName:$category}){
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
  return `query Hero($category: String!) {
  posts(where: {categoryName:$category, title:"${title}"}) {
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

export const queryAfiliados = `query Afiliados($category: String!, $notIn: [ID]!) {
  posts(where: {categoryName:$category, notIn:$notIn}){
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

export const queryTitle = `query titleAfiliados($category: String!, $in: [ID]!) {
  posts(where: {categoryName:$category, in:$in}){
    nodes{
      id
      title
    }
  }
}`;

export const queryValues = `query values($category: String!, $notIn: [ID]!) {
  posts(where: {categoryName:$category, notIn:$notIn}){
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

export const queryTitleValues = `query titleValues($category: String!, $in: [ID]!) {
  posts(where: {categoryName:$category, in:$in}){
    nodes{
      id
      title
			content
    }
  }
}`;

export const querySomosNosotros = `query somosNosotros($category: String!) {
  posts(where: {categoryName:$category}){
    nodes{
      id
      title
			content
    }
  }
}`;

export const querySomosTransformamos = `query somosTransformamos($category: String!) {
  posts(where: {categoryName:$category}){
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

export const queryServiciosContent = `query servicios($category: String!, $in: [ID]!) {
  posts(where: {categoryName:$category, in:$in}){
    nodes{
      id
			content
    }
  }
}`;

export const queryPropuestaValorTitle = `query PropuestaValorTitle($category: String!, $in: [ID]!) {
  posts(where: {categoryName:$category, in:$in}){
    nodes{
      title
      id
			content
    }
  }
}`;

export const queryPropuestaValor = `query PropuestaValor($category: String!, $notIn: [ID]!) {
  posts(where: {categoryName:$category, notIn:$notIn}){
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

export const queryServiciosList = `query ServiciosList($category: String!, $notIn: [ID]!) {
  posts(where: {categoryName:$category, notIn:$notIn}){
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

export const queryServicioSeguridadIntegral = `query ServicioSeguridadIntegral($category: String!, $in: [ID]!) {
  posts(where: {categoryName:$category, in:$in}){
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

export const queryServiciosMedida = `query ServiciosMedida($category: String!, $in: [ID]!) {
  posts(where: {categoryName:$category, in:$in}){
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

export const queryServiciosCallActions = `query ServiciosCallAction($category: String!) {
  posts(where: {categoryName:$category}){
    nodes{
      title
      id
			content
      excerpt
      featuredImage{
        node {
          sourceUrl
        }
      }
    }
  }
}`;

export const queryRecursosHumanoTitle = `query RecursosHumanosTitle($category: String!, $in: [ID]!) {
  posts(where: {categoryName:$category, in:$in}){
    nodes{
      title
      id
			content
    }
  }
}`;

export const queryRecursosHumanos = `query RecursosHumanos($category: String!, $notIn: [ID]!) {
  posts(where: {categoryName:$category, notIn:$notIn}){
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

export const queryServiciosPeritajeIndustrias = `query PeritajeIndustrias($category: String!) {
  posts(where: {categoryName:$category}){
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

export const querySeguridadSaludOcupacional = `query SeguridadSaludOcupacional($category: String!) {
  posts(where: {categoryName:$category}){
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

export const queryEmpleosTitle = `query EmpleosTitle {
  posts(where: {categoryName:"empleos", in:"cG9zdDoyMTk="}){
    nodes{
      title
      id
			content
    }
  }
}`;

export const queryEmpleos = `query Empleos {
  posts(where: {categoryName:"empleos", in:"cG9zdDoyMjI="}){
    nodes{
      title
      id
			content
    }
  }
}`;

export const queryEmpleosBeneficios = `query Beneficios {
  posts(where: {categoryName:"empleos", in:"cG9zdDoyMjU="}){
    nodes{
      title
      id
			content
      featuredImage{
        node{
          sourceUrl
        }
      }
    }
  }
}`;

export const queryBeneficiosUnete = `query BeneficiosUnete {
  posts(where: {categoryName:"unete"}){
    nodes{
      title
      id
			content
      excerpt
    }
  }
}`;

export const queryBlogObjetives = `query BlogObjetives {
  posts(where: {categoryName:"blog-page"}){
    nodes{
      title
      id
			content
    }
  }
}`;

export const queryEquipoAdministrativo = `query EquipoAdministrativo($category: String!) {
  posts(where:{categoryName:$category}, first: 30){
    nodes{
      title
      id
			content
      featuredImage{
        node{
          sourceUrl
        }
      }
    }
  }
}

`;

export const queryEquipoGerencial = `query EquipoGerencial($category: String!) {
  posts(where:{categoryName:$category}, first: 30){
    nodes{
      title
      id
			content
      featuredImage{
        node{
          sourceUrl
        }
      }
    }
  }
}
`;

export const queryPreguntasFrecuentesEmpresas = `query PreguntasFrecuentesEmpresas($category: String!) {
  posts(where:{categoryName:$category}){
    nodes{
      title
      id
			content
    }
  }
}`;

export const queryPreguntasFrecuentesCandidatos = `query PreguntasFrecuentesCandidatos {
  posts(where:{categoryName:"preguntas-frecuentes-candidatos"}){
    nodes{
      title
      id
			content
    }
  }
}`;

export const queryConoceSucursal = `query ConoceSucursal {
  posts(where:{categoryName:"conoce-sucursal"}, first: 38){
    nodes{
      title
      id
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

export const queryBlog = `query Blog(
  $category: String!
  $first: Int! = 6
  $after: String
) {
  posts(
    where: { categoryName: $category, orderby: { field: DATE, order: DESC } }
    first: $first
    after: $after
  ) {
    edges {
      cursor
      node {
        id
        title
        slug
        dateGmt
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
      hasPreviousPage
      startCursor
    }
  }
}`;

export const queryBlogBySlug = `query BlogBySlug($slug: String!) {
  posts(where: { categoryName: "blog", name: $slug }) {
    edges {
      node {
        id
        title
        slug
        dateGmt
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}`;

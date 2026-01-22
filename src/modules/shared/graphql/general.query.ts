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

export const queryServicioSeguridadIntegral = `query ServicioSeguridadIntegral {
  posts(where: {categoryName:"Servicios", in:["cG9zdDoxOTE="]}){
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

export const queryServiciosMedida = `query ServiciosMedida {
  posts(where: {categoryName:"Servicios", in:["cG9zdDoxODY="]}){
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

export const queryServiciosCallActions = `query ServiciosCallAction {
  posts(where: {categoryName:"call-action-servicios"}){
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

export const queryRecursosHumanoTitle = `query RecursosHumanosTitle {
  posts(where: {categoryName:"recursos-humanos", in:"cG9zdDoxOTg="}){
    nodes{
      title
      id
			content
    }
  }
}`;

export const queryRecursosHumanos = `query RecursosHumanos {
  posts(where: {categoryName:"recursos-humanos", notIn:"cG9zdDoxOTg="}){
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

export const queryServiciosPeritajeIndustrias = `query PeritajeIndustrias {
  posts(where: {categoryName:"peritaje-industrias"}){
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

export const querySeguridadSaludOcupacional = `query SeguridadSaludOcupacional {
  posts(where: {categoryName:"seguridad-salud-ocupacional"}){
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

export const queryEquipoAdministrativo = `query EquipoAdministrativo {
  posts(where:{categoryName:"equipo-directivo"}, first: 30){
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

export const queryEquipoGerencial = `query EquipoGerencial {
  posts(where:{categoryName:"equipo-gerencial"}, first: 30){
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

export const queryPreguntasFrecuentesEmpresas = `query PreguntasFrecuentesEmpresas {
  posts(where:{categoryName:"preguntas-frecuentes-empresas"}){
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

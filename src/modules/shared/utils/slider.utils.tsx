import { SliderProps } from "@modules/shared/types/hero.types";

/**
 * Crea un slide de video de YouTube para el slider
 * @param videoId - ID del video de YouTube
 * @param title - Título del slide
 * @param excerpt - Descripción/extracto del slide
 * @param content - Contenido adicional (puede incluir teléfonos, etc.)
 * @returns SliderProps configurado para video
 */
export const createYouTubeSlide = (
  videoId: string,
  title: string,
  excerpt: string,
  content: string = "",
): SliderProps => {
  return {
    id: `video-${videoId}`,
    title,
    slug: `video-${videoId}`,
    content,
    excerpt,
    categories: {
      nodes: [{ name: "Video" }],
    },
    featuredImage: {
      node: {
        sourceUrl: "", // No se usa para videos
      },
    },
    date: new Date().toISOString(),
    routeVideo: videoId,
    isVideo: true,
  };
};

/**
 * Combina slides de WordPress con slides de video de YouTube
 * @param wordpressSlides - Slides existentes de WordPress
 * @param videoSlides - Slides de video a agregar
 * @param insertPosition - Posición donde insertar los videos (por defecto al inicio)
 * @returns Array combinado de slides
 */
export const combineSlides = (
  wordpressSlides: SliderProps[],
  videoSlides: SliderProps[],
  insertPosition: number = 0,
): SliderProps[] => {
  const combinedSlides = [...wordpressSlides];

  // Insertar videos en la posición especificada
  videoSlides.forEach((videoSlide, index) => {
    combinedSlides.splice(insertPosition + index, 0, videoSlide);
  });

  return combinedSlides;
};

/**
 * Función de conveniencia para agregar un video específico al slider
 * @param wordpressSlides - Slides existentes de WordPress
 * @returns Array de slides con el video agregado
 */
export const addCTSVideoToSlider = (
  wordpressSlides: SliderProps[],
): SliderProps[] => {
  const ctsVideoSlide = createYouTubeSlide(
    "QffcVnTbff4",
    "Conoce más sobre CTS PR",
    "Descubre nuestros servicios y cómo podemos ayudarte",
    "Contáctanos para más información",
  );

  return combineSlides(wordpressSlides, [ctsVideoSlide], 0);
};

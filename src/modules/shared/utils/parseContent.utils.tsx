import parse from "html-react-parser";
import Link from "next/link";
import { ReactElement } from "react";

// Tipos para hacer el código más mantenible
type DomNode = {
  type: string;
  name?: string;
  children?: DomNode[];
  data?: string;
  attribs?: Record<string, string>;
};

type TransformConfig = {
  className?: string;
  additionalProps?: Record<string, string>;
};

type TransformFunction = (
  text: string,
  config?: TransformConfig,
) => ReactElement | undefined;

// Objeto que contiene diferentes transformaciones disponibles
const transformations: Record<
  string,
  {
    pattern: RegExp;
    transform: TransformFunction;
  }
> = {
  phone: {
    pattern: /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/,
    transform: (text: string, config?: TransformConfig) => {
      const rawPhone = text.replace(/\D/g, "");
      // Formatear el teléfono con guiones para el href: XXX-XXX-XXXX
      const formattedPhone = rawPhone.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "$1-$2-$3",
      );
      return (
        <Link
          className={
            config?.className || "mt-2 text-4xl font-normal text-white"
          }
          href={`tel:${formattedPhone}`}
          {...config?.additionalProps}
        >
          {text}
        </Link>
      );
    },
  },
  email: {
    pattern: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
    transform: (text: string, config?: TransformConfig) => {
      return (
        <Link
          className={
            config?.className || "mt-2 text-4xl font-normal text-white"
          }
          href={`mailto:${text}`}
          {...config?.additionalProps}
        >
          {text}
        </Link>
      );
    },
  },
};

/**
 * Parsea contenido HTML y transforma elementos específicos según las reglas definidas
 * @param content Contenido HTML a transformar
 * @param options Opciones de configuración
 * @returns Contenido transformado
 */
export const parseContent = (
  content: string,
  options?: {
    transformTypes?: string[];
    nodeType?: string;
    nodeName?: string;
    configs?: Record<string, TransformConfig>;
  },
) => {
  const {
    transformTypes = Object.keys(transformations),
    nodeType = "tag",
    nodeName = "p",
    configs = {},
  } = options || {};

  return parse(content, {
    replace: (domNode: DomNode) => {
      if (
        domNode.type === nodeType &&
        domNode.name === nodeName &&
        domNode.children &&
        domNode.children.length === 1 &&
        domNode.children[0].type === "text"
      ) {
        const text = domNode.children[0].data?.trim() || "";

        // Buscar si el texto coincide con alguna de las transformaciones seleccionadas
        for (const type of transformTypes) {
          const transformation = transformations[type];
          if (transformation && transformation.pattern.test(text)) {
            return transformation.transform(text, configs[type]);
          }
        }
      }

      return undefined;
    },
  });
};

/**
 * Función auxiliar para transformar solo números de teléfono (mantiene compatibilidad con código existente)
 */
export const parsePhoneNumbers = (
  content: string,
  config?: TransformConfig,
) => {
  return parseContent(content, {
    transformTypes: ["phone"],
    configs: { phone: config || {} },
  });
};

/**
 * Normalizes a slug by decoding URL-encoded characters
 * This handles emojis and special characters that may be encoded in URLs
 *
 * @param slug - The slug from the URL (may contain encoded characters)
 * @returns The normalized slug that matches WordPress's internal slug format
 */
export function normalizeSlug(slug: string): string {
  try {
    // First, decode the URL-encoded slug
    // decodeURIComponent handles %XX encoded characters
    const decoded = decodeURIComponent(slug);

    // WordPress may store slugs with or without certain emoji modifiers
    // We need to try both the original and a normalized version
    return decoded;
  } catch (error) {
    // If decoding fails, return the original slug
    console.error("Error decoding slug:", error);
    return slug;
  }
}

/**
 * Creates multiple slug variations to try when querying WordPress
 * This helps handle cases where emojis are encoded differently
 *
 * @param slug - The slug from the URL
 * @returns An array of possible slug variations
 */
export function getSlugVariations(slug: string): string[] {
  const variations = new Set<string>();

  // Add the original slug
  variations.add(slug);

  try {
    // Add the decoded version
    const decoded = decodeURIComponent(slug);
    variations.add(decoded);

    // Remove variation selectors (U+FE0F) which are sometimes stripped
    // These are invisible characters that modify emoji appearance
    const withoutVariationSelector = decoded.replace(/\uFE0F/g, "");
    variations.add(withoutVariationSelector);

    // Also try with variation selectors explicitly added to emojis
    const withVariationSelector = decoded.replace(
      /([\u{1F300}-\u{1F9FF}])/gu,
      "$1\uFE0F",
    );
    variations.add(withVariationSelector);
  } catch (error) {
    console.error("Error creating slug variations:", error);
  }

  return Array.from(variations);
}

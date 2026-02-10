"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { WpQuery } from "@modules/shared/services/wpQuery";
import { queryBlog } from "@modules/shared/graphql/general.query";
import { BlogProps } from "@modules/shared/types/blog.types";
import { useLocale } from "next-intl";

interface UseBlogDataReturn {
  blog: BlogProps | null;
  loading: boolean;
  error: string | null;
}

export const useBlogData = (page: number): UseBlogDataReturn => {
  const [blog, setBlog] = useState<BlogProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cursorsRef = useRef<{ [key: number]: string }>({});
  const locale = useLocale();

  const fetchPage = useCallback(
    async (targetPage: number): Promise<BlogProps> => {
      const variables: any = {
        category: `blog-${locale.toLowerCase()}`,
        first: 6,
      };

      // Si necesitamos un cursor para la página y no lo tenemos,
      // debemos buscar secuencialmente desde la última página conocida
      if (targetPage > 1) {
        const cursorPage = targetPage - 1;
        if (!cursorsRef.current[cursorPage]) {
          // Buscar secuencialmente las páginas que faltan
          let lastKnownPage = 0;
          for (let i = cursorPage; i >= 1; i--) {
            if (cursorsRef.current[i]) {
              lastKnownPage = i;
              break;
            }
          }

          // Fetch páginas intermedias para obtener cursores
          for (let i = lastKnownPage + 1; i <= cursorPage; i++) {
            const intermediateVars: any = {
              category: `blog-${locale.toLowerCase()}`,
              first: 6,
            };
            if (i > 1 && cursorsRef.current[i - 1]) {
              intermediateVars.after = cursorsRef.current[i - 1];
            }
            const intermediateData: BlogProps = await WpQuery({
              query: queryBlog,
              variables: intermediateVars,
            });
            if (intermediateData.posts.pageInfo.endCursor) {
              cursorsRef.current[i] = intermediateData.posts.pageInfo.endCursor;
            }
          }
        }

        // Ahora debemos tener el cursor
        const after = cursorsRef.current[cursorPage];
        if (after) {
          variables.after = after;
        }
      }

      const data: BlogProps = await WpQuery({
        query: queryBlog,
        variables,
      });

      // Guardar el cursor de la página actual para navegación futura
      if (data.posts.pageInfo.endCursor) {
        cursorsRef.current[targetPage] = data.posts.pageInfo.endCursor;
      }

      return data;
    },
    [locale],
  );

  useEffect(() => {
    let cancelled = false;

    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPage(page);

        if (!cancelled) {
          setBlog(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Error loading blog data",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchBlogData();

    return () => {
      cancelled = true;
    };
  }, [page, fetchPage]);

  return { blog, loading, error };
};

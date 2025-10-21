"use client";

import { useState, useEffect } from "react";
import { WpQuery } from "@/services/wpQuery";
import { queryBlog } from "@/graphql/general.query";
import { BlogProps } from "@/types/blog.types";

interface UseBlogDataReturn {
  blog: BlogProps | null;
  loading: boolean;
  error: string | null;
  cursors: { [key: number]: string }; // Almacena cursores para cada página
}

interface BlogVariables {
  category: string;
  first: number;
  after?: string;
}

export const useBlogData = (page: number): UseBlogDataReturn => {
  const [blog, setBlog] = useState<BlogProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cursors, setCursors] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Determinar el cursor para la página actual
        const after = page > 1 ? cursors[page - 1] : undefined;

        // Construir variables requeridas por el query
        const variables: BlogVariables = {
          category: "blog",
          first: 6,
        };

        // Solo agregar 'after' si existe y no es undefined
        if (after) {
          variables.after = after;
        }

        const data: BlogProps = await WpQuery({
          query: queryBlog,
          variables,
        });

        setBlog(data);

        // Guardar el cursor de la página actual para navegación futura
        if (data.posts.pageInfo.endCursor) {
          setCursors((prev) => {
            // Solo actualizar si el cursor cambió
            if (prev[page] !== data.posts.pageInfo.endCursor) {
              return {
                ...prev,
                [page]: data.posts.pageInfo.endCursor,
              };
            }
            return prev;
          });
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error loading blog data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [page]);

  return { blog, loading, error, cursors };
};

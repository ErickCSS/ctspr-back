import { create } from "zustand";

interface PaginationBlog {
  page: number;
  setPage: (page: number) => Promise<void>;
}

export const usePaginationBlog = create<PaginationBlog>((set) => ({
  page: 1,
  setPage: async (page) => {
    set({ page });
  },
}));

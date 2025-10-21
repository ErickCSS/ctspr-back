"use client";

import Pagination from "@modules/shared/components/pagination/Pagination";
import { BlogCard } from "./BlogCard";
import { usePaginationBlog } from "@modules/Blog/store/usePaginationBlog";
import { useBlogData } from "@modules/Blog/hooks/useBlogData";
import { Pagination as PaginationType } from "@modules/shared/types/pagination.type";
import { BlogCardSkeleton } from "@modules/shared/skeletons/CardBlogSkeleton";

interface BlogListProps {
  totalPages: number;
}

export const BlogList = ({ totalPages }: BlogListProps) => {
  const { page, setPage } = usePaginationBlog();
  const { blog, loading, error } = useBlogData(page);

  const pagination: PaginationType = {
    records: totalPages * 6,
    items_per_page: 6,
    previous_page: page - 1,
    current_page: page,
    next_page: page + 1,
    total_pages: totalPages,
  };

  if (loading) {
    return (
      <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 flex justify-center">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!blog || !blog.posts.edges.length) {
    return (
      <div className="mt-20 flex justify-center">
        <div className="text-lg">No hay posts disponibles</div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {blog.posts.edges.map((post, index) => (
          <BlogCard key={post.node.id || index} post={post} />
        ))}
      </div>
      <Pagination pagination={pagination} page={page} setPage={setPage} />
    </>
  );
};

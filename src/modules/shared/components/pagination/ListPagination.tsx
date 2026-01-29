"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { Pagination } from "@modules/shared/types/pagination.type";

interface PaginationProps {
  pagination: Pagination;
  page: number;
  setPage: (page: number) => Promise<void>;
}

export const ListPagination = ({
  pagination,
  page,
  setPage,
}: PaginationProps) => {
  const router = useTransitionRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isDetailPage = useMemo(
    () => /^\/blog\/[^\/]+$/.test(pathname),
    [pathname],
  );
  const pageFromUrl = useMemo(
    () => (!isDetailPage ? searchParams.get("page") : null),
    [searchParams, isDetailPage],
  );

  const currentPage = useMemo(() => {
    if (pageFromUrl) return parseInt(pageFromUrl);
    return isDetailPage ? page : pagination?.current_page || page;
  }, [pageFromUrl, isDetailPage, pagination?.current_page, page]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    if (!isDetailPage) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", pageNumber.toString());
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  };

  const getPaginationRange = (
    currentPage: number,
    totalPages: number,
    maxVisible: number,
  ) => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = end - maxVisible + 1;
    }
    return Array.from({ length: maxVisible }, (_, i) => start + i);
  };

  const isActive = (page: number) => page === currentPage;

  const pageButton = (pageNumber: number) => (
    <button
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
      aria-current={isActive(pageNumber) ? "page" : undefined}
      className={`hover:bg-primaryColor flex size-[40px] cursor-pointer items-center justify-center rounded-xl font-semibold text-white transition-all duration-300 ${isActive(pageNumber) ? "bg-primaryColor" : "bg-zinc-400"}`}
    >
      {pageNumber}
    </button>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden items-center justify-center gap-x-5 lg:flex">
        <button
          onClick={() => handlePageChange(pagination.previous_page!)}
          disabled={!pagination?.previous_page}
          className="disabled:text-gray-400"
        >
          <IconArrowLeft />
        </button>

        <ul className="flex items-center justify-center gap-4">
          {getPaginationRange(
            currentPage,
            pagination?.total_pages || 0,
            10,
          ).map((pageNumber) => pageButton(pageNumber))}
        </ul>

        <button
          onClick={() => handlePageChange(pagination.next_page!)}
          disabled={!pagination?.next_page}
          className="disabled:text-gray-400"
        >
          <IconArrowRight />
        </button>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-center gap-x-8 lg:hidden">
        <button
          onClick={() => handlePageChange(pagination.previous_page!)}
          disabled={!pagination?.previous_page}
          className="flex size-10 items-center justify-center rounded-lg bg-zinc-400 text-white disabled:opacity-50"
        >
          <IconArrowLeft />
        </button>

        <div className="text-lg">
          {currentPage} / {pagination?.total_pages}
        </div>

        <button
          onClick={() => handlePageChange(pagination.next_page!)}
          disabled={!pagination?.next_page}
          className="flex size-10 items-center justify-center rounded-lg bg-zinc-400 text-white disabled:opacity-50"
        >
          <IconArrowRight />
        </button>
      </div>
    </>
  );
};

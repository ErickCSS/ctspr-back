"use client";

import { Suspense } from "react";
import { ListPagination } from "./ListPagination";
import type { Pagination } from "@modules/shared/types/pagination.type";

interface PaginationProps {
  pagination: Pagination;
  page: number;
  setPage: (page: number) => Promise<void>;
}

const Pagination = ({ pagination, page, setPage }: PaginationProps) => {
  return (
    <div className="mt-10 flex w-full items-center justify-center lg:-col-start-5 lg:-col-end-2">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <ListPagination pagination={pagination} page={page} setPage={setPage} />
      </Suspense>
    </div>
  );
};

export default Pagination;

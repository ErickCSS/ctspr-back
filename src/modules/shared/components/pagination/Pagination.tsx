import { ListPagination } from "./ListPagination";
import type { Pagination } from "@modules/shared/types/pagination.type";

const Pagination = ({ pagination }: { pagination: Pagination }) => {
  return (
    <div className="mt-10 flex w-full items-center justify-center lg:-col-start-5 lg:-col-end-2">
      <ListPagination pagination={pagination} />
    </div>
  );
};

export default Pagination;

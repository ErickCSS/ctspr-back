"use client";

import { DashboardTable } from "./DashboardTable";
import Pagination from "@modules/shared/components/pagination/Pagination";
import { useDashboardEmployeeFiltersStore } from "@modules/Dashboard/store/dahsEmployeeFiltersStore";

export const DashboardList = () => {
  const { pagination, page, setPage } = useDashboardEmployeeFiltersStore();
  return (
    <>
      <DashboardTable />
      <Pagination pagination={pagination} page={page} setPage={setPage} />
    </>
  );
};

export type Pagination = {
  records: number;
  items_per_page: number;
  previous_page: number | null;
  current_page: number;
  next_page: number | null;
  total_pages: number;
};

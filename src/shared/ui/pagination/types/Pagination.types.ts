export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  visiblePages?: number;
  onPageChange?: (page: number) => void;
}
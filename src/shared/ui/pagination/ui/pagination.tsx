import { FC, memo, useCallback, useMemo } from 'react';
import { setCurrentPage } from '@app/store/slices/products-slice';
import { useAppDispatch } from '@app/store/store.hooks.ts';
import cl from './pagination.module.scss';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  visiblePages?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: FC<IPaginationProps> = ({ currentPage, totalPages, visiblePages = 7, onPageChange }) => {
  const dispatch = useAppDispatch();

  const handlePageChange = useCallback(
    (page: number) => {
      if (onPageChange) {
        onPageChange(page);
      } else {
        dispatch(setCurrentPage(page));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [dispatch, onPageChange],
  );

  /*
   * Функция для рассчета отображаемых сраниц
   */
  const paginationRange = useMemo(() => {
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    startPage = Math.max(1, endPage - visiblePages + 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [currentPage, totalPages, visiblePages]);

  if (totalPages <= 1) return null;

  return (
    <div className={cl.container}>
      <nav className={cl.pagination} aria-label="Pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        {paginationRange.map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </nav>
    </div>
  );
};

export default memo(Pagination);
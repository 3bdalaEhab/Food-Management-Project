import { useState, useMemo } from 'react';
import { PAGINATION } from '@/config/constants';

export const usePagination = (items = [], itemsPerPage = PAGINATION.DEFAULT_PAGE_SIZE) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    return {
      currentPage,
      totalPages,
      currentItems,
      itemsPerPage,
      totalItems: items.length,
    };
  }, [items, itemsPerPage, currentPage]);

  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, paginationData.totalPages));
    setCurrentPage(pageNumber);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    ...paginationData,
    goToPage,
    nextPage,
    prevPage,
    setCurrentPage,
  };
};

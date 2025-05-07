import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@app/store/store.types.ts';

const selectProductsState = (state: RootState) => state.products;

/**
 * Получаем список продуктов на текущей странице
 */
export const selectPaginatedProducts = createSelector([selectProductsState], (productsState) => {
  const { allProducts, currentPage, itemsPerPage } = productsState;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return allProducts.slice(startIndex, endIndex);
});

/**
 * Получаем общее количество страниц
 */
export const selectTotalPages = createSelector([selectProductsState], (productsState) => {
  const { allProducts, itemsPerPage } = productsState;

  return Math.ceil(allProducts.length / itemsPerPage);
});
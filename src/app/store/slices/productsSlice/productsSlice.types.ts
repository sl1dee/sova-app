import type { IProduct } from '@shared/api/products/products.types.ts';

export interface IProductsState {
  priceMin: string;
  priceMax: string;
  currentPage: number;
  itemsPerPage: number;
  allProducts: IProduct[];
  isLoading: boolean;
  totalItems: number;
}
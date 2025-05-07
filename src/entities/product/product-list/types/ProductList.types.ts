import type { IProduct } from '@shared/api/products/products.types.ts';

export interface IProductListProps {
  products: IProduct[];
  isLoading: boolean;
  error?: string;
}
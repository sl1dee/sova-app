import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FC, memo } from 'react';
import ProductCard from '@entities/product/product-card/ui/ProductCard.tsx';
import type { IProduct } from '@shared/api/products/products.types.ts';
import cl from './ProductList.module.scss';

interface IProductListProps {
  products: IProduct[];
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

const ProductList: FC<IProductListProps> = ({ products, isLoading, error }) => {
  if (isLoading) {
    return <div className={cl.error_handler}>Loading...</div>;
  }

  if (error) {
    const errorMessage =
      'status' in error
        ? `Error ${error.status}: ${JSON.stringify(error.data)}`
        : error.message || 'Unknown error occurred';

    return <div className={cl.error_handler}>Error: {errorMessage}</div>;
  }

  if (products.length === 0) {
    return <div className={cl.error_handler}>No products found.</div>;
  }

  return (
    <div className={cl.cards}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default memo(ProductList);
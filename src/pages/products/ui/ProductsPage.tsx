import { useEffect } from 'react';
import { selectPaginatedProducts, selectTotalPages } from '@app/store/selectors/productsSelector.ts';
import { setCurrentPage } from '@app/store/slices/productsSlice';
import { useAppDispatch, useAppSelector } from '@app/store/store.hooks.ts';
import ProductList from '@entities/product/product-list';
import ProductSearch from '@entities/product/product-search';
import { useGetProductsQuery } from '@shared/api/products/products.ts';
import Pagination from '@shared/ui/pagination';
import cl from './ProductsPage.module.scss';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { priceMin, priceMax, currentPage } = useAppSelector((state) => state.products);

  const paginatedProducts = useAppSelector(selectPaginatedProducts);
  const totalPages = useAppSelector(selectTotalPages);

  const { isLoading, error } = useGetProductsQuery({
    total_items: 100,
    price_min: priceMin,
    price_max: priceMax,
  });

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      dispatch(setCurrentPage(1));
    }
  }, [totalPages, currentPage, dispatch]);

  const errorMessage = error ? ('error' in error ? error.error : JSON.stringify(error)) : undefined;

  return (
    <div className={cl.wrapper}>
      <h1 className={cl.title}>Products</h1>
      <ProductSearch />
      <ProductList products={paginatedProducts} isLoading={isLoading} error={errorMessage} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default ProductsPage;
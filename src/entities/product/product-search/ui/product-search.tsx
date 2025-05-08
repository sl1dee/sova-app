import { memo, useCallback, useEffect, useState } from 'react';
import { setPriceMax, setPriceMin } from '@app/store/slices/products-slice';
import { useAppDispatch, useAppSelector } from '@app/store/store.hooks.ts';
import { useDebounce } from '@shared/lib/hooks/use-debounce.ts';
import InputText from '@shared/ui/inputs/input-text/ui/input-text.tsx';
import cl from './product-search.module.scss';

const ProductSearch = () => {
  const dispatch = useAppDispatch();
  const { priceMin, priceMax } = useAppSelector((state) => state.products);

  const [minPriceValue, setMinPriceValue] = useState(priceMin);
  const [maxPriceValue, setMaxPriceValue] = useState(priceMax);

  const debouncedMinPrice = useDebounce(minPriceValue, 500);
  const debouncedMaxPrice = useDebounce(maxPriceValue, 500);

  const handleMinPriceChange = useCallback((value: string) => {
    setMinPriceValue(value);
  }, []);

  const handleMaxPriceChange = useCallback((value: string) => {
    setMaxPriceValue(value);
  }, []);

  useEffect(() => {
    dispatch(setPriceMin(debouncedMinPrice));
  }, [debouncedMinPrice, dispatch]);

  useEffect(() => {
    dispatch(setPriceMax(debouncedMaxPrice));
  }, [debouncedMaxPrice, dispatch]);

  return (
    <div className={cl.group}>
      <InputText placeholder="Min price..." value={minPriceValue} onChange={handleMinPriceChange} />
      <InputText placeholder="Max price..." value={maxPriceValue} onChange={handleMaxPriceChange} />
    </div>
  );
};

export default memo(ProductSearch);
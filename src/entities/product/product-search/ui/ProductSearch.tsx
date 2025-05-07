import { memo, useCallback, useEffect, useState } from 'react';
import { setPriceMax, setPriceMin } from '@app/store/slices/productsSlice';
import { useAppDispatch, useAppSelector } from '@app/store/store.hooks.ts';
import { useDebounce } from '@shared/lib/hooks/useDebounce.ts';
import InputText from '@shared/ui/inputs/input-text/ui/InputText.tsx';
import cl from './ProductSearch.module.scss';

const ProductSearch = () => {
  const dispatch = useAppDispatch();
  const { priceMin, priceMax } = useAppSelector((state) => state.products);

  const [minPriceValue, setMinPriceValue] = useState(priceMin);
  const [maxPriceValue, setMaxPriceValue] = useState(priceMax);

  const debouncedMinPrice = useDebounce(minPriceValue, 500);
  const debouncedMaxPrice = useDebounce(maxPriceValue, 500);

  const handleMinPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPriceValue(e.target.value);
  }, []);

  const handleMaxPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPriceValue(e.target.value);
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
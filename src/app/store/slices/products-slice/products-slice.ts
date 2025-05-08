import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsApi } from '@shared/api/products/products.ts';
import type { IProductsState } from './products-slice.types.ts';

const initialState: IProductsState = {
  priceMin: '',
  priceMax: '',
  currentPage: 1,
  itemsPerPage: 10,
  allProducts: [],
  isLoading: false,
  totalItems: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPriceMin: (state, action: PayloadAction<string>) => {
      state.priceMin = action.payload;
      state.currentPage = 1;
    },
    setPriceMax: (state, action: PayloadAction<string>) => {
      state.priceMax = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * Обработка успешного запроса продуктов
       */
      .addMatcher(productsApi.endpoints.getProducts.matchFulfilled, (state, { payload }) => {
        state.allProducts = payload.data;
        state.totalItems = payload.total;
        state.isLoading = false;
      })
      /**
       * Обработка начала запроса продуктов
       */
      .addMatcher(productsApi.endpoints.getProducts.matchPending, (state) => {
        state.isLoading = true;
      })
      /**
       * Обработка ошибки запроса продуктов
       */
      .addMatcher(productsApi.endpoints.getProducts.matchRejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setPriceMin, setPriceMax, setCurrentPage } = productsSlice.actions;

export default productsSlice.reducer;
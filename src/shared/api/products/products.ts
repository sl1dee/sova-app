import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IProductsRequestParams, IProductsResponse } from '@shared/api/products/products.types.ts';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakerapi.it/api/v2' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<IProductsResponse, IProductsRequestParams>({
      query: (params) => ({
        url: '/products',
        params: {
          _quantity: params.total_items || 100,
          ...(params.price_min ? { _price_min: params.price_min } : {}),
          ...(params.price_max ? { _price_max: params.price_max } : {}),
        },
      }),
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
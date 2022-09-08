import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IGood} from '../../models/models';

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
  }),
  endpoints: build => ({
    getGoods: build.query<IGood[], string>({
      query: (limit = '') => `goods?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Products' as const, id })),
            { type: 'Products', id: 'LIST' },
          ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    addProduct: build.mutation<IGood, IGood>({
      query: ( body: IGood ) => ({
        url: 'goods',
        method: 'POST',
       body
      }),
      invalidatesTags: [{type: 'Products', id: 'LIST'}]
    }),
    deleteProduct: build.mutation<IGood, string>({
      query: ( id: string ) => (
        {
          url: `goods/${id}`,
          method: 'DELETE'
    }),
      invalidatesTags: [{type: 'Products', id: 'LIST'}]
    })
  })
});

export const {useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation} = goodsApi;

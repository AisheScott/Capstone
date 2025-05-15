import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Define API using createApi
export const productApi= createApi({

    reducePath: "productApi",
    
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api" ,
    }),

    endpoints: (builder) => ({
        // Define an endpoint that fetches products
        products: builder.query({
          query: () => "/products/available",
          providesTags: ["Products"],
        }),

        singleProduct: builder.query({
          query: (id) => `/product/${id}`,
        }),
    
        register: builder.mutation({
          query: (credentials) => ({
            url: `/users/register`,
            method: "POST",
            body: credentials,
          }),
          invalidatesTags: ["Products"],
        }),
      }),
    });

    export const { useProductsQuery, useSingleProductQuery, useRegisterMutation } = productApi;

    export default productApi;
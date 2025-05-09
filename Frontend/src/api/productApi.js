import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Define API using createApi
export const productApi= createApi({

    reducePath: "rentalApi",
    
    baseQuery: fetchBaseQuery({
        //baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api" ,
        baseUrl: "http://localhost:3000/api" ,
    }),

    endpoints: (builder) => ({
        // Define an endpoint that fetches products
        products: builder.query({
          query: () => "/products",
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
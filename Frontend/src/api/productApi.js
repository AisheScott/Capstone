import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



// Define API using createApi
export const productApi = createApi({
  reducerPath: "productApi", 

  baseQuery: fetchBaseQuery({
    baseUrl: "https://capstone-901u.onrender.com/api",
  }),

  endpoints: (builder) => ({
    // Fetch all available products
    products: builder.query({
      query: () => "/products/available",
      providesTags: ["Products"],
    }),

    // Fetch a single product by ID
    singleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),

    // Register a new user
    register: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login`, 
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Products"],
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useProductsQuery,
  useSingleProductQuery,
  useRegisterMutation,
  useLoginMutation,
} = productApi;

export default productApi;
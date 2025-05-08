import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Define API using createApi
export const rentalApi= createApi({

    reducePath: "rentalApi",
    
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api" ,
    }),

    endpoints: (builder) => ({
        // Define an endpoint that fetches rentals
        rentals: builder.query({
          query: () => "/rentals",
          providesTags: ["Rentals"],
        }),

        singleRental: builder.query({
          query: (id) => `/rental/${id}`,
        }),
    
        register: builder.mutation({
          query: (credentials) => ({
            url: `/users/register`,
            method: "POST",
            body: credentials,
          }),
          invalidatesTags: ["Rentals"],
        }),
      }),
    });

    export const { useRentalsQuery, useSingleRentalQuery, useRegisterMutation } = rentalBuddyApi;
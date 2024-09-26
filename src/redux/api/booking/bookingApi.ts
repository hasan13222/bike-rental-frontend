import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    startRide: builder.mutation({
      query: (payload) => ({
        url: "/api/rentals",
        method: "POST",
        body: payload.data,
        headers: {
            'Authorization': `Bearer ${payload.token}`
        }
      }),
    }),
    getUserRentals: builder.query({
      query: (token) => ({
        url: "/api/rentals",
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
      }),
      providesTags: ["userRentals"]
    }),
    getAllRentals: builder.query({
      query: (token) => ({
        url: "/api/rentals/all",
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
      }), 
      providesTags: ["allRentals"]
    }),
    returnBike: builder.mutation({
      query: (payload) => ({
        url: `/api/rentals/${payload.bookingId}/return`,
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${payload.token}`
        }
      }),
      invalidatesTags: ["userRentals", "allRentals", "bikes"]
    }),
    doPayment: builder.mutation({
      query: (payload) => ({
        url: `/api/rentals/${payload.bookingId}/pay`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: ["userRentals", "allRentals",]
    }),
    fixDiscount: builder.mutation({
      query: (payload) => ({
        url: `/api/rentals/${payload.bookingId}/discount`,
        method: "PATCH",
        body: {discount: payload.discount},
      }),
      invalidatesTags: ["userRentals", "allRentals",]
    }),
  }),
});

export const { useStartRideMutation, useGetUserRentalsQuery, useGetAllRentalsQuery, useReturnBikeMutation, useDoPaymentMutation, useFixDiscountMutation } = bookingApi;

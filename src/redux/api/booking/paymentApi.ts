import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    takePayment: builder.mutation({
      query: (payload) => ({
        url: "/api/rentals/payment",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useTakePaymentMutation } = paymentApi;

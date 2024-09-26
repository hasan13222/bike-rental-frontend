import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: (token) => ({
        url: "/api/coupons",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["coupons"],
    }),
    createCoupon: builder.mutation({
      query: (payload) => ({
        url: `/api/coupons`,
        method: "POST",
        body: payload.newCoupon,
      }),
      invalidatesTags: ["coupons"],
    }),
    updateCoupon: builder.mutation({
      query: (payload) => ({
        url: `/api/coupons/${payload.couponId}`,
        method: "PATCH",
        body: payload.updateCoupon,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }),
      invalidatesTags: ["coupons"],
    }),
    deleteCoupon: builder.mutation({
      query: (payload) => ({
        url: `/api/coupons/${payload.couponId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }),
      invalidatesTags: ["coupons"],
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useDeleteCouponMutation,
  useCreateCouponMutation,
  useUpdateCouponMutation,
} = couponApi;

import { baseApi } from "../baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBikeReviews: builder.query({
      query: (bikeId) => ({
        url: `/api/reviews/${bikeId}`,
        method: "GET",
      }),
      providesTags: ["reviews"],
    }),
    createReview: builder.mutation({
      query: (payload) => ({
        url: `/api/reviews`,
        method: "POST",
        body: payload.newReview,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }),
      invalidatesTags: ["reviews"],
    }),
    
  }),
});

export const {
  useGetBikeReviewsQuery,
  useCreateReviewMutation,
} = reviewApi;

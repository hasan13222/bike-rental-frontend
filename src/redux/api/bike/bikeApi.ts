import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBikes: builder.query({
      query: () => ({
        url: "/api/bikes",
        method: "GET",
      }),
      providesTags: ["bikes"],
    }),
    getSingleBike: builder.query({
      query: (bikeId) => ({
        url: `/api/bikes/${bikeId}`,
        method: "GET",
      }),
    }),
    createBike: builder.mutation({
      query: (payload) => ({
        url: `/api/bikes`,
        method: "POST",
        body: payload.newBike,
        headers: {
            'Authorization': `Bearer ${payload.token}`
        }
      }),
      invalidatesTags: ["bikes"]
    }),
    updateBike: builder.mutation({
      query: (payload) => ({
        url: `/api/bikes/${payload.bikeId}`,
        method: "PUT",
        body: payload.newBike,
        headers: {
            'Authorization': `Bearer ${payload.token}`
        }
      }),
      invalidatesTags: ["bikes"]
    }),
    deleteBike: builder.mutation({
      query: (payload) => ({
        url: `/api/bikes/${payload.bikeId}`,
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${payload.token}`
        }
      }),
      invalidatesTags: ["bikes"]
    }),
  }),
});

export const { useGetBikesQuery, useDeleteBikeMutation, useGetSingleBikeQuery, useCreateBikeMutation, useUpdateBikeMutation } = bikeApi;

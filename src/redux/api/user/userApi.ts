import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (token) => ({
        url: "/api/users/me",
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
      }),
      providesTags: ["userProfile"]
    }),
    deleteUser: builder.mutation({
      query: (payload) => ({
        url: `/api/users/${payload.userId}`,
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${payload.token}`
        }
      }),
      invalidatesTags: ["users"]
    }),
    getAllUser: builder.query({
      query: (token) => ({
        url: "/api/users",
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
      }),
      providesTags: ["users"]
    }),
    promoteUser: builder.mutation({
      query: (payload) => ({
        url: `/api/users/${payload.userId}/promote`,
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${payload.token}`
        }
      }),
      invalidatesTags: ["users"]
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "/api/users/me",
        method: "PUT",
        body: payload.updateInfo,
        headers: {
            'Authorization': `Bearer ${payload.token}`
        }
      }),
      invalidatesTags: ['userProfile']
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useGetAllUserQuery, useDeleteUserMutation, usePromoteUserMutation } = userApi;

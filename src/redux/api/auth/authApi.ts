import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/login",
        method: "POST",
        body: payload,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }), 
      invalidatesTags: ["checkLogin"]     
    }),
    checkLogin: builder.query({
      query: () => ({
        url: "/api/auth/check-login",
        method: "GET",
        credentials: 'include',
      }),
      providesTags: ["checkLogin"]
    }),
    logout: builder.query({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
        credentials: 'include',
      }),
    })
  }),
});

export const { useSignupUserMutation, useLoginUserMutation, useCheckLoginQuery, useLazyLogoutQuery } = authApi;

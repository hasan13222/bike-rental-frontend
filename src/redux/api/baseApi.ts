import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bike-rental-service-three.vercel.app",
  }),
  tagTypes: ["bikes", "userProfile", "users", "checkLogin", "userRentals", "allRentals", "coupons", "singleBike"],
  endpoints: () => ({}),
});
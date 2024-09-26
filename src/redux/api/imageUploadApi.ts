import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageUploadApi = createApi({
  reducerPath: "imageUploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://api.imgbb.com/1/upload?key=787a92272c8fe84458fd69331f72c734",
  }),
  tagTypes: ["images"],
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (payload) => ({
        url: "",
        body: payload,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'omit'
      }),
    }),
  }),
});

export const { useUploadImageMutation } = imageUploadApi;

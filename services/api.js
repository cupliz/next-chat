import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  reducerPath: "api",
  // tagTypes: [],
  endpoints: (build) => ({
    sendMessage: build.mutation({
      query: (message) => {
        return {
          url: "/hello",
          method: "POST",
          body: { message }
        }
      },
    })
  })
});

export const { useSendMessageMutation } = api

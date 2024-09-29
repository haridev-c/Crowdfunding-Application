import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5050/api" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: "user/profile",
        method: "GET",
        credentials: "include",
      }),
    }),

    createCampaign: builder.mutation({
      query: (campaignData) => ({
        url: "campaign/create",
        method: "POST",
        body: campaignData,
        credentials: "include",
      }),
    }),

    getFeaturedCampaigns: builder.query({
      query: () => ({
        url: "campaign/featured-campaigns",
        method: "GET",
        credentials: "include",
      }),
    }),

    getCampaigns: builder.query({
      query: (category) => ({
        url: `campaign/category/${category}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetProfileQuery,
  useCreateCampaignMutation,
  useGetFeaturedCampaignsQuery,
  useGetCampaignsQuery,
} = apiSlice;

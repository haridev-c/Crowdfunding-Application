import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5050/api" }),
  tagTypes: ["Campaigns", "User"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    getProfile: builder.query({
      query: () => ({
        url: "user/profile",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    createCampaign: builder.mutation({
      query: (campaignData) => ({
        url: "campaign/create",
        method: "POST",
        body: campaignData,
        credentials: "include",
      }),
      invalidatesTags: ["Campaigns"],
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
      providesTags: ["Campaigns"],
    }),

    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "user/profile",
        method: "PATCH",
        body: profileData,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    changeDP: builder.mutation({
      query: (dp) => ({
        url: "user/dp",
        method: "PUT",
        body: dp,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    getUserCampaigns: builder.query({
      query: () => ({
        url: "campaign/user-campaigns",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Campaigns"],
    }),

    getCampaign: builder.query({
      query: (id) => ({
        url: `campaign/single/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Campaigns"],
    }),

    deleteCamapiagn: builder.mutation({
      query: (id) => ({
        url: `campaign/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Campaigns"],
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
  useUpdateProfileMutation,
  useChangeDPMutation,
  useGetCampaignQuery,
  useGetUserCampaignsQuery,
  useDeleteCamapiagnMutation,
} = apiSlice;

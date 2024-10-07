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

    registerUser: builder.mutation({
      query: (userDetails) => ({
        url: "user/register",
        method: "POST",
        body: userDetails,
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
        url: "campaign/featured",
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

    addDonationToCampaign: builder.mutation({
      query: (donationData) => ({
        url: "campaign/donation",
        method: "POST",
        body: donationData,
        credentials: "include",
      }),
      invalidatesTags: ["Campaigns"],
    }),

    getUserDonation: builder.query({
      query: () => ({
        url: "donation/user-donations",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Campaigns"],
    }),

    createDonation: builder.mutation({
      query: (donationData) => ({
        url: "donation/create",
        method: "POST",
        body: donationData,
        credentials: "include",
      }),
      invalidatesTags: ["Campaigns"],
    }),

    createOrder: builder.mutation({
      query: (amount) => ({
        url: "payment/create-order",
        method: "POST",
        body: amount,
        credentials: "include",
      }),
      invalidatesTags: ["Campaigns"],
    }),

    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: "payment/verify",
        method: "POST",
        body: paymentData,
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
  useCreateOrderMutation,
  useGetUserDonationQuery,
  useVerifyPaymentMutation,
  useCreateDonationMutation,
  useAddDonationToCampaignMutation,
  useRegisterUserMutation,
} = apiSlice;

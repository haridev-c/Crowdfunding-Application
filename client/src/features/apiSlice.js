import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Campaigns", "User"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "api/user/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "api/user/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    registerUser: builder.mutation({
      query: (userDetails) => ({
        url: "api/user/register",
        method: "POST",
        body: userDetails,
      }),
      invalidatesTags: ["User"],
    }),

    getProfile: builder.query({
      query: () => ({
        url: "api/user/profile",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    createCampaign: builder.mutation({
      query: (campaignData) => ({
        url: "api/campaign/create",
        method: "POST",
        body: campaignData,
        credentials: "include",
      }),
      invalidatesTags: ["Campaigns"],
    }),

    getFeaturedCampaigns: builder.query({
      query: () => ({
        url: "api/campaign/featured",
        method: "GET",
        credentials: "include",
      }),
    }),

    getCampaigns: builder.query({
      query: (category) => ({
        url: `api/campaign/category/${category}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Campaigns"],
    }),

    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "api/user/profile",
        method: "PATCH",
        body: profileData,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    changeDP: builder.mutation({
      query: (dp) => ({
        url: "api/user/dp",
        method: "PUT",
        body: dp,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    getUserCampaigns: builder.query({
      query: () => ({
        url: "api/campaign/user-campaigns",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Campaigns"],
    }),

    getCampaign: builder.query({
      query: (id) => ({
        url: `api/campaign/single/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Campaigns"],
    }),

    deleteCamapiagn: builder.mutation({
      query: (id) => ({
        url: `api/campaign/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Campaigns"],
    }),

    addDonationToCampaign: builder.mutation({
      query: (donationData) => ({
        url: "api/campaign/donation",
        method: "POST",
        body: donationData,
        credentials: "include",
      }),
      invalidatesTags: ["Campaigns"],
    }),

    getUserDonation: builder.query({
      query: () => ({
        url: "api/donation/user-donations",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Campaigns"],
    }),

    createDonation: builder.mutation({
      query: (donationData) => ({
        url: "api/donation/create",
        method: "POST",
        body: donationData,
        credentials: "include",
      }),
      invalidatesTags: ["Campaigns"],
    }),

    createOrder: builder.mutation({
      query: (amount) => ({
        url: "api/payment/create-order",
        method: "POST",
        body: amount,
        credentials: "include",
      }),
      invalidatesTags: ["Campaigns"],
    }),

    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: "api/payment/verify",
        method: "POST",
        body: paymentData,
        credentials: "include",
      }),
      invalidatesTags: ["Campaigns"],
    }),

    verifyEmail: builder.query({
      query: (token) => ({
        url: `auth/verify-email?token=${token}`,
        method: "GET",
        baseUrl: "http://localhost:5050",
        credentials: "include",
      }),
      providesTags: ["User"],
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
  useVerifyEmailQuery,
} = apiSlice;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalStateRepository";

function CampaignPage() {
  const [campaign, setCampaign] = useState(null);
  const [progress, setProgress] = useState();
  const [donation, setDonation] = useState();
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  async function fetchCampaignDetails(campaignId) {
    axios
      .post("/campaign/get-campaign-details", { campaignId })
      .then(({ data }) => {
        if (!data.success) {
          alert(data.serverMsg);
        } else {
          console.log("Campaign details: ", data.campaign);
          setCampaign(data.campaign);
          setProgress(
            (data.campaign.amountRaised / data.campaign.targetAmount) * 100,
          );
        }
      });
  }

  useEffect(() => {
    fetchCampaignDetails(id);
  }, [refresh]);

  const formatAmount = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleLoginPrompt = () => {
    alert("You have to login first befor making a donation");
    navigate("/login");
  };
  const handleDonationCheck = () => {
    if (!donation) {
      alert("Please input a donation amount");
    } else {
      handlePayments();
    }
  };

  const handleAfterPaymentVerificationTasks = async (response) => {
    try {
      axios
        .post("/donation/create-donation", {
          campaignId: campaign._id,
          donationAmount: donation,
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
        })
        .then(({ data }) => {
          if (!data.success) {
            alert(data.serverMsg);
          } else {
            axios
              .post("/campaign/add-donation", {
                amount: donation,
                campaignId: campaign._id,
                donationID: data.savedDonation._id,
              })
              .then(({ data }) => {
                if (!data.success) {
                  alert(data.serverMsg);
                } else {
                  setRefresh(!refresh);
                }
              });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const initPayment = (order) => {
    const options = {
      key: "rzp_test_ZakI1Bhhsz3xal",
      amount: order.amount,
      currency: order.currency,
      name: campaign.title,
      description: `Contribution to ${campaign.createdBy.name}'s cause`,
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            "/payments/verify-payment",
            response,
          );
          console.log(data);
          // code to update amountRaised field in campiagn model
          if (!data.success) {
            alert(data.serverMsg);
          } else {
            handleAfterPaymentVerificationTasks(response);
          }
        } catch (error) {
          console.log("An error occured while initiating payment");
          console.log(error);
          alert("An error occured while initiating payment");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayments = async () => {
    try {
      const { data } = await axios.post("/payments/create-order", {
        amount: donation,
      });
      console.log(data);
      initPayment(data.order);
    } catch (error) {
      console.log(error);
    }
  };

  if (!campaign) {
    return <div>Loading</div>;
  }

  return (
    <div className="mx-4 my-4 flex flex-col rounded p-4 shadow-lg md:mx-auto md:mt-10 md:w-1/2">
      <div id="title" className="text-2xl font-bold text-[#386641]">
        {campaign.title}
      </div>
      <div id="creatorDetails" className="mt-4 flex items-center">
        <div id="profilePic">
          {campaign.createdBy.profilePic ? (
            <div className="size-10 rounded-full">
              <img
                src={`http://localhost:5050/user/get-dp/${campaign.createdBy.profilePic}`}
                className="size-10 rounded-full"
              />
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="box-content size-6 rounded-full p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          )}
        </div>
        <div id="creatorName" className="ml-10 font-medium">
          {campaign.createdBy.name}
        </div>
      </div>
      <div id="description" className="my-4 text-justify">
        {campaign.description}
      </div>
      <div id="info" className="flex">
        <div id="targetDetails">
          <p>Amount Raised: {formatAmount(campaign.amountRaised)}</p>
        </div>
        <div className="flex flex-grow justify-end">
          <p>Target Amount: {formatAmount(campaign.targetAmount)}</p>
        </div>
      </div>
      <div id="donationSection" className="my-4 flex">
        <div className="flex-grow">
          <input
            type="number"
            value={donation}
            placeholder="Enter donation amount"
            onChange={(e) => setDonation(e.target.value)}
            className="w-full rounded border-none bg-gray-200"
          />
        </div>
        <div className="ml-4 flex justify-end" id="donateButton">
          {user ? (
            <button
              onClick={handleDonationCheck}
              className="rounded-full bg-[#A7C957]/95 px-6 py-2 font-medium transition-all duration-300 hover:bg-[#A7C957] hover:shadow-md hover:shadow-[#386641]"
            >
              Donate
            </button>
          ) : (
            <button
              onClick={handleLoginPrompt}
              className="rounded-full bg-[#A7C957]/95 px-6 py-2 font-medium transition-all duration-300 hover:bg-[#A7C957] hover:shadow-md hover:shadow-[#386641]"
            >
              Donate
            </button>
          )}
        </div>
      </div>
      <div id="progressBar" className="my-4 py-2">
        <div className="h-4 w-full rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#A7C957] transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
          <p className="mt-2 text-sm text-gray-600">
            {progress.toFixed(1)}% of goal reached
          </p>
        </div>
      </div>
    </div>
  );
}

export default CampaignPage;

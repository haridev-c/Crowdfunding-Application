import axios from "axios";
import React, { useEffect, useState } from "react";
import CampaignCard from "../components/CampaignCard";

function HomePage() {
  const [campaigns, setCampaigns] = useState(null);

  useEffect(() => {
    axios.get("/campaign/get-all-campaigns").then(({ data }) => {
      console.log("collected data: ", data);
      setCampaigns(data.campaigns);
    });
  }, []);

  if (!campaigns) {
    return "loading";
  }

  return (
    <div>
      <div className="flex h-screen w-full flex-col bg-[url('/MotorCycleGroup.jpeg')] bg-cover bg-center bg-no-repeat">
        <div className="mx-auto mt-20">
          <h1 className="text-center text-4xl font-extrabold text-[#6A994E]">
            SparkFund
          </h1>
          <h1 className="text-4xl font-extrabold text-[#F2E8CF]">
            Empowering Dreams, One Contribution at a Time
          </h1>
        </div>
      </div>
      <div className="md:flex md:flex-wrap md:justify-around">
        {campaigns.map((item) => (
          <CampaignCard
            campaignId={item._id}
            title={item.title}
            createdBy={item.createdBy}
            description={item.description}
            targetAmount={item.targetAmount}
            deadline={item.deadline}
            amountRaised={item.amountRaised}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

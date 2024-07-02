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
      <h1 className="text-center text-xl">HomePage</h1>

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

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
        <CampaignCard
          campaignId={campaigns[0]._id}
          title={campaigns[0].title}
          createdBy={campaigns[0].createdBy}
          description={campaigns[0].description}
          targetAmount={campaigns[0].targetAmount}
          deadline={campaigns[0].deadline}
          amountRaised={campaigns[0].amountRaised}
        />
        <CampaignCard
          title={campaigns[0].title}
          createdBy={campaigns[0].createdBy}
          description={campaigns[0].description}
          targetAmount={campaigns[0].targetAmount}
          deadline={campaigns[0].deadline}
          amountRaised={campaigns[0].amountRaised}
        />
        <CampaignCard
          title={campaigns[0].title}
          createdBy={campaigns[0].createdBy}
          description={campaigns[0].description}
          targetAmount={campaigns[0].targetAmount}
          deadline={campaigns[0].deadline}
          amountRaised={campaigns[0].amountRaised}
        />

        <CampaignCard
          title={campaigns[0].title}
          createdBy={campaigns[0].createdBy}
          description={campaigns[0].description}
          targetAmount={campaigns[0].targetAmount}
          deadline={campaigns[0].deadline}
          amountRaised={campaigns[0].amountRaised}
        />

        <CampaignCard
          title={campaigns[0].title}
          createdBy={campaigns[0].createdBy}
          description={campaigns[0].description}
          targetAmount={campaigns[0].targetAmount}
          deadline={campaigns[0].deadline}
          amountRaised={campaigns[0].amountRaised}
        />

        <CampaignCard
          title={campaigns[0].title}
          createdBy={campaigns[0].createdBy}
          description={campaigns[0].description}
          targetAmount={campaigns[0].targetAmount}
          deadline={campaigns[0].deadline}
          amountRaised={campaigns[0].amountRaised}
        />
      </div>
    </div>
  );
}

export default HomePage;

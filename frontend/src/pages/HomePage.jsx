import axios from "axios";
import React, { useEffect, useState } from "react";
import CampaignCard from "../components/CampaignCard";

function HomePage() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get("/campaign/get-all-campaigns").then(({ data }) => {
      console.log("collected data: ", data);
      setCampaigns(data.campaigns);
    });
  }, []);

  if (campaigns.length === 0) {
    return "loading";
  }

  return (
    <div>
      <h1 className="text-center text-xl">HomePage</h1>

      <div className="md:flex">
        <CampaignCard
          title={campaigns[0].title}
          createdBy={campaigns[0].createdBy}
          description={campaigns[0].description}
          targetAmount={campaigns[0].targetAmount}
        />
        <CampaignCard
          title={campaigns[0].title}
          createdBy={campaigns[0].createdBy}
          description={campaigns[0].description}
          targetAmount={campaigns[0].targetAmount}
        />
        <CampaignCard
          title={campaigns[0].title}
          createdBy={campaigns[0].createdBy}
          description={campaigns[0].description}
          targetAmount={campaigns[0].targetAmount}
        />
      </div>
    </div>
  );
}

export default HomePage;

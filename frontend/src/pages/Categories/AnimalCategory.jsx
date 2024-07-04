import axios from "axios";
import React, { useEffect, useState } from "react";
import CampaignCard from "../../components/CampaignCard";
import GoldenRetriever from "../../assets/GoldenRetriever.jpg";

function AnimalCategory() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/campaign/get-category/Animal")
      .then(({ data }) => {
        if (!data.success) {
          alert(data.serverMsg);
        } else {
          console.log("collected data: ", data);
          setCampaigns(data.campaigns);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div>
      <div className="p-6">
        <div id="" className="h-96 w-full rounded-lg bg-[#E9F1E4]">
          <img src={GoldenRetriever} alt="" className="h-full rounded-l-lg" />
        </div>
      </div>
      <div
        id="sampleCampaigns"
        className="md:flex md:flex-wrap md:justify-around"
      >
        {campaigns ? (
          <div className="md:flex md:flex-wrap md:justify-around">
            {campaigns.map((item) => (
              <CampaignCard
                key={item._id}
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
        ) : (
          <div>No campaigns to show </div>
        )}
      </div>
    </div>
  );
}

export default AnimalCategory;
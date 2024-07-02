import axios from "axios";
import React, { useEffect, useState } from "react";
import MyCampaignCard from "./MyCampaignCard";

function MyCampaignsTab() {
  const [campaigns, setCampaigns] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("/campaign/get-my-campaigns")
      .then(({ data }) => {
        if (!data.success) {
          alert(data.serverMsg);
        } else {
          setCampaigns(data.myCampaigns);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!campaigns || campaigns.length == 0) {
    return <div>No campaigns found</div>;
  }

  return (
    <div className="flex-grow md:flex md:flex-wrap md:justify-around">
      <div>
        {campaigns.map((item) => (
          <MyCampaignCard
            key={item._id}
            title={item.title}
            createdBy={item.createdBy}
            description={item.description}
            targetAmount={item.targetAmount}
            amountRaised={item.amountRaised}
            campaignId={item._id}
            setRefresh={setRefresh}
          />
        ))}
      </div>
    </div>
  );
}

export default MyCampaignsTab;

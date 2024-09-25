import { useEffect, useState } from "react";
import CampaignCard from "../CampaignCard";
import axios from "axios";

function MyDonationsTab() {
  const [campaigns, setCampaigns] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get("/donation/get-my-donations").then(({ data }) => {
      if (!data.success) {
        alert(data.serverMsg);
      } else {
        setCampaigns(data.campaigns);
      }
    });
  }, [refresh]);

  if (!campaigns || campaigns.length == 0) {
    return <div>No campaigns found</div>;
  }

  return (
    <div className="flex-grow">
      <div className="md:flex md:flex-wrap md:justify-around">
        {campaigns.map((item) => (
          <CampaignCard
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

export default MyDonationsTab;

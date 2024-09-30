// import axios from "axios";
// import { useState } from "react";
// redux imports
import { useGetUserCampaignsQuery } from "../../features/apiSlice";
// component imports
import MyCampaignCard from "./MyCampaignCard";

function MyCampaignsTab() {
  // const [refresh, setRefresh] = useState(false);

  const { data: campaignData, isLoading } = useGetUserCampaignsQuery();

  if (
    !campaignData ||
    !campaignData.userCampaigns ||
    campaignData.userCampaigns.length == 0
  ) {
    return <div>No campaigns found</div>;
  }

  return (
    <div className="flex-grow">
      <div className="md:flex md:flex-wrap md:justify-around">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          campaignData.userCampaigns.map((item) => (
            <MyCampaignCard
              key={item._id}
              title={item.title}
              createdBy={item.createdBy}
              description={item.description}
              targetAmount={item.targetAmount}
              amountRaised={item.amountRaised}
              campaignId={item._id}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MyCampaignsTab;

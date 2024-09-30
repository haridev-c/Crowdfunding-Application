import CampaignCard from "../CampaignCard";
import { useGetUserDonationQuery } from "../../features/apiSlice";

function MyDonationsTab() {
  const { data: donationData, isLoading } = useGetUserDonationQuery();

  if (
    !donationData ||
    !donationData.campaigns ||
    donationData.campaigns.length == 0
  ) {
    return <div>No campaigns found</div>;
  }

  return (
    <div className="flex-grow">
      <div className="md:flex md:flex-wrap md:justify-around">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          donationData.campaigns.map((item) => (
            <CampaignCard
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

export default MyDonationsTab;

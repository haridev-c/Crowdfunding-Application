import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// redux imports
import { useDeleteCamapiagnMutation } from "../../features/apiSlice";

function MyCampaignCard({
  title,
  createdBy,
  description,
  targetAmount,
  amountRaised,
  campaignId,
}) {
  const [deleteCampaign] = useDeleteCamapiagnMutation();

  let progress = (amountRaised / targetAmount) * 100;

  const formatAmount = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleDeleteCampaign = async () => {
    const data = await deleteCampaign(campaignId);
    console.log(data);
  };

  return (
    <div className="m-2 mb-4 rounded-md p-6 shadow-lg md:min-w-[400px] md:max-w-[400px]">
      <Link to={`/campaign/${campaignId}`}>
        <div
          id="card-header"
          className="my-2 line-clamp-1 overflow-hidden font-bold text-[#386641]"
        >
          {title}
        </div>
      </Link>
      <div id="creatorDetails" className="my-4 flex items-center">
        <div id="profilePic">
          {createdBy.profilePic ? (
            <div className="size-10 rounded-full">
              <img
                src={`http://localhost:5050/api/user/dp/${createdBy.profilePic}`}
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
        <div id="creatorName">
          <p className="ml-8 font-medium">{createdBy.name}</p>
        </div>
      </div>
      <div id="campaignDescription" className="my-4 h-20 overflow-hidden">
        <p className="line-clamp-3 font-light text-[#65758c]">{description}</p>
      </div>
      <div id="Info" className="my-4 flex items-center">
        <div>
          <p>Target Amount: {formatAmount(targetAmount)}</p>
          <p>Amount Raised: {formatAmount(amountRaised)}</p>
        </div>
        <div className="flex flex-grow justify-end">
          <button
            onClick={handleDeleteCampaign}
            className="rounded-full bg-[#bc4749]/95 px-6 py-2 font-medium text-[#f2e8cf] transition-all duration-300 hover:bg-[bc4749] hover:shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
      <div id="progressBar" className="my-4">
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

MyCampaignCard.propTypes = {
  title: PropTypes.string.isRequired,
  createdBy: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  targetAmount: PropTypes.number.isRequired,
  amountRaised: PropTypes.number.isRequired,
  campaignId: PropTypes.string.isRequired,
};

export default MyCampaignCard;

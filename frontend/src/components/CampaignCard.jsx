import React from "react";

function CampaignCard({ title, createdBy, description, targetAmount }) {
  return (
    <div className="m-2 rounded-md border-2 border-black p-2 shadow-lg md:w-1/3">
      <div id="card-header" className="">
        {title}
      </div>
    </div>
  );
}

export default CampaignCard;

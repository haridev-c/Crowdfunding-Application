import axios from "axios";
import React, { useEffect, useState } from "react";
import CampaignCard from "../../components/CampaignCard";
import SportsCategoryPic from "../../assets/SportsCategoryPic.jpg";

function SportsCategory() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/campaign/get-category/Sports")
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
    <div className="">
      <div className="p-6">
        <div id="" className="flex h-96 w-full rounded-lg bg-[#E9F1E4]">
          <img src={SportsCategoryPic} alt="" className="h-full rounded-l-lg" />
          <div className="prose prose-2xl flex flex-grow items-center px-14">
            <p>
              <i>
                Promoting health, teamwork, and sportsmanship. Join us in
                empowering athletes and sports enthusiasts
              </i>
            </p>
          </div>
        </div>
      </div>
      <section className="p-6">
        <div
          id="sampleCampaigns"
          className="rounded-lg bg-[#E9F1E4] p-4 md:flex md:flex-wrap md:justify-around"
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
      </section>
    </div>
  );
}

export default SportsCategory;

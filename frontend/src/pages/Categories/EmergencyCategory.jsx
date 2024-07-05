import axios from "axios";
import React, { useEffect, useState } from "react";
import CampaignCard from "../../components/CampaignCard";
import EmergencyPic from "../../assets/EmergencyCategoryPic.jpg";

function EmergencyCategory() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/campaign/get-category/Emergency")
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
      <section className="my-10 flex justify-center">
        <h1 className="rounded-full bg-[#E9F1E4] py-10 text-center text-4xl font-medium text-[#FFB703] md:w-2/3">
          Explore Campaigns in Emergency Category
        </h1>
      </section>
      <section id="picWithQuote" className="p-6">
        <div
          id=""
          className="flex w-full flex-col rounded-lg bg-[#E9F1E4] md:h-96 md:flex-row"
        >
          <img src={EmergencyPic} alt="" className="h-full rounded-lg" />
          <div
            id="quote"
            className="prose prose-2xl flex flex-grow items-center md:px-14"
          >
            <p>
              <i>
                Help us provide relief and support to those affected by
                emergencies. Explore our campaigns and make a difference today.
              </i>
            </p>
          </div>
        </div>
      </section>
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

export default EmergencyCategory;

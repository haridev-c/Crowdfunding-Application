import axios from "axios";
import React, { useEffect, useState } from "react";
import CampaignCard from "../../components/CampaignCard";
import EducationCategoryPic from "../../assets/EducationCategoryPic.jpg";

function EducationCategory() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/campaign/get-category/Education")
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
      <section id="header" className="my-10 flex justify-center">
        <h1 className="rounded-full bg-[#E9F1E4] py-10 text-center text-4xl font-medium text-[#FFB703] md:w-2/3">
          Explore Campaigns in Education Category
        </h1>
      </section>
      <section id="picWithQuote" className="p-6">
        <div className="flex w-full flex-col rounded-lg bg-[#E9F1E4] md:flex-row">
          <img
            src={EducationCategoryPic}
            alt=""
            className="h-auto max-h-96 w-full rounded-lg object-cover md:w-1/2"
          />
          <div
            id="quote"
            className="flex flex-grow items-center p-6 md:p-8 lg:p-14"
          >
            <p className="text-center text-base italic sm:text-lg md:text-left md:text-xl lg:text-2xl xl:text-3xl">
              Thanks to supporters like you, 500+ of students received
              scholarships last year. Discover more stories and make an impact
              today.
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

export default EducationCategory;

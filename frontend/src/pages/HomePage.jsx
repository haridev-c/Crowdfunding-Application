import axios from "axios";
import React, { useEffect, useState } from "react";
import CampaignCard from "../components/CampaignCard";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { MdOutlineSportsTennis } from "react-icons/md";
import { IoMdSchool } from "react-icons/io";
import { GiEarthAsiaOceania } from "react-icons/gi";
import { PiAmbulanceFill } from "react-icons/pi";
import { PiDogFill } from "react-icons/pi";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";

function HomePage() {
  const [campaigns, setCampaigns] = useState(null);

  useEffect(() => {
    axios.get("/campaign/get-all-campaigns").then(({ data }) => {
      console.log("collected data: ", data);
      setCampaigns(data.campaigns);
    });
  }, []);

  // if (!campaigns) {
  //   return "loading";
  // }

  return (
    <div>
      <div
        id="imageBackground"
        className="flex h-screen w-full flex-col justify-between bg-[url('/MotorCycleGroup.jpeg')] bg-cover bg-center bg-no-repeat"
      >
        <div className="mx-auto mt-20">
          <h1 className="text-center text-4xl font-extrabold text-[#6A994E]">
            SparkFund
          </h1>
          <h1 className="mx-2 text-4xl font-extrabold text-[#F2E8CF]">
            Empowering Dreams, One Contribution at a Time
          </h1>
        </div>
        <div className="mb-36 text-center">
          <h1 className="mx-2 text-4xl font-extrabold text-[#FFB703]">
            Trusted by 10,000+ users worldwide
          </h1>
        </div>
      </div>
      {/* Sample campaigns */}
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

      {/* Categories */}
      <section>
        <h1 className="my-10 text-center text-5xl">Categories</h1>
        <div id="categoriesList" className="flex flex-wrap justify-around">
          <Link
            to={"/category/medical"}
            className="m-4 flex items-center justify-center rounded bg-[#E9F1E4] px-10 py-4 text-2xl"
          >
            <FaHandHoldingMedical className="mx-4" />
            <p className="mr-10 flex h-36 w-32 items-center">Medical</p>
            <BsArrowRightShort />
          </Link>
          <Link
            to={"/category/education"}
            className="m-4 flex items-center justify-center rounded bg-[#E9F1E4] px-10 py-4 text-2xl"
          >
            <IoMdSchool className="mx-4" />
            <p className="mr-10 flex h-36 w-32 items-center">Education</p>
            <BsArrowRightShort />
          </Link>
          <Link
            to={"/category/sports"}
            className="m-4 flex items-center justify-center rounded bg-[#E9F1E4] px-10 py-4 text-2xl"
          >
            <MdOutlineSportsTennis className="mx-4" />
            <p className="mr-10 flex h-36 w-32 items-center">Sports</p>
            <BsArrowRightShort />
          </Link>
          <Link
            to={"/category/environment"}
            className="m-4 flex items-center justify-center rounded bg-[#E9F1E4] px-10 py-4 text-2xl"
          >
            <GiEarthAsiaOceania className="mx-4" />
            <p className="mr-10 flex h-36 w-32 items-center">Environment</p>
            <BsArrowRightShort />
          </Link>
          <Link
            to={"/category/emergency"}
            className="m-4 flex items-center justify-center rounded bg-[#E9F1E4] px-10 py-4 text-2xl"
          >
            <PiAmbulanceFill className="mx-4" />
            <p className="mr-10 flex h-36 w-32 items-center">Emergency</p>
            <BsArrowRightShort />
          </Link>
          <Link
            to={"/category/animal"}
            className="m-4 flex items-center justify-center rounded bg-[#E9F1E4] px-10 py-4 text-2xl"
          >
            <PiDogFill className="mx-4" />
            <p className="mr-10 flex h-36 w-32 items-center">Animal</p>
            <BsArrowRightShort />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

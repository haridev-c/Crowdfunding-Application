import React, { useContext, useState } from "react";
import { GlobalContext } from "../GlobalStateRepository";
import { Navigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import MyCampaignsTab from "../components/MyCampaignsTab/MyCampaignsTab";
import MyDonationsTab from "../components/MyDonationsTab/MyDonationsTab";
import Sidebar from "../components/ProfilePageTabs/Sidebar";
import HorizontalTabs from "../components/ProfilePageTabs/HorizontalTabs";

function MyProfilePage() {
  const { user } = useContext(GlobalContext);
  const [tabVlue, setTabValue] = useState(1);

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div id="profilePage" className="flex flex-grow flex-col p-2">
      <div id="top-header" className="hidden">
        <h1 className="mt-12 text-center text-4xl">Welcome {user.name}</h1>
      </div>
      <div id="body" className="flex flex-grow flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar setTabValue={setTabValue} />

        {/* Horizontal tabs bar */}
        <HorizontalTabs setTabValue={setTabValue} />

        <div className="flex w-full p-2">
          {tabVlue === 1 ? (
            <EditProfile />
          ) : tabVlue === 2 ? (
            <MyCampaignsTab />
          ) : (
            <MyDonationsTab />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfilePage;

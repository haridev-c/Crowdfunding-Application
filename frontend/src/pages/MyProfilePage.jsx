import React, { useContext } from "react";
import { GlobalContext } from "../GlobalStateRepository";
import { Navigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";

function MyProfilePage() {
  const { user } = useContext(GlobalContext);

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div
      id="profilePage"
      className="flex-grow border border-dashed border-black p-2"
    >
      <div id="top-header" className="">
        <h1 className="mt-12 text-center text-4xl">Welcome {user.name}</h1>
      </div>
      <div
        id="body"
        className="flex flex-grow border border-dashed border-red-600"
      >
        <div
          id="sidebar"
          className="m-3 w-1/3 flex-grow rounded-xl border border-black bg-[#DAD7CD] p-4 font-bold"
        >
          <p>Edit Profile</p>
          <p>My Campaigns</p>
          <p>My Donations</p>
        </div>
        <div className="w-full p-2">
          <EditProfile />
        </div>
      </div>
    </div>
  );
}

export default MyProfilePage;

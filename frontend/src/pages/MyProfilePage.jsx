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
      className="flex flex-grow flex-col border border-dashed border-black p-2"
    >
      <div id="top-header" className="">
        <h1 className="mt-12 text-center text-4xl">Welcome {user.name}</h1>
      </div>
      <div
        id="body"
        className="flex flex-grow border border-dashed border-red-600"
      >
        {/* Sidebar */}
        <div
          id="sidebar"
          className="m-3 flex w-1/4 flex-grow flex-col justify-around rounded-3xl border bg-[#DAD7CD] p-4 text-center"
        >
          <div className="rounded-md p-4 hover:bg-[#A3B18A]">
            <p className="font-mono text-xl">Edit Profile</p>
          </div>
          <div className="rounded-md p-4 hover:bg-[#A3B18A]">
            <p className="font-mono text-xl">My Campaigns</p>
          </div>
          <div className="rounded-md p-4 hover:bg-[#A3B18A]">
            <p className="font-mono text-xl">My Donations</p>
          </div>
        </div>
        <div className="w-full p-2">
          <EditProfile />
        </div>
      </div>
    </div>
  );
}

export default MyProfilePage;

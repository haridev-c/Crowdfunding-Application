import { Button } from "@headlessui/react";
import React from "react";
import NavbarUserProfile from "./NavbarUserProfile";
import { Link } from "react-router-dom";

function AuthenticatedUserControls() {
  return (
    <div className="flex items-center">
      <div className="hidden md:block">
        <Link to={"/create-new-fundraiser"}>
          <button className="mr-4 rounded-full border-2 border-solid border-gray-300 p-1 px-4 font-bold text-gray-200 hover:border-gray-700 hover:bg-gray-700 hover:text-white">
            Create a Fundraiser
          </button>
        </Link>
      </div>
      <div>
        <NavbarUserProfile />
      </div>
    </div>
  );
}

export default AuthenticatedUserControls;

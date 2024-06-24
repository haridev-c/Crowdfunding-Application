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
    <div>
      <h1 className="mt-12 text-center text-4xl">Welcome {user.name}</h1>
      <EditProfile />
    </div>
  );
}

export default MyProfilePage;

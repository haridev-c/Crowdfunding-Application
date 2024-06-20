import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;

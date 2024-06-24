import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Layout() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Layout;

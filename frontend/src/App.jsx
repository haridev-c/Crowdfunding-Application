import React from "react";
import Navbar from "./components/Navbar";
import NavbarUserProfile from "./components/NavbarUserProfile";
import GlobalStateRepository from "./GlobalStateRepository";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <GlobalStateRepository>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </GlobalStateRepository>
    </>
  );
}

export default App;

import React from "react";
import GlobalStateRepository from "./GlobalStateRepository";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import MyProfilePage from "./pages/MyProfilePage";
import CreateFundraiserPage from "./pages/CreateFundraiserPage";
import CampaignPage from "./pages/CampaignPage";
import SportsCategory from "./pages/Categories/SportsCategory";
import AnimalCategory from "./pages/Categories/AnimalCategory";
import MedicalCategory from "./pages/Categories/MedicalCategory";
import EducationCategory from "./pages/Categories/EducationCategory";
import EnvironmentCategory from "./pages/Categories/EnvironmentCategory";
import EmergencyCategory from "./pages/Categories/EmergencyCategory";

axios.defaults.baseURL = "https://sparkfundserver.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <GlobalStateRepository>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/category/sports" element={<SportsCategory />} />
            <Route path="/category/animal" element={<AnimalCategory />} />
            <Route path="/category/education" element={<EducationCategory />} />
            <Route
              path="/category/environment"
              element={<EnvironmentCategory />}
            />
            <Route path="/category/medical" element={<MedicalCategory />} />
            <Route path="/category/emergency" element={<EmergencyCategory />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<MyProfilePage />} />
            <Route path="/campaign/:id" element={<CampaignPage />} />
            <Route
              path="/create-new-fundraiser"
              element={<CreateFundraiserPage />}
            />
          </Route>
        </Routes>
      </GlobalStateRepository>
    </>
  );
}

export default App;

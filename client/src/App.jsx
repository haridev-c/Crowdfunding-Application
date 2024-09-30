import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import { useGetProfileQuery } from "./features/apiSlice";
import { setUser } from "./features/userSlice";
import { useDispatch } from "react-redux";

// page imports
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MyProfilePage from "./pages/MyProfilePage";
import CreateFundraiserPage from "./pages/CreateFundraiserPage";
import CampaignPage from "./pages/CampaignPage";
import SportsCategory from "./pages/Categories/SportsCategory";
import AnimalCategory from "./pages/Categories/AnimalCategory";
import MedicalCategory from "./pages/Categories/MedicalCategory";
import EducationCategory from "./pages/Categories/EducationCategory";
import EnvironmentCategory from "./pages/Categories/EnvironmentCategory";
import EmergencyCategory from "./pages/Categories/EmergencyCategory";

// static asset imports
import spinner from "./assets/spinner.svg";

// axios default configurations
axios.defaults.baseURL = "http://localhost:5050/api";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const { data: profileData, isLoading } = useGetProfileQuery();

  useEffect(() => {
    if (profileData) {
      dispatch(setUser(profileData));
    }
  }, [profileData, dispatch]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <img src={spinner} alt="A green spinner" />
      </div>
    );
  }

  return (
    <>
      <Router>
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
      </Router>
    </>
  );
}

export default App;

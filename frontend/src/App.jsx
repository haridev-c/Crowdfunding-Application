import React from "react";
import GlobalStateRepository from "./GlobalStateRepository";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5050";

function App() {
  return (
    <>
      <GlobalStateRepository>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </GlobalStateRepository>
    </>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";


import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PageNotFound from "./Pages/PageNotFound";
import Certificate from "./Components/Certificate";
import HealthTips from "./Pages/Donor/HealthTips";

import DashboardDonor from "./Pages/Donor/DashboardDonor";
import DashboardHospital from "./Pages/Hospital/DashboardHospital";

//donors
import HomeD from "./Pages/Donor/Home";
import BloodHubD from "./Pages/Donor/Emergency";
import HealthToolsD from "./Pages/Donor/HealthTools";
import LeaderboardD from "./Pages/Donor/Leaderboard";
import ProfileD from "./Pages/Donor/Profile";
import EditProfile from "./Pages/Donor/EditProfile";


//hospital

import HomeH from "./Pages/Hospital/Home";
import EmergencyH from "./Pages/Hospital/Emergency";
import CampH from "./Pages/Hospital/Camp";
import DonorsH from "./Pages/Hospital/Donors";
import ProfileH from "./Pages/Hospital/Profile";

const App = () => {
  return (
    <Routes>

   
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/certificate" element={<Certificate />} />
      <Route path="/health-tips" element={<HealthTips />} />


     {/*Donor*/}

      <Route path="/donor" element={<DashboardDonor />}>
        <Route index element={<HomeD />} />
        <Route path="home" element={<HomeD />} />
        <Route path="bloodhub" element={<BloodHubD />} />
        <Route path="healthtools" element={<HealthToolsD />} />
        <Route path="leaderboard" element={<LeaderboardD />} />
        <Route path="profile" element={<ProfileD />} />
        <Route path="edit-profile" element={<EditProfile />} />
      </Route>

     {/*Hsopital*/}
      <Route path="/hospital" element={<DashboardHospital />}>
        <Route index element={<HomeH />} />
        <Route path="home" element={<HomeH />} />
        <Route path="emergency" element={<EmergencyH />} />
        <Route path="camp" element={<CampH />} />
        <Route path="donors" element={<DonorsH />} />
        <Route path="profile" element={<ProfileH />} />
      </Route>

      
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  );
};

export default App;
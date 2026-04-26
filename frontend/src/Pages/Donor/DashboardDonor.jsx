import Logo from '/src/Components/Logo.jsx'
import Home from './Home';
import Emergency from './Emergency';
import Camps from './Camps';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import { useState } from "react";
import {
  LayoutDashboard,Activity,Grid2x2Plus,CircleStar,Bell,Cross,CircleCheckBig,X,Menu,User,House,CircleAlert,TrendingUp,Calendar,Phone,Map,Locate,MapPin,Clock,Shield,Download,Trophy,Heart,ChevronRight,Crown,Users,MapIcon,Building,Droplet,XIcon,FileWarning,
} 
  from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardDonor() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [active, setActive] = useState("home");

  return (
    <div className={`flex flex-row roboto-slab-body `}>
      <div className="bg-red-900 z-50 h-screen w-50  flex-col  items-start roboto-slab-body text-white fixed left-0 hidden md:block">
        <div className="rounded-full w-40 h-40 bg-white/20 absolute -top-15 -right-6 "></div>
       

        <div className="border-b w-full flex items-start border-gray-400  py-5 p-2 ">
          <Logo />
        </div>

        <div className=" flex flex-col gap-2 w-full my-10">
         <button
  onClick={() => setActive("home")}
  className={`flex flex-row items-center mx-2 rounded-xl p-3 gap-2
    transition-all duration-200 ease-in-out
    hover:bg-white/15 hover:translate-x-1
    cursor-pointer
    ${
      active === "home"
        ? "bg-white/30 text-white shadow-inner border border-white/10 font-medium"
        : "text-white"
    }
  `}
>
  <House className={active === "home" ? "text-white" : "text-white/80"} />
  <span>Home</span>
          </button>

        <button
  onClick={() => setActive("emergency")}
  className={`flex flex-row items-center mx-2 rounded-xl p-3 gap-2
    transition-all duration-200 ease-in-out
    hover:bg-white/15 hover:translate-x-1
    cursor-pointer
    ${
      active === "emergency"
        ? "bg-white/30 text-white shadow-inner border border-white/10 font-medium"
        : "text-white"
    }
  `}
>
  <CircleAlert className={active === "emergency" ? "text-white" : "text-white/80"} />
  <span>Emergency</span>
</button>

          <button
  onClick={() => setActive("camps")}
  className={`flex flex-row items-center mx-2 rounded-xl p-3 gap-2
    transition-all duration-200 ease-in-out
    hover:bg-white/15 hover:translate-x-1
    cursor-pointer
    ${
      active === "camps"
        ? "bg-white/30 text-white shadow-inner border border-white/10 font-medium"
        : "text-white"
    }
  `}
>
  <Calendar className={active === "camps" ? "text-white" : "text-white/80"} />
  <span>Camps</span>
</button>

        <button
  onClick={() => setActive("leaderboard")}
  className={`flex flex-row items-center mx-2 rounded-xl p-3 gap-2
    transition-all duration-200 ease-in-out
    hover:bg-white/15 hover:translate-x-1
    cursor-pointer
    ${
      active === "leaderboard"
        ? "bg-white/30 text-white shadow-inner border border-white/10 font-medium"
        : "text-white"
    }
  `}
>
  <TrendingUp className={active === "leaderboard" ? "text-white" : "text-white/80"} />
  <span>Leaderboard</span>
</button>
        </div>

       <button
  onClick={() => setActive("profile")}
  className={` flex flex-row items-center justify-between absolute bottom-2 px-4 py-3 mx-2 rounded-xl
    transition-all duration-200 ease-in-out
    hover:bg-white/15 hover:scale-[1.01]
    cursor-pointer border  border-white/30
    ${
      active === "profile"
        ? "bg-white/25 shadow-inner"
        : "text-white/90"
    }
  `}
>
  <div className="flex items-center gap-3">
    <div
      className={`rounded-full w-10 h-10 flex items-center justify-center font-bold
        ${active === "profile" ? "bg-white text-red-900" : "bg-white/20 text-white"}
      `}
    >
      AS
    </div>

    
      <span className="text-sm font-medium">Aarav Sharma</span>
    
  
  </div>

  <span className="text-white/60 text-sm">›</span>
</button>
      </div>

      <div className="bg-gray-100 w-full relative md:ml-50   overflow-y-auto">
        {active === "home" && (
          <Home
            active={active}
            setActive={setActive}
            notificationOpen={notificationOpen}
            setNotificationOpen={setNotificationOpen}
          />
        )}
        {active === "emergency" && <Emergency />}
        {active === "camps" && <Camps />}
        {active === "leaderboard" && <Leaderboard />}
        {active === "profile" && <Profile />}
      </div>
      <div className="m-2 h-15 border-gray-300 rounded-xl bg-white shadow fixed bottom-5 left-1 right-1 flex flex-row items-center justify-evenly  md:hidden">
        <button
          onClick={() => {
            setActive("home");
          }}
          className={`flex flex-col items-center justify-center cursor-pointer ${
            active === "home" ? "text-red-900 " : "text-gray-600"
          }`}
        >
          <House />
          <h1
            className={`${
              active === "home"
                ? "text-red-900 font-extrabold text-sm "
                : "text-gray-600 text-xs"
            }`}
          >
            Home
          </h1>
        </button>

        <button
          onClick={() => {
            setActive("emergency");
          }}
          className={`flex flex-col items-center justify-center cursor-pointer ${
            active === "emergency" ? "text-red-900" : "text-gray-600"
          }`}
        >
          <CircleAlert />
          <h1
            className={`${
              active === "emergency"
                ? "text-red-900 font-extrabold text-sm "
                : "text-gray-600 text-xs"
            }`}
          >
            Emergency
          </h1>
        </button>

        <button
          onClick={() => {
            setActive("camps");
          }}
          className={`flex flex-col items-center justify-center cursor-pointer ${
            active === "camps" ? "text-red-900" : "text-gray-600"
          }`}
        >
          <Calendar />
          <h1
            className={`${
              active === "camps"
                ? "text-red-900 font-extrabold text-sm "
                : "text-gray-600 text-xs"
            }`}
          >
            Camps
          </h1>
        </button>

        <button
          onClick={() => {
            setActive("leaderboard");
          }}
          className={`flex flex-col items-center justify-center cursor-pointer ${
            active === "leaderboard" ? "text-red-900" : "text-gray-600"
          }`}
        >
          <TrendingUp />
          <h1
            className={`${
              active === "leaderboard"
                ? "text-red-900 font-extrabold text-sm "
                : "text-gray-600 text-xs"
            }`}
          >
            Leaderboard
          </h1>
        </button>

        <button
          onClick={() => {
            setActive("profile");
          }}
          className={`flex flex-col items-center justify-center cursor-pointer ${
            active === "profile" ? "text-red-900" : "text-gray-600"
          }`}
        >
          <User />
          <h1
            className={`${
              active === "profile"
                ? "text-red-900 font-extrabold text-sm "
                : "text-gray-600 text-xs"
            }`}
          >
            Profile
          </h1>
        </button>
      </div>
    </div>
  );
}

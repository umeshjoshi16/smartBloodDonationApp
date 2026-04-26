import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Download,
  Bell,
  MapPin,
  Shield,
  Trophy,
} from "lucide-react";


export default function Profile(){
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  const eligibilityPct = 63;

  const history = [
    {
      title: "Nepal Red Cross Drive",
      date: "Mar 14, 2025",
      type: "Camp",
      bloodType: "O+",
    },
    {
      title: "Bir Hospital Emergency",
      date: "Jan 8, 2025",
      type: "Emergency",
      bloodType: "O+",
    },
    {
      title: "Pulchowk Campus Drive",
      date: "Oct 20, 2024",
      type: "Camp",
      bloodType: "O+",
    },
  ];

  const menuItems = [
    { icon: Bell, label: "Notification preferences" },
    { icon: MapPin, label: "Availability schedule" },
    { icon: Shield, label: "Privacy & data" },
    { icon: Download, label: "My certificates" },
    { icon: Trophy, label: "Badges & achievements" },
  ];

  const handleLogout = () => {
    setLogout((prev) => !prev);
  };

  return (
    <div className=" flex flex-col items-center justify-start gap-5 mb-30 md:mb-10  w-full min-h-screen">
      {/*User Information*/}
      <div className="flex flex-wrap items-center  w-fit rounded-xl border border-gray-200   bg-white p-5 gap-5 mt-5 mx-5 md:w-150 ">
        <div className=" flex items-center    justify-center rounded-full bg-red-100 w-20 h-20">
          <h1 className="text-red-900 font-bold">AS</h1>
        </div>
        <div>
          <h1 className="font-bold text-red-900">Aarav Sharma</h1>
          <h1 className="text-gray-500 text-sm">Blood type: O+</h1>
          <h1 className="text-gray-500 text-sm">Kathmandu</h1>
          <h1 className="text-gray-500 text-sm">Donor Since: 2022</h1>
        </div>

        <div className="w-full flex items-center justify-evenly">
          <button className="p-1 border h-fit rounded-xl border-green-200  bg-green-50 text-green-800 cursor-pointer hover:bg-green-200 px-2  ">
            Available to Donate
          </button>

          <button
            onClick={() => {
              navigate("/donor/edit-profile");
            }}
            className="p-1 border h-fit rounded-xl border-gray-200  bg-gray-50 text-gray-800 cursor-pointer hover:bg-gray-200 px-2  "
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5 ">
        {/*User Stat info*/}
        <div className="flex items-center justify-evenly w-full md:w-100 border rounded-xl px-2 p-3 mx-2 border-gray-200 bg-white ">
          <div className="p-2 bg-white rounded-xl  border border-gray-200 flex items-center flex-col px-3  shadow">
            <span className="text-3xl font-bold text-red-900">7</span>
            <h1 className="text-sm text-gray-500">Donations</h1>
          </div>

          <div className="p-2 bg-white rounded-xl border border-gray-200 flex items-center flex-col px-3 shadow">
            <span className="text-3xl font-bold text-red-900">4.5</span>
            <h1 className="text-sm text-gray-500">Liters Donated</h1>
          </div>

          <div className="p-2 bg-white rounded-xl border border-gray-200 flex items-center flex-col px-3 shadow">
            <span className="text-3xl font-bold text-red-900">21</span>
            <h1 className="text-sm text-gray-500">Lives Saved</h1>
          </div>
        </div>

        {/*Eligibility status*/}

        <div className="flex flex-col items-start justify-center bg-white border border-gray-200 rounded-2xl p-5 pr-10 w-90">
          <span className="font-semibold text-md mb-3">Eligibility Status</span>
          <div className="flex justify-between text-xs text-gray-500 mb-2 w-full">
            <span>Last donated: Mar 14, 2025</span>
            <span className="ml-auto">Eligible: May 9, 2025</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-red-900 h-2 rounded-full transition-all"
              style={{ width: `${eligibilityPct}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">21 days remaining</p>
        </div>
      </div>

      {/*Personal Information*/}
      <div className="flex flex-col bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mx-5 max-w-200 ">
        <h2 className="text-md font-semibold mb-4">Personal Information</h2>

        <div className="flex flex-wrap gap-2 md:gap-5 md:justify-evenly justify-start  items-start">
          {/* Name */}
          <div className="mb-3 w-40 ">
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium text-sm">Aarav Sharma</p>
          </div>

          {/* Email */}
          <div className="mb-3  w-40 ">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-sm">aarav@gmail.com</p>
          </div>

          {/* Phone */}
          <div className="mb-3  w-40 ">
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium text-sm">9848XXXXXX</p>
          </div>

          {/* DOB */}
          <div className="mb-3  w-40 ">
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium text-sm">Jan 15, 2002</p>
          </div>

          {/* Gender */}
          <div className="mb-3  w-40 ">
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium text-sm">Male</p>
          </div>

          {/* Blood Group */}
          <div className="mb-3  w-40 ">
            <p className="text-sm text-gray-500">Blood Group</p>
            <p className="font-medium text-red-900 text-sm">O+</p>
          </div>

          <div className="mb-3  w-40 ">
            <p className="text-sm text-gray-500">City</p>
            <p className="font-medium text-sm">Kathmandu</p>
          </div>

          <div className="mb-3  w-40 ">
            <p className="text-sm text-gray-500">Area</p>
            <p className="font-medium text-sm">Baneshwor</p>
          </div>

          <div className="mb-3  w-40 ">
            <p className="text-sm text-gray-500">Landmark</p>
            <p className="font-medium text-sm">Near XYZ Hospital</p>
          </div>
        </div>
      </div>

      {/*Donation History*/}

      <div className="flex flex-col bg-white border border-gray-200 rounded-2xl p-5 min-h-50  mx-5 w-90 md:w-130 ">
        <div className="flex flex-row w-full text-md font-medium mb-5">
          <h1>Donation History</h1>
          <span className="ml-auto text-red-900 hover:underline cursor-pointer">
            See all
          </span>
        </div>

        {/*Donation details*/}

        <div className="flex flex-col w-full items-start">
          <div className="flex flex-row border-b w-full gap-5 p-2 border-gray-200">
            <div className="rounded-full bg-red-50  shadow p-2 flex items-center justify-center w-10 h-10 ">
              <Heart className="text-red-900" size={18} />
            </div>

            <div className="flex flex-col">
              <h1 className="font-medium text-sm">Nepal Red Cross</h1>
              <div className="flex flex-row gap-2 text-xs text-gray-500">
                <span>Mar 14 ,2025</span>
                <span>Camp</span>
                <span>O+</span>
              </div>
              <div className="flex flex-row gap-2 text-xs text-gray-500">
                <span>Kathmandu</span>
              </div>
            </div>

            <button className="flex flex-row  items-center justify-center  text-xs  ml-auto gap-1 hover:underline text-blue-700 cursor-pointer p-1 ">
              <Download size={13} />
              <span>Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/*setting*/}
      <div className="flex flex-col bg-white border border-gray-200 rounded-2xl p-5 min-h-50  mx-5 w-90 md:w-130 ">
        <div flex flex-row w-full text-md mb-5>
          <h1 className="font-medium">Settings</h1>
        </div>

        <div></div>
      </div>

      {/*logout*/}
      <button
        onClick={handleLogout}
        className=" p-2 px-10 rounded-xl bg-red-900  text-white font-bold shadow cursor-pointer hover:bg-red-700"
      >
        Logout
      </button>
      {logout && (
        <div  onClick={() => setLogout(false)} className="fixed inset-0  bg-black/50 flex items-center justify-center z-50">
          <div onClick={(e)=>{
            e.stopPropagation();

          }} className="bg-white rounded-xl p-6 w-80 text-center shadow-lg">
            <h1 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h1>

            <div className="flex justify-center gap-4">
              <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer">
                Yes
              </button>

              <button
                onClick={() => setLogout(false)}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
import { useState } from "react";
import noCamp from "/src/assets/noCamp.png";
import { Droplets, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Toaster,toast } from "react-hot-toast";

const campSchema = yup.object({
  campName: yup.string().trim().required("Camp name is required").min(3, "Camp name must be at least 3 characters"),
  contactPerson: yup.string().trim().required("Coordinator name is required").min(3, "Coordinator name must be at least 3 characters"),
  contactPersonPhone: yup.string().trim().matches(/^[0-9]{10}$/,"Phone number must contain exactly 10 digits").required("Coordinator phone number is required"),
  email: yup.string().trim().email("Please enter a valid email address").required("Email is required"),
  province: yup.string().trim().required("Please select a province"),
  district: yup.string().trim().required("District is required"),
  city: yup.string().trim().required("City is required"),
  streetAddress: yup.string().trim().required("Street address is required"),
  expectedDonors: yup.number().typeError("Expected donors must be a number").required("Expected number of donors is required").min(1, "Expected donors must be at least 1"),
  startDate: yup.date().required("Start date and time is required"),
  endDate: yup.date().required("End date and time is required").min(yup.ref("startDate"),"End date and time cannot be before the start date and time"),
   additionalMessage: yup.string().trim().max(500, "Additional message cannot exceed 500 characters").nullable(),
});

 


const LOCATIONS = {
  Bagmati: {
    Kathmandu: ["Kathmandu", "Kirtipur"],
    Lalitpur: ["Lalitpur", "Godawari"],
    Bhaktapur: ["Bhaktapur", "Madhyapur Thimi"],
  },
  Koshi: {
    Morang: ["Biratnagar", "Urlabari"],
    Sunsari: ["Itahari", "Dharan"],
  },
};

export default function Camp() {
  const [activeTab, setActiveTab] = useState("myCamp");
  const [form, setForm] = useState({});

  const districts = form.province ? Object.keys(LOCATIONS[form.province] || {}) : [];
  const cities =
    form.province && form.district
      ? LOCATIONS[form.province]?.[form.district] || []
      : [];

      const onSubmit=async(data)=>{
       try{
         const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/camps`,data,{
         withCredentials:true,
         })


         toast.success("Sucessfully posted Emergency Request");
         }
       catch(err){
         toast.error("Failed to Post Request")
          console.log(error);

       }
      }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      <h1 className="font-semibold text-lg">Upcoming Camps</h1>

      {/* TABS */}
      <div className="flex items-center justify-evenly md:w-100 p-1 w-full rounded-xl bg-red-50 border border-red-100">
        <button
          onClick={() => setActiveTab("myCamp")}
          className={`px-7 p-1.5 rounded-xl cursor-pointer ${
            activeTab === "myCamp" ? "bg-red-900 text-white" : "text-red-900"
          }`}
        >
          My Camps
        </button>

        <button
          onClick={() => setActiveTab("addCamp")}
          className={`px-7 p-1.5 rounded-xl cursor-pointer ${
            activeTab === "addCamp" ? "bg-red-900 text-white" : "text-red-900"
          }`}
        >
          + Add New
        </button>
      </div>

      {/* EMPTY STATE */}
      {activeTab === "myCamp" && (
        <div className="flex flex-col items-center justify-center w-full md:w-100">
          <img src={noCamp} className="w-50 rounded-full" />
          <h1 className="font-bold text-xl">No camps scheduled</h1>
        </div>
      )}

      {/* add camp form */}
      {activeTab === "addCamp" && (
  <div
    onClick={() => setActiveTab("myCamp")}
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 "
  >
    <div 
      onClick={(e) => e.stopPropagation()}
      className="rounded-xl flex flex-col w-full  md:w-150 bg-white  max-h-[95vh]"
    >

     
      <div className="bg-red-900 flex flex-row items-center p-1 text-white w-full px-5 rounded-t-xl gap-5 h-15">

        <div className="rounded-xl p-2 bg-amber-500/40">
          <Droplets />
        </div>

        <div className="flex flex-col items-start justify-center">
          <h1>Blood Donation Camp</h1>
        </div>

        <button
          onClick={() => setActiveTab("myCamp")}
          className="ml-auto rounded-xl p-2 hover:bg-red-700 cursor-pointer"
        >
          <X />
        </button>
      </div>

     
      <div className="flex flex-wrap gap-x-5 items-center justify-start w-full p-2 px-5 text-sm overflow-y-auto hide-scrollbar">

        {/* Camp Name */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Camp Name*</label>
          <input
            type="text"
            placeholder="Enter camp name"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring"
          />
        </div>

        {/* Contact Person */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Contact Person*</label>
          <input
            type="text"
            placeholder="Enter contact person name"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Phone*</label>
          <input
            type="text"
            placeholder="Enter phone number"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring"
          />
        </div>

        {/* Province */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Province*</label>
          <select className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700">
            <option>Select Province</option>
            <option>Bagmati</option>
            <option>Koshi</option>
            <option>Madhesh</option>
            <option>Gandaki</option>
            <option>Lumbini</option>
            <option>Karnali</option>
            <option>Sudurpashchim</option>
          </select>
        </div>

        {/* District */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">District*</label>
          <input
            type="text"
            placeholder="Enter district"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring"
          />
        </div>

        {/* City */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">City*</label>
          <input
            type="text"
            placeholder="Enter city"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring"
          />
        </div>

        {/* Street */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Street Name*</label>
          <input
            type="text"
            placeholder="Enter street / area"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring"
          />
        </div>

        {/* Expected Donors */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Expected Donors*</label>
          <input
            type="number"
            placeholder="e.g. 50"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring"
          />
        </div>

        {/* Start Date */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Start Date*</label>
          <input
            type="datetime-local"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">End Date*</label>
          <input
            type="datetime-local"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col w-full md:w-115">
          <label className="text-sm font-medium text-gray-700 mb-1">Additional Message</label>
          <textarea
            placeholder="Enter additional details about camp"
            className="resize-none border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring"
          />
        </div>

      </div>

      {/* buttons*/}
      <div className="flex flex-row item-center justify-center my-5 gap-10">
        <button
          type="button"
          onClick={() => setActiveTab("myCamp")}
          className="text-white bg-gray-700 p-2 rounded-lg px-7 cursor-pointer hover:bg-gray-500"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-red-900 p-2 rounded-lg px-7 text-white cursor-pointer hover:bg-red-700"
        >
          Post Camp
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}
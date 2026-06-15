import React, { useState } from "react";
import {
  X,
  Users,
  Calendar,
  Clock,
  MapPin,
  User,
  Building,
  Heart,Droplets,
  Sparkle,
  Sparkles,
} from "lucide-react";

export default function Camps(){
  const[registerCamp,setRegisterCamp]=useState(false);
  const [detailsOpen,setDetailsOpen]=useState(false);
   const [addCampSection,setaddCampSection]=useState('personal');
  const [healthAnswers, setHealthAnswers] = useState({
  fever: null,
  tattoo: null,
  alcohol: null,
 });
 const [isChecked, setIsChecked] = useState(false);

  const [donatedAnswer,setDonatedAnswer]=useState(null)

 const isHealthComplete =
  healthAnswers.fever !== null &&
  healthAnswers.tattoo !== null &&
  healthAnswers.alcohol !== null;

  const handleContinue = () => {
  if (addCampSection === "personal") setaddCampSection("health");
  else if (addCampSection === "health") setaddCampSection("confirm");
 };

 const handleBack = () => {
  if (addCampSection ===  "confirm") setaddCampSection("health");
  else if (addCampSection === "health") setaddCampSection("personal");
 };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen ">
      <div className="flex flex-col gap-3 md:m-5 m-1  ">
        <h1 className="font-medium text-lg">Upcoming Camps</h1>
      </div>
      <div className="flex flex-row items-start justify-start gap-5 border-b border-gray-300 p-2">
        <button className="border px-7 p-1.5 rounded-xl border-gray-200 font-medium bg-white cursor-pointer hover:bg-gray-200">
          All
        </button>
        <button className="border px-7 p-1.5 rounded-xl border-gray-200 font-medium bg-white cursor-pointer hover:bg-gray-200">
          Registered
        </button>
      </div>

      { registerCamp&&(
    <div onClick={() => setRegisterCamp(false)} className="fixed inset-0 h-screen bg-black/40 flex items-center justify-center z-50">

     <div  onClick={(e)=>{
      e.stopPropagation();
    }} className="rounded-xl flex flex-col w-full md:w-150 bg-white overflow-y-auto mt-6 md:mt-0  max-h-screen">

      <div className="bg-red-900 flex flex-row items-center justify-self-stretch p-1 text-white w-full px-5 rounded-t-xl gap-5 h-15 ">
        <div className=" rounded-xl p-2 bg-white/30">
        <Droplets />
        </div>

        <div className="flex flex-col items-start justify-center  ">
          <h1>Camp Registration</h1>
          


        </div>
        <button onClick={() => setRegisterCamp(false)} className="ml-auto  rounded-xl p-2 hover:bg-red-700 cursor-pointer">
        <X/>
      </button>

      </div>
      
      <div className="flex flex-col items-center justify-start w-full  p-2 px-5">

        <div className="flex flex-row items-center justify-evenly w-full gap-1">
          
          <div className={`flex flex-col items-center p-2 rounded-xl min-w-20
  ${addCampSection === 'personal' || addCampSection === 'health' || addCampSection === 'confirm' 
    ? 'bg-green-200' 
    : 'bg-gray-100'}`}>

        <div className={`rounded-full  p-2 w-7 h-7 flex items-center justify-center font-bold `}>1
          
        </div>
        <span className="text-sm">Personal</span>
        </div>
       <div className={`h-1 w-30 rounded-xl 
  ${addCampSection === 'health' || addCampSection === 'confirm' 
    ? 'bg-green-300' 
    : 'bg-gray-300'}`}>
</div>

       <div className={`flex flex-col items-center p-2 rounded-xl min-w-20 
  ${addCampSection === 'health' || addCampSection === 'confirm' 
    ? 'bg-green-200' 
    : 'bg-gray-100'}`}>
          

        <div className="rounded-full  p-2 w-7 h-7 flex items-center justify-center font-bold">2
          
        </div>
        <span className="text-sm">Health</span>
        </div>
       
<div className={`h-1 w-30 rounded-xl 
  ${addCampSection === 'confirm' 
    ? 'bg-green-300' 
    : 'bg-gray-300'}`}>
</div>


        <div className={`flex flex-col items-center p-2 rounded-xl min-w-20
  ${addCampSection === 'confirm' 
    ? 'bg-green-200' 
    : 'bg-gray-100'}`}>

        <div className="rounded-full  p-2 w-7 h-7 flex items-center justify-center font-bold">3
          
        </div>
        <span className="text-sm">Confirm</span>
        </div>
        

       


        </div>
{
  addCampSection==='personal'&&(
    <div className="m-1 w-full">

  {/*  Title */}
  <h2 className="text-lg font-semibold text-gray-800 ">
    PERSONAL INFO <span className="text-sm text-gray-500">(Auto Filled)</span>
  </h2>

  {/* Card */}
  <div className="bg-white rounded-2xl  px-2">

    <div className="grid grid-cols-1 md:grid-cols-2  gap-2  gap-x-6 text-sm">

      {/* Name */}
      <div className="flex flex-col w-55">
        <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          defaultValue="Umesh Joshi"
          className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring "
        />
      </div>

      {/* Email */}
      <div className="flex flex-col w-55">
        <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          defaultValue="umesh@gmail.com"
          
          className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700  outline-0 focus:ring-red-900 focus:ring "
        />
      </div>

      {/* Date of Birth */}
      <div className="flex flex-col md:w-55 w-30">
        <label className="text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
        <input
          type="date"
          defaultValue="2003-05-02"
          
          className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700  outline-0 focus:ring-red-900 focus:ring "
        />
      </div>

      {/* Gender */}
      <div className="flex flex-col w-35 md:w-55">
        <label className="text-sm font-medium text-gray-700 mb-1">Gender</label>
        <input
          type="text"
          defaultValue="Male"
         
          className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700  outline-0 focus:ring-red-900 focus:ring "
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col w-55">
        <label className="text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="text"
          defaultValue="98XXXXXXXX"
        
          className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700  outline-0 focus:ring-red-900 focus:ring "
        />
      </div>

      {/* Blood Group */}
      <div className="flex flex-col w-35 md:w-55">
        <label className="text-sm font-medium text-gray-700 mb-1">Blood Group</label>
        <input
          type="text"
          defaultValue="O+"
          
          className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700  outline-0 focus:ring-red-900 focus:ring "
        />
      </div>

      {/* City */}
      <div className="flex flex-col  w-55">
        <label className="text-sm font-medium text-gray-700 mb-1">City</label>
        <input
          type="text"
          defaultValue="Kathmandu"
          className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700  outline-0 focus:ring-red-900 focus:ring "
        />
      </div>

    </div>
  </div>

  <div className="flex flex-row item-center justify-center my-5 gap-10">
    <button  onClick={() => setRegisterCamp(false)} className="text-white bg-gray-700 p-2 rounded-lg px-7 cursor-pointer hover:bg-gray-500 ">Cancel</button>
    <button onClick={handleContinue} 
    className=" bg-red-900 p-2 rounded-lg px-7 text-white cursor-pointer hover:bg-red-700">Continue</button>
</div>


    
</div>

  )
}

{
  addCampSection==='health'&&(
    <div className="flex flex-col items-start justify-start  w-full ">
      <div className="flex flex-col  ">
        <h1 className="text-lg font-semibold text-gray-800 ">HEALTH INFORMATION</h1>
        <div className="px-3">

        <div className="flex flex-col">
          <label className="font-medium text-gray-700 text-sm">Weight(kg)</label>
          <input
          type="text"
          placeholder="e.g. 55"
          className="border border-gray-300 rounded-lg w-40 px-3 py-1 bg-gray-50 text-gray-700  outline-0 focus:ring-red-900 focus:ring "
        />

        </div>
        <div className="flex flex-col w-full">
          <label className="font-medium text-gray-700 text-sm">Have you donated blood previously?</label>

        <div className="flex flex-row gap-5">
         <button
    type="button"
    onClick={() => setDonatedAnswer(true)}
    className={`w-40 border rounded-md p-1 cursor-pointer font-medium
      ${donatedAnswer === true
        ? "bg-red-500 text-white border-red-500"
        : "border-gray-300 hover:bg-red-200 hover:text-red-700 hover:border-red-200"}`}
  >
    Yes
  </button>

 
  <button
    type="button"
    onClick={() => setDonatedAnswer(false)}
    className={`w-40 border rounded-md p-1 cursor-pointer font-medium
      ${donatedAnswer === false
        ? "bg-green-500 text-white border-green-500"
        : "border-gray-300 hover:bg-green-200 hover:text-green-700 hover:border-green-200"}`}
  >
    No
  </button>
         
        </div>
        {
          donatedAnswer&&(
             <div className="flex flex-col md:w-55 w-30">
        <label className="text-sm font-medium text-gray-700 mb-1">Last Donated Date</label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-3 py-1 bg-gray-100 text-gray-700  outline-0 focus:ring-red-900 focus:ring "
        />
      </div>
          )
        }

        </div>

        


        <div>
          <h1 className="font-medium">HEALTH SCREENING</h1>
          <p className="font-medium text-gray-700 text-sm">Answer honestly. Answering "Yes" to any may change eligibility.</p>

          <div className="flex flex-col gap-3">
          <div className="w-full border border-gray-200 bg-gray-50 rounded-md p-2 flex flex-row font-light gap-5">
            <h1 className=" text-gray-700 text-sm">
              Have you had a fever n the last 7 days?

            </h1>
             <div className="flex flex-row gap-5 ml-auto">
         <button
  onClick={() => setHealthAnswers((prev) => ({
      ...prev,
      fever: true,
    }))}
  className={`px-2 p-1 rounded border font-medium transition cursor-pointer ${
    healthAnswers.fever === true
      ? "bg-red-500 text-white border-red-500"
      : "border-gray-300 hover:bg-red-200 hover:border-red-200 hover:text-red-700"
  }`}
>
  Yes
</button>

<button
  onClick={() => setHealthAnswers((prev) => ({
      ...prev,
      fever: false,
    }))}
  className={`px-2 p-1 rounded border font-medium transition cursor-pointer ${
    healthAnswers.fever === false
      ? "bg-green-500 text-white border-green-500"
      : "border-gray-300 hover:bg-green-200 hover:border-green-200 hover:text-green-700"
  }`}
>
  No
</button>
         
        </div>
             
          </div>

          <div className="w-full border border-gray-200 bg-gray-50 rounded-md p-2 flex flex-row  font-light gap-5">
            <h1 className=" text-gray-700 text-sm">
              Have you gotten a tattoo in the last 6 months?

            </h1>
               <div className="flex flex-row gap-5 ml-auto">
         <button
  onClick={() => setHealthAnswers((prev) => ({
      ...prev,
      tattoo: true,
    }))}
  className={`px-2 p-1 rounded border font-medium transition cursor-pointer ${
    healthAnswers.tattoo === true
      ? "bg-red-500 text-white border-red-500"
      : "border-gray-300 hover:bg-red-200 hover:border-red-200 hover:text-red-700"
  }`}
>
  Yes
</button>

<button
  onClick={() => setHealthAnswers((prev) => ({
      ...prev,
      tattoo: false,
    }))}
  className={`px-2 p-1 rounded border font-medium transition cursor-pointer ${
    healthAnswers.tattoo === false
      ? "bg-green-500 text-white border-green-500"
      : "border-gray-300 hover:bg-green-200 hover:border-green-200 hover:text-green-700"
  }`}
>
  No
</button>
         
        </div>

          </div>

          <div className="w-full border border-gray-200 bg-gray-50 rounded-md p-1  flex flex-row font-light gap-5">
            <h1 className=" text-gray-700 text-sm">
              Have you consumed alcohol in the last 24 hours?

            </h1>
             <div className="flex flex-row gap-5 ml-auto">
         <button
  onClick={() => setHealthAnswers((prev) => ({
      ...prev,
      alcohol: true,
    }))}
  className={`px-2 p-1 rounded border font-medium transition cursor-pointer ${
    healthAnswers.alcohol === true
      ? "bg-red-500 text-white border-red-500"
      : "border-gray-300 hover:bg-red-200 hover:border-red-200 hover:text-red-700"
  }`}
>
  Yes
</button>

<button
  onClick={() => setHealthAnswers((prev) => ({
      ...prev,
      alcohol: false,
    }))}
  className={`px-2 p-1 rounded border font-medium transition cursor-pointer ${
    healthAnswers.alcohol === false
      ? "bg-green-500 text-white border-green-500"
      : "border-gray-300 hover:bg-green-200 hover:border-green-200 hover:text-green-700"
  }`}
>
  No
</button>
         
        </div>

          </div>

        </div>

        



        </div>


      </div>

       <div className="flex flex-row item-center justify-center mt-2 gap-10">
    <button  onClick={handleBack} className="text-white bg-gray-700 p-2 rounded-lg px-7 cursor-pointer hover:bg-gray-500 ">Cancel</button>
    <button onClick={handleContinue} 
    disabled={!isHealthComplete}
    className={`px-7 py-2 rounded-lg text-white transition ${ isHealthComplete
      ? "bg-red-900 hover:bg-red-700 cursor-pointer"
      : "bg-gray-400 cursor-not-allowed"
  }`}>Continue</button>
</div>
</div>


      </div>
      
  )
}


{
  addCampSection === 'confirm' && (
    <div className="w-full py-5">
      <div className="flex flex-col gap-5 text-sm  max-h-[70vh] overflow-y-auto hide-scrollbar pr-2">

        {/* Personal Information */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex gap-2">
              <span className="font-medium">Name:</span>
              <span className="text-gray-500">Umesh Joshi</span>
            </div>

            <div className="flex gap-2">
              <span className="font-medium">Email:</span>
              <span className="text-gray-500">umesh@gmail.com</span>
            </div>

            <div className="flex gap-2">
              <span className="font-medium">Phone:</span>
              <span className="text-gray-500">98XXXXXXXX</span>
            </div>

            <div className="flex gap-2">
              <span className="font-medium">Date of Birth:</span>
              <span className="text-gray-500">2003-05-02</span>
            </div>

            <div className="flex gap-2">
              <span className="font-medium">Gender:</span>
              <span className="text-gray-500">Male</span>
            </div>

            <div className="flex gap-2">
              <span className="font-medium">Blood Group:</span>
              <span className="text-gray-500">O+</span>
            </div>

            <div className="flex gap-2">
              <span className="font-medium">City:</span>
              <span className="text-gray-500">Kathmandu</span>
            </div>
          </div>
        </div>

        {/* Health Information */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
            Health Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex gap-2">
              <span className="font-medium">Weight:</span>
              <span className="text-gray-500">55 kg</span>
            </div>

            <div className="flex gap-2">
              <span className="font-medium">Previously Donated:</span>
              <span className="text-gray-500">Yes</span>
            </div>

            <div className="flex gap-2">
              <span className="font-medium">Last Donated Date:</span>
              <span className="text-gray-500">2025-12-10</span>
            </div>
          </div>
        </div>

        {/* Health Screening */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
            Health Screening
          </h2>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <span className="text-gray-700">Fever in the last 7 days</span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                No
              </span>
            </div>

            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <span className="text-gray-700">Tattoo in the last 6 months</span>
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                Yes
              </span>
            </div>

            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <span className="text-gray-700">Consumed alcohol in last 24 hours</span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                No
              </span>
            </div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-yellow-800 text-sm">
          Based on your answers, you may not currently be eligible to donate blood.
        </div>

        {/* Confirmation Checkbox */}
        <div className="flex items-start gap-3 px-1">
          <input
            type="checkbox"
            className="w-4 h-4 mt-1 accent-red-700 cursor-pointer"
          />

          <label className="text-gray-700 leading-6 cursor-pointer">
            I confirm that the information provided is correct and accurate.
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-row item-center justify-center my-5 m-1 gap-10 text-base">
    <button  onClick={handleBack} className="text-white bg-gray-700 p-2 rounded-lg px-7 cursor-pointer hover:bg-gray-500 ">Cancel</button>
    <button onClick={handleContinue} 
    disabled={!isHealthComplete}
    className={`px-7 py-2 rounded-lg text-white transition ${ isHealthComplete
      ? "bg-red-900 hover:bg-red-700 cursor-pointer"
      : "bg-gray-400 cursor-not-allowed"
  }`}>Continue</button>
</div>

      </div>
    </div>
  )
}







        </div>




      </div>

      </div>

  )

}
      
      {

        detailsOpen&&(
          <div  onClick={() => setDetailsOpen(false)}
           className="fixed inset-0 bg-black/20 flex items-start justify-end z-50 h-screen">
            
              <div onClick={(e)=>{
                 e.stopPropagation();
              }} className="h-full w-65 bg-white shadow overflow-y-scroll">

                <div className="flex flex-row w-full bg-red-900 p-3 text-white ">
                <h1 className="font-medium text-lg p-2">Camp Details</h1>
                
                <button onClick={()=>{
                  setDetailsOpen(false);
                }} className="ml-auto p-2 mr-2 cursor-pointer rounded-xl hover:bg-red-700 flex items-center justify-center"><X/></button>

              </div>

              <div className="flex flex-col p-3 gap-2 text-sm overflow-y-auto">
                 <span className="rounded-xl border border-gray-200 p-2 font-medium text-md text-center text-red-900">
                  Blood Donation Camp

                  
                  </span>
                
                 {/*seats status*/}
                
                <div className="rounded-xl border border-gray-200 text-gray-600 ">

                  <div className="flex flex-row items-center text-red-900 p-2 px-4 gap-2">
                    <Users size={16}/>
                    <h1>Seats Status</h1>
                  </div>

                   <div className="flex flex-row text-center justify-evenly">
                  <span className="flex flex-col text-center">
                    <span className=" text-sm">Total</span>
                    <span>10</span>

                  </span>

                   <span  className="flex flex-col text-center">
                    <span className=" text-sm">Registered</span>
                    <span>10</span>

                  </span>

                   <span  className="flex flex-col text-center">
                    <span className="text-sm">Available </span>
                    <span>10</span>

                  </span>

                 


                  </div>

                </div>

                 {/*date*/}
                
                <div className="rounded-xl border border-gray-200 p-2 px-4 text-gray-600">

                  <div className="flex flex-row items-center text-red-900  gap-2">
                    <Calendar size={16}/>
                    <h1>Date</h1>
                  </div>

                   
                  <h1 className="flex flex-col text-sm ">
                    2026-04-28
                  </h1>

                  

                </div>
         
                 {/*time*/}
                
                 <div className="rounded-xl border border-gray-200 p-2 px-4 text-gray-600">
                  
                  <div className="flex flex-row items-center text-red-900  gap-2">
                    <Clock size={16}/>
                    <h1>Time</h1>
                  </div>
                  <h1 className="flex flex-col text-sm ">
                    10:00-4:00
                  </h1>
                </div>
                  {/*location*/}
                 <div className="rounded-xl border border-gray-200 p-2 px-4 text-gray-600">
                  
                  <div className="flex flex-row items-center text-red-900  gap-2">
                    <MapPin size={16}/>
                    <h1>Location</h1>
                  </div>
                  <h1 className="flex flex-col text-sm ">
                    Koteshwor,Kathmandu
                  </h1>
                </div>

                 {/*coordinator*/}
                 <div className="rounded-xl border border-gray-200 p-2 px-4 text-gray-600">
                  
                  <div className="flex flex-row items-center text-red-900  gap-2">
                    <User size={16}/>
                    <h1>Co-ordinator</h1>
                  </div>
                  <h1 className="flex flex-col text-sm ">
                   Ram Khadka
                  </h1>
                  <h1 className="flex flex-col text-sm ">
                   9812345678
                  </h1>
                </div>

                 {/*organizer*/}
                 <div className="rounded-xl border border-gray-200 p-2 px-4">
                  
                  <div className="flex flex-row items-center text-red-900  gap-2">
                    <Building size={16}/>
                    <h1>Organizer</h1>
                  </div>
                  <h1 className="flex flex-col text-sm text-gray-600">
                   Civil Hospital
                  </h1>
                  <h1 className="flex flex-col text-sm text-gray-600">
                   Min bhawan Kathmandu
                  </h1>
                </div>
                {/*highlights*/}
                  <div className="rounded-xl border border-gray-200 p-2 px-4">
                     <div className="flex flex-row items-center text-red-900  gap-2">
                   <Sparkles size={16}/>
                    <h1>Highlights</h1>

                  </div>
                  <div className="flex flex-col text-sm text-gray-600 gap-1">
                    <ul className="list-disc pl-4 text-sm text-gray-600">
  <li>Help save lives ❤️</li>
  <li>Free health checkup & report</li>
  <li>Certified medical professionals</li>
  <li>Quick process (20–30 mins)</li>
  <li>Digital certificate provided</li>
</ul>
 
              </div>

                  </div>
                
                 {/*button*/}

                <button className="flex flex-row items-center gap-2 p-2 rounded bg-red-900 hover:bg-red-700 text-white cursor-pointer mt-2">
                  <Heart size={16}/>
                  <span>Register for this camp</span>
                </button>

                



              </div>


              </div>
              
            

          </div>
        )
      }
       {/*Camps*/}
      <div className="flex flex-wrap gap-5 mt-3 mb-20 md:mb-5">
        <div className="bg-white border border-gray-200 rounded-2xl w-80 shadow-sm hover:shadow-md transition">
          <div className="h-3 bg-red-900 rounded-t-2xl"></div>

          <div className="p-5 space-y-2">
            <h1 className="text-lg font-semibold">Nepal Red Cross</h1>
            <h1 className="text-md text">Blood Donation Camp</h1>


            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Calendar size={16} />
              <span>Apr 12, 2026</span>
              <Clock size={16} />
              <span>10:00 AM - 2:00 PM</span>
            </div>
            <div className="flex flex-row items-center gap-2 text-gray-600 text-sm">
              <MapPin size={16} />
              <span>Lalitpur</span>
            </div>

            <span className="inline-block text-red-900 font-medium px-3 py-1 rounded-xl text-sm">
              18 slots left
            </span>

           <div className="flex gap-3 mt-4">
              <button onClick={() => setRegisterCamp(true)} className="flex-1 bg-green-100 text-green-800 border border-green-300 py-2 rounded-lg text-sm hover:bg-green-200 transition cursor-pointer">
               Register
              </button>

              <button onClick={()=>{
                setDetailsOpen(true);
              }} className="flex-1 bg-gray-100 text-gray-800 border border-gray-300 py-2 rounded-lg text-sm  cursor-pointer hover:bg-gray-200 transition">
                Details
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl w-80 shadow-sm hover:shadow-md transition">
          <div className="h-3 bg-red-900 rounded-t-2xl"></div>

          <div className="p-5 space-y-2">
            <h1 className="text-lg font-semibold">Nepal Red Cross</h1>
            <h1 className="text-md text">Blood Donation Camp</h1>

            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Calendar size={16} />
              <span>Apr 12, 2026</span>
              <Clock size={16} />
              <span>10:00 AM - 2:00 PM</span>
            </div>
            <div className="flex flex-row items-center gap-2 text-gray-600 text-sm">
              <MapPin size={16} />
              <span>Lalitpur</span>
            </div>

            <span className="inline-block text-red-900 font-medium px-3 py-1 rounded-xl text-sm">
              18 slots left
            </span>

            <div className="flex gap-3 mt-4">
              <button className="flex-1 bg-green-100 text-green-800 border border-green-300 py-2 rounded-lg text-sm hover:bg-green-200 transition cursor-pointer">
               Register
              </button>

              <button onClick={()=>{
                setDetailsOpen(true);
              }} className="flex-1 bg-gray-100 text-gray-800 border border-gray-300 py-2 rounded-lg text-sm  cursor-pointer hover:bg-gray-200 transition">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};
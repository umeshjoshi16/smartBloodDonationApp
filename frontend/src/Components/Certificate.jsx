import React from "react";
import Logo from '../Components/Logo'
import{Heart, HeartPlus, Ribbon} from 'lucide-react'

const defaultDonor = {
  donorName: "Umesh Shrestha",
  bloodGroup: "B+",
  units: "1 Unit",
  event: "GiveLife Blood Donation Drive",
  location: "Koteshwor, Kathmandu",
  date: "April 10, 2026",
  medicalOfficer: "Dr. Anita Rai",
  authorizedBy: "Bibek Thapa",
  certId: " GIVELIFE BLOOD PLATFORM  NEPAL ",
};

export default function Certificate({ donor = defaultDonor }) {
  const d = { ...defaultDonor, ...donor };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 print:p-0 print:bg-white roboto-slab-body">
      
      <button
        
        className="fixed bottom-10 right-10 z-50 bg-red-900 hover:bg-red-900 text-white text-xs font-medium px-5 py-2 rounded-xl shadow cursor-pointer"
      >
        Print / Save PDF
      </button>

    
      <div className="relative w-full max-w-3xl bg-white shadow-2xl overflow-hidden print:shadow-none rounded-xl ">

        
      

        <div className="border-4 border-red-900 relative rounded-xl">
          
<div className="absolute inset-0 overflow-hidden">


<div className="absolute inset-0 overflow-hidden">


  <div className="absolute -top-10 -left-28 w-80 h-80 bg-red-600/10 blur-3xl rounded-full "></div>
  <div className="absolute -bottom-28 -right-28 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>




  <div className="absolute top-10 right-10 w-40 h-40 border border-red-500/40 rounded-full"></div>
  <div className="absolute bottom-10 left-10 w-40 h-40 border border-red-200/40 rounded-full"></div>

 
  <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-red-300 rounded-full"></div>
  <div className="absolute top-1/2 right-1/5 w-1.5 h-1.5 bg-red-400 rounded-full"></div>
  <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-red-300 rounded-full"></div>


  <div className="absolute inset-0 bg-linear-to-br from-transparent via-red-50/20 to-transparent"></div>
  <div  className="absolute top-20 left-45 ">
    <Heart className="fill-red-50  text-red-50" size={400}/>
  </div>


</div>

</div>


       
        <div className=" relative z-10">

         
          <div className="p-10 py-5 w-full bg-red-900 flex inset-0 justify-between items-start">
            <div>
              <div className="flex items-end gap-3">
                 <Logo/>
               
              </div>
              
            </div>
            <div className="text-sm font-light text-white text-right space-y-1">
              <p>Koteshwor, Kathmandu, Nepal</p>
              <p>98XXXXXXXX</p>
              <p>givelife@gmail.com</p>
            </div>
          </div>

          
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-red-700 to-transparent" />
            <div className="w-3 h-3 border border-red-700 rounded-full opacity-40" />
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-red-700 to-transparent" />
          </div>

          <p className="text-center text-xl uppercase text-red-700">
            Certificate of
          </p>

          <h1 className="text-center text-4xl font-bold mt-2">
            Excellence in <span className="text-red-700 italic">Blood Donation</span>
          </h1>

         
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-red-700 to-transparent" />
            <div className="w-3 h-3 border border-red-700 rounded-full opacity-40" />
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-red-700 to-transparent" />
          </div>

          <p className="text-center text-gray-600 leading-relaxed mt-4">
  This is to certify with honour and gratitude that{" "}
  <span className="font-semibold text-red-700">{d.donorName}</span> has
  made a noble gesture of donating blood group{" "}
  <span className="font-semibold text-red-700">{d.bloodGroup}</span>,{" "}
  <span className="font-semibold text-red-700">{d.units}</span> unit(s), on{" "}
  <span className="font-semibold text-red-700">{d.date}</span> at{" "}
  <span className="font-semibold text-red-700">{d.location}</span> during{" "}
  <span className="font-semibold text-red-700">{d.event}</span>.
</p>


<div className="flex items-center justify-center gap-2 my-4">
  <div className="w-10 h-px bg-red-900" />
  <div className="w-2 h-2 bg-red-900 rotate-45" />
  <div className="w-10 h-px bg-red-900" />
</div>
          <p className="text-center text-red-700 italic font-semibold">
            GiveLife Appreciates Your Contribution
          </p>

          <p className="text-center text-gray-400 text-sm italic mt-2">
            "Every drop of blood donated saves lives."
          </p>

          
          <div className="flex justify-between items-end mt-10">

           
            <div className="text-center flex-1">
              <div className="h-10" />
              <div className="border-t mx-8" />
              <p className="text-sm font-medium mt-1">{d.medicalOfficer}</p>
              <p className="text-xs text-gray-500">Medical Officer</p>
            </div>

            <div className="w-30 h-30 bg-red-900 flex flex-col items-center justify-center rounded-full -2 border-dashed border-blur-2 text-white">
              <div className="flex flex-col items-center justify-center border-white border-dashed border w-27 rounded-full h-27">
                <Ribbon size={50}/>
                <h1>Certified</h1>
            </div>
            </div>

            

           
            <div className="text-center flex-1">
              <div className="h-10" />
              <div className="border-t mx-8 " />
              <p className="text-sm font-medium mt-1">{d.authorizedBy}</p>
              <p className="text-xs text-gray-500">Authorized Signature</p>
            </div>
          </div>

          <p className="text-center text-[10px] text-gray-800 my-5 tracking-widest">
            {d.certId}
          </p>
        </div>
         </div>
      </div>
    </div>
  );
}

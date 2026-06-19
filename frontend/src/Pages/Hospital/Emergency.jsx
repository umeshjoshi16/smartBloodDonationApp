import { useState,useEffect,useContext } from "react";
import {Droplets,X,CircleAlert,Phone,User,Clock,Truck,CheckCircle2,FlaskConical,CalendarDays,UserCheck, Send,} from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Toaster,toast } from "react-hot-toast";
import { CampContext } from "../../Context/CampContext";
import noEmergency from '../../assets/noEmergency.png'


export default function Emergency() {
 const emergencySchema=yup.object({
    patientName:yup.string().required('Enter patient name'),
    bloodGroup:yup.string().required('Enter required blood group'),
    unitsRequired: yup.number().required("Enter required units of blood"),
    patientContact:yup.string().required('Enter patient contact number'),
    urgency:yup.string().required('Please specify urgency level'),
    reason:yup.string().required('Specify the reason for required blood'),
    description:yup.string(),

  })
    const{
      register,
      reset,
      handleSubmit,
    formState: { errors }
    }=useForm({
      resolver:yupResolver(emergencySchema)
    });

  const{ emergencyData,campData,setEmergencyData,setCampData}=useContext(CampContext);

  const [activeTab, setActiveTab] = useState("myRequest");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [donorModal, setDonorModal] = useState(null); 
  
 

  const handleDispatch = (requestId, donorId) => {
   
    const updated = emergencyData.map((req) =>
  req._id === requestId
    ? {
        ...req,
        acceptedDonors: req.acceptedDonors.map((d) =>
          d.id === donorId
            ? { ...d, dispatched: true }
            : d
        ),
      }
    : req
);

setEmergencyData(updated);
  
    if (donorModal && donorModal.id === requestId) {
      setDonorModal(updated.find((r) => r.id === requestId));
    }
  };





  const urgencyStyle = {
    Immediate: "bg-red-100 text-red-800 border-red-200",
    Today: "bg-orange-100 text-orange-800 border-orange-200",
    "Within 24 hrs": "bg-yellow-100 text-yellow-800 border-yellow-200",
  };


  const onSubmit=async(data)=>{
try{
  const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/emergencies`,data,{
    withCredentials:true,
  })
  setEmergencyData((prev) => [
  res.data.emergency,
  ...prev,
]);
 toast.success("Sucessfully posted Emergency Request");
 reset();
setActiveTab("myRequest");

}
catch(error){
 toast.error("Failed to Post Request")
  console.log(error);
}
  }

  useEffect(() => {
  const fetchData = async () => {
    try {
     const res= await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/emergencies/hospital`, {
     withCredentials: true,
  });
  
  const dataResponse=res.data.emergencies;
  setEmergencyData(dataResponse); 
  console.log(dataResponse);
   
   
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, []);


const handleCancel = async (id) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/auth/emergencies/hospital`,
      {
        id:id,
        status: "Cancelled",
      },
      {
        withCredentials: true,
      }
    );
    toast.success("Request cancelled");

    setEmergencyData((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status: "Cancelled" } : r
      )
    );

    
  } catch (err) {
    console.log(err);
    toast.error("Failed to cancel request");
  }
};


const getTimeAgo = (date) => {
  const now = new Date();
  const created = new Date(date);

  const diffInSeconds = Math.floor((now - created) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} hr${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
};
 
 const filtered =
  emergencyData?.filter(
    (item) => item.status === statusFilter
  ) || [];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />

      <div className="flex flex-col gap-3 md:m-5 m-1 mb-20">

        <div className="flex items-center w-full mb-2">
          <h1 className="font-semibold text-lg">Emergency Blood Requests</h1>
        </div>

        {/*switch */}
        <div className="flex flex-row items-center justify-evenly md:w-100 p-1 w-full rounded-xl bg-red-50 border border-red-100">
          <button
            onClick={() => setActiveTab("myRequest")}
            className={`rounded-xl px-7 p-1.5 font-medium cursor-pointer transition-all ${
              activeTab === "myRequest"
                ? "bg-red-900 shadow-sm text-white"
                : "bg-transparent text-red-900 hover:text-red-700"
            }`}
          >
            My Requests
          </button>
          <button
            onClick={() => setActiveTab("addRequest")}
            className={`rounded-xl px-7 p-1.5 font-medium cursor-pointer transition-all ${
              activeTab === "addRequest"
                ? "bg-red-900 shadow-sm text-white"
                : "bg-transparent text-red-900 hover:text-red-700"
            }`}
          >
            + Add New
          </button>
        </div>

        {/*current requests */}
        {activeTab === "myRequest" && (
          <div className="flex flex-col  gap-4">

            {/* Status buttons */}
            <div className="flex gap-2 ">
              {["Active", "Fulfilled"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-4 py-1 rounded-lg text-sm border cursor-pointer transition ${
                    statusFilter === s
                      ? "bg-red-900 text-white border-red-900"
                      : "bg-white text-gray-600 border-gray-300 hover:border-red-900"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Cards */}
            <div className="flex flex-wrap  gap-4">
              {filtered.length === 0 && (
                <div className="flex flex-col items-center">
                
                <img src={noEmergency} className="h-70 rounded-full"/>
                <p className="text-xl font-medium text-gray-600">No {statusFilter} requests.</p>
                </div>
              )}

              {filtered.map((req) => (
                <div
                  key={req._id}
                  className="bg-white border border-gray-200 rounded-2xl w-80 shadow-sm hover:shadow-md transition"
                >
                  <div className="h-3 bg-red-900 rounded-t-2xl" />

                  <div className="p-5">

                    
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="font-semibold">{req.patientName}</h2>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock size={11} /> {getTimeAgo(req.createdAt)}
                        </p>
                      </div>
                      <div className="bg-red-100 text-red-900 px-3 py-1 rounded-xl text-sm flex items-center gap-1">
                        <span className="font-bold text-base">{req.bloodGroup}</span>
                        <span className="text-xs">needed</span>
                      </div>
                    </div>

                    <div className="w-full flex flex-row ">
                    
                    {/* Urgency */}
                    <span className={`mt-2 inline-flex items-center gap-1 text-xs border rounded-lg px-2 py-1 ${urgencyStyle[req.urgency]}`}>
                      <CircleAlert size={11} />
                      {req.urgency}
                    </span>

                    <span className={`ml-auto border rounded-xl text-sm h-fit p-1 px-3 ${
  req.status === "Active"
    ? "bg-red-100 text-red-900 border-red-200"
    : req.status === "Fulfilled"
    ? "bg-green-100 text-green-700 border-green-200"
    : "bg-gray-100 text-gray-500 border-gray-200"
}`}>
  {req.status}
</span>
                    </div>


                    {/* Info */}
                    <div className="mt-3 text-sm space-y-1">
                      <p>Patient: <span className="text-gray-600">{req.patientName}</span></p>
                      <p className="flex items-center gap-1 text-gray-500"><Phone size={13} /> {req.patientContact}</p>
                      <p>Reason: <span className="text-gray-600">{req.reason}</span></p>
                    </div>

                    {/* Units */}
                    <p className="text-red-900 text-sm font-medium mt-2">{req.unitsRequired} unit
{req.unitsRequired > 1 ? "s" : ""}</p>

                    {/* Description */}
                    <p className="text-sm text-gray-500 mt-2">{req.description}</p>

                    {/* Accepted donors button */}
                    <button
                      onClick={() => setDonorModal(req)}
                      className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 text-sm text-gray-700 hover:bg-green-200 hover:border-green-200 hover:text-red-900 cursor-pointer transition"
                    >
                      <UserCheck size={15} />
                      <h1>3 people responded</h1>
                      {/* {req.acceptedDonors.length} Donor{req.acceptedDonors.length !== 1 ? "s" : ""} Accepted */}
                    </button>

                    {/* Cancel */}
                    {req.status === "Active" && (
                      <button
                        onClick={() => handleCancel(req._id)}
                        className="mt-2 w-full text-[13px] text-gray-400 hover:text-gray-700 border border-gray-200 hover:border-gray-200 hover:bg-gray-200 py-2 rounded-lg cursor-pointer transition"
                      >
                        Cancel this request
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/*add new request */}
        {activeTab === "addRequest" && (
          <div
            onClick={() => setActiveTab("myRequest")}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-hidden"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="rounded-xl flex flex-col w-full md:w-150 bg-white overflow-y-auto mt-6 md:mt-0"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
              {/* Header */}
              <div className="bg-red-900 flex flex-row items-center p-1 text-white w-full px-5 rounded-t-xl gap-5 h-15">
                <div className="rounded-xl p-2 bg-amber-500/40">
                  <Droplets />
                </div>
                <h1>Emergency Request</h1>
                <button
                  onClick={() => setActiveTab("myRequest")}
                  className="ml-auto rounded-xl p-2 hover:bg-red-700 cursor-pointer"
                >
                  <X />
                </button>
              </div>
            

            
              {/* Fields */}
              <div className="flex flex-wrap gap-x-5 items-center justify-start w-full p-2 px-5 text-sm">

                <div className="flex flex-col w-55">
                  <label className="text-sm font-medium  mb-1">Patient Name*</label>
                  <input type="text" placeholder="Enter patient name" className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100  outline-0 focus:ring-red-900 focus:ring"{...register('patientName')} />
            <p className="text-sm text-red-600 p-1 pl-13">{errors.patientName?.message}</p>

                </div>

                <div className="flex flex-col w-55">
                  <label className="text-sm font-medium  mb-1">Blood Group*</label>
                  <select className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 outline-0 focus:ring focus:ring-red-900 "  {...register("bloodGroup")}>
                    <option value="">Select blood group</option>
                    {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
            <p className="text-sm text-red-600 p-1 pl-13">{errors.bloodGroup?.message}</p>

                </div>

                <div className="flex flex-col w-55">
                  <label className="text-sm font-medium  mb-1">Units Required*</label>
                  <input type="number" placeholder="Enter required units" className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring" {...register('unitsRequired')} />
            <p className="text-sm text-red-600 p-1 pl-13">{errors.unitsRequired?.message}</p>

                </div>

                <div className="flex flex-col w-55">
                  <label className="text-sm font-medium mb-1">Patient Contact*</label>
                  <input type="text" placeholder="Enter patient contact" className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring" {...register('patientContact')} />
            <p className="text-sm text-red-600 p-1 pl-13">{errors.patientContact?.message}</p>

                </div>

                <div className="flex flex-col w-55">
                  <label className="text-sm font-medium  mb-1">Urgency*</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-0 focus:ring focus:ring-red-900 bg-gray-100 " {...register("urgency")}>
                    <option value="">Select urgency level</option>
                    <option value="Immediate">Immediate</option>
                    <option value="Today">Today</option>
                    <option value="Within 24 hrs">Within 24 Hours</option>
                   
                  </select>
            <p className="text-sm text-red-600 p-1 pl-13">{errors.urgency?.message}</p>

                </div>

                <div className="flex flex-col w-55">
                  <label className="text-sm font-medium mb-1">Reason*</label>
                  <input type="text" placeholder="Enter reason for blood need" className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring" {...register('reason')} />
            <p className="text-sm text-red-600 p-1 pl-13">{errors.reason?.message}</p>

                </div>

                <div className="flex flex-col w-full md:w-115">
                  <label className="text-sm font-medium mb-1">Description</label>
                  <textarea placeholder="Enter description" className="resize-none border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring" {...register('description')}/>
            <p className="text-sm text-red-600 p-1 pl-13">{errors.description?.message}</p>
                
                </div>

              </div>

              {/* Buttons */}
              <div className="flex flex-row items-center justify-center my-5 gap-10">
                <button type="button" onClick={() => setActiveTab("myRequest")} className="text-white bg-gray-700 p-2 rounded-lg px-7 cursor-pointer hover:bg-gray-500">Cancel</button>
                <button type="submit" className="bg-red-900 p-2 rounded-lg px-7 text-white cursor-pointer hover:bg-red-700">Submit</button>
              </div>
                </form>
            </div>
          </div>
        )}

        {/*accepted donor */}
        {donorModal && (
          <div
            onClick={() => setDonorModal(null)}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-hidden"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="rounded-xl flex flex-col w-full md:w-130 bg-white overflow-y-auto mt-6 md:mt-0 max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-red-900 flex flex-row items-center p-1 text-white w-full px-5 rounded-t-xl gap-5 h-15">
                <div className="rounded-xl p-2 bg-amber-500/40">
                  <UserCheck />
                </div>
                <div>
                  <h1>Accepted Donors</h1>
                  <p className="text-xs text-white/60">{donorModal.patientName} · {donorModal.bloodGroup} · {donorModal.units} unit{donorModal.units > 1 ? "s" : ""}</p>
                </div>
                <button onClick={() => setDonorModal(null)} className="ml-auto rounded-xl p-2 hover:bg-red-700 cursor-pointer">
                  <X />
                </button>
              </div>

              {/*accepted Donor list */}
              <div className="flex flex-col gap-3 p-5">
                {donorModal.acceptedDonors.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-8">No donors have accepted this request yet.</p>
                )}

                {donorModal.acceptedDonors.map((donor) => (
                  <div key={donor.id} className="flex items-center gap-4 border border-gray-200 rounded-xl p-4">

                    {/* profile */}
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-sm font-semibold text-red-900 shrink-0">
                      {donor.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>

                    {/* dta */}
                    <div className="flex-1 min-w-0">
  <p className="text-sm font-medium text-gray-900 truncate">
    {donor.name}
  </p>

  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
    <Phone size={11} />
    {donor.phone}
  </p>

  
  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
    
    <span className="flex items-center gap-1">
      <FlaskConical size={11} className="text-red-400" />
      <span className="font-medium text-gray-700">{donor.bloodGroup}</span>
    </span>

    <span className="flex items-center gap-1">
      <CalendarDays size={11} />
      Last: <span className="text-gray-700">{donor.lastDonated}</span>
    </span>

    <span>
      <span className="font-medium text-gray-700">{donor.totalDonations}</span> donations
    </span>

  </div>
</div>

                    {/* Dispatch*/}
                    {donor.dispatched ? (
                      <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0">
                        <CheckCircle2 size={13} /> Dispatched
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDispatch(donorModal.id, donor.id)}
                        className="flex items-center gap-1 text-xs text-white bg-red-900 hover:bg-red-700 px-3 py-1.5 rounded-lg cursor-pointer transition whitespace-nowrap shrink-0"
                      >
                        <Send size={13}/> Dispatch
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Close button */}
              <div className="flex justify-center mb-5">
                <button onClick={() => setDonorModal(null)} className="text-white bg-gray-700 p-2 rounded-lg px-7 cursor-pointer hover:bg-gray-500">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
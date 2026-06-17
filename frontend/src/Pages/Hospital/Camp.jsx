import { useState,useEffect,useContext } from "react";
import noCamp from "/src/assets/noCamp.png";
import {  X, MapPin,User,Phone,Mail,Droplets,Calendar,Clock,Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Toaster,toast } from "react-hot-toast";
import { CampContext } from "../../Context/CampContext";


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
 startDate: yup.date().nullable().transform((value, originalValue) => originalValue === "" ? null : value
  ).required("Start date and time is required"),

endDate: yup.date().nullable().transform((value, originalValue) =>
    originalValue === "" ? null : value).min(
  yup.ref("startDate"),
    "End date and time cannot be before the start date and time").required("End date and time is required"),
   additionalMessage: yup.string().trim().max(500, "Additional message cannot exceed 500 characters").nullable(),
});

 


  const LOCATIONS = {
  "Koshi": {
    "Taplejung": ["Phungling", "Sidingwa"],
    "Sankhuwasabha": ["Khandbari", "Chainpur"],
    "Solukhumbu": ["Salleri", "Namche Bazar"],
    "Bhojpur": ["Bhojpur", "Hatuwagadhi"],
    "Dhankuta": ["Dhankuta", "Pakhribas"],
    "Terhathum": ["Myanglung", "Laligurans"],
    "Ilam": ["Ilam", "Suryodaya"],
    "Jhapa": ["Chandragadhi", "Birtamod", "Damak"],
    "Morang": ["Biratnagar", "Urlabari", "Sundar Haraicha"],
    "Sunsari": ["Inaruwa", "Dharan", "Itahari"],
  },
  "Madhesh": {
    "Saptari": ["Rajbiraj", "Kanchanpur"],
    "Siraha": ["Siraha", "Lahan"],
    "Dhanusha": ["Janakpur", "Janakpurdham"],
    "Mahottari": ["Jaleshwar", "Bardibas"],
    "Sarlahi": ["Malangwa", "Haripurwa"],
    "Rautahat": ["Gaur", "Chandrapur"],
    "Bara": ["Kalaiya", "Nijgadh"],
    "Parsa": ["Birgunj", "Pokhariya"],
  },
  "Bagmati": {
    "Sindhuli": ["Sindhulimadi", "Kamalamai"],
    "Ramechhap": ["Manthali", "Ramechhap"],
    "Dolakha": ["Charikot", "Jiri"],
    "Sindhupalchok": ["Chautara", "Melamchi"],
    "Kavrepalanchok": ["Dhulikhel", "Banepa", "Panauti"],
    "Lalitpur": ["Lalitpur", "Godawari", "Mahalaxmi"],
    "Bhaktapur": ["Bhaktapur", "Madhyapur Thimi", "Changunarayan"],
    "Kathmandu": ["Kathmandu", "Kirtipur", "Kageshwori Manohara"],
    "Nuwakot": ["Bidur", "Tadi"],
    "Rasuwa": ["Kalika", "Gosaikunda"],
    "Dhading": ["Nilkantha", "Dhading Besi"],
    "Makwanpur": ["Hetauda", "Thaha"],
    "Chitwan": ["Bharatpur", "Ratnanagar", "Rapti"],
  },
  "Gandaki": {
    "Gorkha": ["Gorkha", "Palungtar"],
    "Manang": ["Chame", "Manang"],
    "Mustang": ["Jomsom", "Lo Manthang"],
    "Myagdi": ["Beni", "Malika"],
    "Kaski": ["Pokhara", "Annapurna", "Machhapuchchhre"],
    "Lamjung": ["Besishahar", "Rainas"],
    "Tanahun": ["Damauli", "Bhimad"],
    "Nawalpur": ["Kawasoti", "Gaindakot"],
    "Syangja": ["Putalibazar", "Waling"],
    "Parbat": ["Kushma", "Phalebas"],
    "Baglung": ["Baglung", "Dhorpatan"],
  },
  "Lumbini": {
    "Rupandehi": ["Butwal", "Siddharthanagar", "Sainamaina"],
    "Kapilvastu": ["Kapilvastu", "Buddhabhumi"],
    "Nawalparasi (West)": ["Sunwal", "Pratappur"],
    "Palpa": ["Tansen", "Rampur"],
    "Arghakhanchi": ["Sandhikharka", "Shitganga"],
    "Gulmi": ["Tamghas", "Musikot"],
    "Pyuthan": ["Pyuthan", "Gaumukhi"],
    "Rolpa": ["Rolpa", "Lungri"],
    "Eastern Rukum": ["Bhume", "Putha Uttarganga"],
    "Dang": ["Ghorahi", "Tulsipur", "Rapti"],
    "Banke": ["Nepalgunj", "Narainapur"],
    "Bardiya": ["Gulariya", "Rajapur"],
  },
  "Karnali": {
    "Western Rukum": ["Musikot", "Aathbiskot"],
    "Salyan": ["Bangad Kupinde", "Shaarda"],
    "Dolpa": ["Dunai", "Jagdulla"],
    "Jumla": ["Chandannath", "Tatopani"],
    "Kalikot": ["Manma", "Palata"],
    "Mugu": ["Gamgadhi", "Mugum Karmarong"],
    "Humla": ["Simkot", "Namkha"],
    "Jajarkot": ["Bheri", "Barekot"],
    "Dailekh": ["Narayan", "Dullu"],
    "Surkhet": ["Birendranagar", "Panchpuri", "Bheriganga"],
  },
  "Sudurpashchim": {
    "Kailali": ["Dhangadhi", "Tikapur", "Godawari"],
    "Kanchanpur": ["Bheemdatta", "Shuklaphanta"],
    "Dadeldhura": ["Amargadhi", "Parashuram"],
    "Baitadi": ["Dasharathchand", "Patan"],
    "Darchula": ["Shailyashikhar", "Marma"],
    "Achham": ["Mangalsen", "Ramaroshan"],
    "Doti": ["Dipayal Silgadhi", "Jorayal"],
    "Bajhang": ["Jayaprithvi", "Bungal"],
    "Bajura": ["Badimalika", "Budhiganga"],
  },
};

export default function Camp() {
  const [activeTab, setActiveTab] = useState("myCamp");
  const [statusFilter, setStatusFilter] = useState("Upcoming");

  const[details,setDetails]=useState(false);
  const[cancel,setCancel]=useState(false);

  const [search, setSearch] = useState("");
 const [selectedCampId, setSelectedCampId] = useState(null);
  const[completeConfirm,setCompleteConfirm]=useState(false);

  const{ emergencyData,campData,setEmergencyData,setCampData}=useContext(CampContext);
  
  

  
  const{
      register,
      reset,
      setValue,
      watch,
      handleSubmit,
    formState: { errors }
    }=useForm({
      resolver:yupResolver(campSchema)
    });


     const selectedProvince = watch("province");
  const selectedDistrict = watch("district");

  const districts = selectedProvince ? Object.keys(LOCATIONS[selectedProvince] || {}) : [];
  
  const cities = selectedProvince && selectedDistrict
    ? LOCATIONS[selectedProvince]?.[selectedDistrict] || []
    : [];
   useEffect(() => {
    setValue("district", "");
    setValue("city", "");
  }, [selectedProvince, setValue]);
  
   useEffect(() => {
    setValue("city", "");
  }, [selectedDistrict, setValue]);
  
  const onSubmit=async(data)=>{
       try{
         const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/post-camp`,data,{
         withCredentials:true,
         })  
        console.log(data);
        setActiveTab('myCamp');
       toast.success("Camp created successfully");
       setCampData((prev) => [
         res.data.camp,
          ...prev,
          ]);

          reset();
         }

       catch(error){
         toast.error("Failed to Create Camp")
          console.log(error);

       }
      }

  const handleCancel = async (id) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/auth/camp-cancel`,
      {
        id:id,
        status: "Cancelled",
      },
      {
        withCredentials: true,
      }
    );
    
    toast.success("Camp cancelled sucessfully");

    setCampData((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status: "Cancelled" } : r
      )
    );

    
  } catch (err) {
    console.log(err);
    toast.error("Failed to cancel camp");
  }
};
const handleComplete=async(id)=>{
   try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/auth/camp-modify`,
      {
        id:id,
        status: "Completed",
      },
      {
        withCredentials: true,
      }
    );
    setCompleteConfirm(false);
    setDetails(false);
    toast.success("Camp  sucessfully marked as complete");

    setCampData((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status: "Completed" } : r
      )
    );

    
  } catch (err) {
    console.log(err);
    toast.error("Failed to cancel camp");
  }


}

  useEffect(() => {
  const fetchData = async () => {
    try {
     const res= await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/get-camp`, {
     withCredentials: true,
  });
  
  const dataResponse=res.data.camps;
  setCampData(dataResponse); 
  console.log(dataResponse);
   
   
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, []);

  const filtered =
  campData?.filter(
    (item) => item.status === statusFilter
  ) || [];

  const getTimeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);

  const seconds = Math.floor((now - past) / 1000);

  if (seconds < 60) return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60)
    return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24)
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30)
    return `${days} day${days !== 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  if (months < 12)
    return `${months} month${months !== 1 ? "s" : ""} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
};


const setActive = (camp) => {
  const now = new Date();

  const startDate = new Date(camp.startDate);
  const endDate = new Date(camp.endDate);

  if (now < startDate) {
    return "Upcoming";
  }

  if (now >= startDate && now <= endDate) {
    return "Active";
  }

  if (now > endDate) {
    return "Completed";
  }

  
};

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />


      <h1 className="font-semibold text-lg">Upcoming Camps</h1>

      {/* tabs */}
      <div className="flex items-center justify-evenly md:w-100 p-1 w-full rounded-xl bg-red-50 border border-red-100 font-bold">
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
          className={`px-7 p-1.5 rounded-xl cursor-pointer hover:text-red-700  ${
            activeTab === "addCamp" ? "bg-red-900 text-white" : "text-red-900"
          }`}
        >
          + Add New
        </button>
      </div>

     
     

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
   <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap items-center justify-center overflow-y-auto hide-scrollbar">

    

     
      <div className="flex flex-wrap gap-x-5 items-center justify-start w-full p-2 px-5 text-sm overflow-y-auto hide-scrollbar">

        {/* Camp Name */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Camp Name*</label>
          <input
            type="text"
            placeholder="Enter camp name"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring" {...register('campName')} 
          />
        {errors.campName && <p className="text-red-500 text-xs mt-1">{errors.campName.message}</p>}

        </div>

        {/* Contact Person */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Contact Person*</label>
          <input
            type="text"
            placeholder="Enter contact person name"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring" {...register('contactPerson')} 

          />
        {errors.contactPerson && <p className="text-red-500 text-xs mt-1">{errors.contactPerson.message}</p>}

        </div>

        {/* Phone */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Phone*</label>
          <input
            type="text"
            placeholder="Enter phone number"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring" {...register('contactPersonPhone')} 
          />
        {errors.contactPersonPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPersonPhone.message}</p>}

        </div>

        {/* Email */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring"{...register('email')} 
          />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

        </div>
 {/* Province */}
      <div className="flex flex-col gap-1">
        <label className="font-medium">Province*</label>
        <select
          {...register("province")}
          
          className="border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-red-800 w-full"
        >
          <option value="">Select province</option>
          {Object.keys(LOCATIONS).map(p => <option key={p} value={p}>{p}</option>)}
          <option value="Other">Other</option>
        </select>
        {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province.message}</p>}
      </div>

      {/* District */}
      <div className="flex flex-col gap-1">
        <label className="font-medium">District*</label>
        <select
          {...register("district")}
          disabled={!selectedProvince}
          className="border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-red-800 w-full disabled:bg-gray-100"
        >
          <option value="">Select district</option>
          {districts.map(d => <option key={d} value={d}>{d}</option>)}
          {selectedProvince && <option value="Other">Other</option>}

        </select>
        {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
      </div>

      {/* City */}
      <div className="flex flex-col gap-1">
        <label className="font-medium">City / Municipality*</label>
        <select
          {...register("city")}
          disabled={!selectedDistrict}
          className="border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-red-800 w-full disabled:bg-gray-100"
        >
          <option value="">Select city</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
          {selectedDistrict && <option value="Other">Other</option>}
        </select>
        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
      </div>

      {/* Street Address */}
      <div className="flex flex-col gap-1">
        <label className="font-medium">Street Address*</label>
        <input
          {...register("streetAddress")}
          type="text"
          placeholder="e.g. Putalisadak, Ward No. 4"
          className="border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-red-800 w-full"
        />
        {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress.message}</p>}
      </div>

        {/* Expected Donors */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Expected Donors*</label>
          <input
            type="number"
            placeholder="e.g. 50"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring"
            {...register('expectedDonors')}
          />
        {errors.expectedDonors && <p className="text-red-500 text-xs mt-1">{errors.expectedDonors.message}</p>}

        </div>

        {/* Start Date */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">Start Date*</label>
          <input
            type="datetime-local"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
          {...register('startDate')}
          />
        {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}

        </div>

        {/* End Date */}
        <div className="flex flex-col w-55">
          <label className="text-sm font-medium text-gray-700 mb-1">End Date*</label>
          <input
            type="datetime-local"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
           {...register('endDate')}
          />
        {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>}

        </div>

        {/* Description */}
        <div className="flex flex-col w-full md:w-115">
          <label className="text-sm font-medium text-gray-700 mb-1">Additional Message</label>
          <textarea
            placeholder="Enter additional details about camp"
            className="resize-none border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring"
          {...register('additionalMessage')}
          />
        {errors.additionalMessage && <p className="text-red-500 text-xs mt-1">{errors.additionalMessage.message}</p>}

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


   </form>
    </div>
  </div>
)}

{/* My Camps */}
{activeTab === "myCamp" && (
  <div className="flex flex-col gap-4 mb-20">

    {/* Status button */}
    <div className="flex gap-2 overflow-x-scroll hide-scrollbar">
      {["Upcoming", "Active", "Completed", "Cancelled"].map((s) => (
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
    <div className="flex flex-wrap gap-5">

    {/* no camp*/}
       
      {filtered.length === 0 && (
        <div className="flex flex-col  w-fit">
          <img src={noCamp} className="h-70 rounded-full " />
          <p className="text-xl text-center font-medium text-gray-600">
            No {statusFilter} camps.
          </p>
        </div>
      )}

      {filtered.map((camp) => (
      <div
  key={camp._id}
  className="bg-white border border-gray-200 rounded-2xl w-80 shadow-sm hover:shadow-md transition"
>
 
  <div className="h-3 bg-red-900 rounded-t-2xl" />

  <div className="p-5">

   
    <div className="flex items-start justify-between">
      <div>
        <h2 className="font-semibold text-lg">{camp.campName}</h2>
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <Clock size={12} />
          {getTimeAgo(camp.createdAt)}
        </p>
      </div>

      <span
        className={`border rounded-xl text-xs px-3 py-1 ${
          camp.status === "Active"
            ? "bg-red-100 text-red-900 border-red-200"
            : camp.status === "Upcoming"
            ? "bg-blue-100 text-blue-700 border-blue-200"
            : camp.status === "Completed"
            ? "bg-green-100 text-green-700 border-green-200"
            : "bg-gray-100 text-gray-500 border-gray-200"
        }`}
      >
        {camp.status}
      </span>
    </div>

    {/* Location */}
    <div className="mt-3 text-sm text-gray-600 flex items-start gap-2">
      <MapPin size={16} className="mt-0.5" />
      <span>
        {camp.streetAddress}, {camp.city}
      </span>
    </div>

    {/* Contact */}
    <div className="mt-3 space-y-2 text-sm text-gray-700">

      <div className="flex items-center gap-2">
        <User size={15} />
        <span>{camp.contactPerson}</span>
      </div>

      <div className="flex items-center gap-2">
        <Phone size={15} />
        <span>{camp.contactPersonPhone}</span>
      </div>

      <div className="flex items-center gap-2">
        <Mail size={15} />
        <span>{camp.email}</span>
      </div>
    </div>

    {/* Expected Donors */}
    <div className="mt-3 text-sm flex items-center gap-2">
      <Droplets size={16} className="text-red-900" />
      <span>
        Expected Donors:{" "}
        <span className="font-semibold text-red-900">
          {camp.expectedDonors}
        </span>
      </span>
    </div>

    {/* Dates */}
    <div className="mt-3 text-xs text-gray-500 space-y-1">

      <div className="flex items-center gap-2">
        <Calendar size={14} />
        <span>
          Start: {new Date(camp.startDate).toLocaleString()}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Calendar size={14} />
        <span>
          End: {new Date(camp.endDate).toLocaleString()}
        </span>
      </div>
    </div>

    {/* Additional Message */}
    {camp.additionalMessage && (
      <div className="mt-3 p-2 rounded-lg bg-gray-50 text-sm text-gray-600">
        {camp.additionalMessage}
      </div>
    )}

    
    
      <button onClick={()=>{
         setSelectedCampId(camp._id);
          setDetails(true); 
       
      }} className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2 text-sm hover:bg-red-100 hover:border-red-100 transition cursor-pointer">
        <Eye size={16} />
        View Details
      </button>
      {camp.status == "Upcoming" && (
        <button onClick={() => {
  setSelectedCampId(camp._id);
    setCancel(true);   
}} className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2 text-sm hover:bg-gray-100 hover:border-gray-100 transition cursor-pointer">
        
        Cancel this Camp
      </button>
      )}

      {
        cancel&&(
         <div  onClick={() => setCancel(false)} className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
  
  <div  onClick={(e) => e.stopPropagation()} className="bg-white w-80 rounded-xl p-5 shadow-lg flex flex-col items-center">

    <h2 className="text-base font-semibold text-gray-800 text-center">
      Are you sure you want to delete this camp?
    </h2>

    <p className="text-xs text-gray-500 mt-2">
      This action cannot be undone.
    </p>

   
    <div className="flex  gap-3 mt-5">

      <button
        onClick={() => setCancel(false)}
        className="px-7 py-2 text-[12px] font-bold rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
      >
        No
      </button>

      <button
       onClick={() => {

          if (!selectedCampId) return;
    handleCancel(selectedCampId);  
    setCancel(false);
     }
       }
        className="px-7 py-3 text-[12px] rounded-lg font-bold cursor-pointer bg-red-600 text-white hover:bg-red-700 transition"
      >
        Yes, Delete
      </button>

    </div>

  </div>
</div>
        )
      }
      

     {details && (
  <div onClick={()=>{
    setDetails(false);
  }} className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
    <div onClick={(e)=>{
      e.stopPropagation();

    }} className="bg-white w-full max-w-md max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl text-slate-800 tracking-tight">
            Responded Donors
          </h2>
          <span className=" text-red-900 text-xs font-semibold px-2.5 py-1 rounded-full border ">
            {
              [
                { _id: 1, name: "Ram Sharma", phone: "9812345678", email: 'ram@gmail.com', bloodGroup: 'A+' },
                { _id: 2, name: "Sita Rai", phone: "9800000000", email: 'ram@gmail.com', bloodGroup: 'B-' },
                { _id: 3, name: "Aayush Thapa", phone: "9823456789", email: 'ram@gmail.com', bloodGroup: 'AB+' },
                { _id: 4, name: "Nisha Karki", phone: "9811122233", email: 'ram@gmail.com', bloodGroup: 'O-' },
              ].filter((d) => d.name.toLowerCase().includes(search.toLowerCase())).length
            } Found
          </span>
        </div>

        {/* Search bar*/}
        <div className="relative mt-3.5">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full border border-slate-200 rounded-xl pl-3 pr-4 py-2.5 text-sm bg-slate-50 placeholder-slate-400 outline-none transition-all focus:ring-red-900 focus:bg-white focus:ring"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      
      <div className="p-5 overflow-y-auto space-y-3.5 flex-1 custom-scrollbar">
        {[
          { _id: 1, name: "Ram Sharma", phone: "9812345678", email: 'ram@gmail.com', bloodGroup: 'A+' },
          { _id: 2, name: "Sita Rai", phone: "9800000000", email: 'ram@gmail.com', bloodGroup: 'B-' },
          { _id: 3, name: "Aayush Thapa", phone: "9823456789", email: 'ram@gmail.com', bloodGroup: 'AB+' },
          { _id: 4, name: "Nisha Karki", phone: "9811122233", email: 'ram@gmail.com', bloodGroup: 'O-' },
        ]
          .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
          .map((donor) => (
            <div
              key={donor._id}
              className="border border-slate-100 rounded-xl p-4 flex items-center justify-between bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200"
            >
            
              <div className="flex items-center gap-3">
               
                <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex flex-col items-center justify-center ">
                 
                  <span className="text-sm font-bold text-red-700 leading-tight">{donor.bloodGroup}</span>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {donor.name}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-x-2 text-xs text-slate-500">
                    <span>{donor.phone}</span>
                    
                    <span className="truncate max-w-35">{donor.email}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toast.success(`Marked ${donor.name} as Blood Given`)}
                className="text-xs font-semibold px-3 py-2 rounded-lg bg-red-700 text-white shadow-sm hover:bg-red-900 active:scale-95 transition-all cursor-pointer"
              >
                Given
              </button>
            </div>
          ))}
      </div>

      
      <div className="p-4 border-t border-gray-100 flex items-center justify-center gap-5 bg-gray-50/30">
        <button
          onClick={() => setDetails(false)}
          className="text-sm font-medium  px-4 py-2 rounded-xl border border-gray-200   bg-white hover:bg-gray-100  transition-colors  cursor-pointer"
        >
          Close
        </button>
         <button
          onClick={()=>{
             setSelectedCampId(camp._id);
            setCompleteConfirm(true);
          }}
          className="text-sm font-medium px-4 py-2 rounded-xl border border-gray-200   bg-green hover:border-green-200 hover:bg-green-200  transition-colors  cursor-pointer"
        >
          Mark as complete
        </button>
      </div>

    </div>
  </div>
)}
    
  </div>
</div>
      ))}

      {completeConfirm && (
  <div  onClick={() => setCompleteConfirm(false)} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div onClick={(e)=>{
      e.stopPropagation();

    }} className="bg-white w-80 rounded-xl shadow-lg p-5 text-center">

      <h2 className="text-lg font-semibold text-gray-800">
        Mark this camp as Completed?
      </h2>

     
      <p className="text-[13px] text-gray-500 mt-2">
        This will change the camp status to <b>Completed</b>.
      </p>

     
      <div className="flex justify-center gap-3 mt-5">

        <button
          onClick={() => setCompleteConfirm(false)}
          className="px-4 py-1.5 text-[13px] rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100  cursor-pointer"
        >
          No
        </button>

        <button
       onClick={() => handleComplete(selectedCampId)}
        
          
          className="px-4 py-1.5 text-[13px] rounded-lg bg-green-600 text-white hover:bg-green-700  cursor-pointer" 
        >
          Yes, Complete
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  </div>
)}
    </div>
  );
}
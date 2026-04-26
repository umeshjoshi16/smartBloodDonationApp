import { ArrowLeft,Pencil, X  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect,useState } from "react";



export default function EditProfile() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const[imageOpen,setImageOpen]=useState(false);
  const EditProfileSchema = yup.object({
  name: yup.string(),
  email: yup.string().email("Invalid email format"),
  phone: yup.string(),
  gender: yup.string(),
  dob: yup.string(),
  province: yup.string(),
  district: yup.string(),
  city: yup.string(),
  streetAddress: yup.string(),
});
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditProfileSchema),
  });
  const LOCATIONS = {
    Koshi: {
      Taplejung: ["Phungling", "Sidingwa"],
      Sankhuwasabha: ["Khandbari", "Chainpur"],
      Solukhumbu: ["Salleri", "Namche Bazar"],
      Bhojpur: ["Bhojpur", "Hatuwagadhi"],
      Dhankuta: ["Dhankuta", "Pakhribas"],
      Terhathum: ["Myanglung", "Laligurans"],
      Ilam: ["Ilam", "Suryodaya"],
      Jhapa: ["Chandragadhi", "Birtamod", "Damak"],
      Morang: ["Biratnagar", "Urlabari", "Sundar Haraicha"],
      Sunsari: ["Inaruwa", "Dharan", "Itahari"],
    },
    Madhesh: {
      Saptari: ["Rajbiraj", "Kanchanpur"],
      Siraha: ["Siraha", "Lahan"],
      Dhanusha: ["Janakpur", "Janakpurdham"],
      Mahottari: ["Jaleshwar", "Bardibas"],
      Sarlahi: ["Malangwa", "Haripurwa"],
      Rautahat: ["Gaur", "Chandrapur"],
      Bara: ["Kalaiya", "Nijgadh"],
      Parsa: ["Birgunj", "Pokhariya"],
    },
    Bagmati: {
      Sindhuli: ["Sindhulimadi", "Kamalamai"],
      Ramechhap: ["Manthali", "Ramechhap"],
      Dolakha: ["Charikot", "Jiri"],
      Sindhupalchok: ["Chautara", "Melamchi"],
      Kavrepalanchok: ["Dhulikhel", "Banepa", "Panauti"],
      Lalitpur: ["Lalitpur", "Godawari", "Mahalaxmi"],
      Bhaktapur: ["Bhaktapur", "Madhyapur Thimi", "Changunarayan"],
      Kathmandu: ["Kathmandu", "Kirtipur", "Kageshwori Manohara"],
      Nuwakot: ["Bidur", "Tadi"],
      Rasuwa: ["Kalika", "Gosaikunda"],
      Dhading: ["Nilkantha", "Dhading Besi"],
      Makwanpur: ["Hetauda", "Thaha"],
      Chitwan: ["Bharatpur", "Ratnanagar", "Rapti"],
    },
    Gandaki: {
      Gorkha: ["Gorkha", "Palungtar"],
      Manang: ["Chame", "Manang"],
      Mustang: ["Jomsom", "Lo Manthang"],
      Myagdi: ["Beni", "Malika"],
      Kaski: ["Pokhara", "Annapurna", "Machhapuchchhre"],
      Lamjung: ["Besishahar", "Rainas"],
      Tanahun: ["Damauli", "Bhimad"],
      Nawalpur: ["Kawasoti", "Gaindakot"],
      Syangja: ["Putalibazar", "Waling"],
      Parbat: ["Kushma", "Phalebas"],
      Baglung: ["Baglung", "Dhorpatan"],
    },
    Lumbini: {
      Rupandehi: ["Butwal", "Siddharthanagar", "Sainamaina"],
      Kapilvastu: ["Kapilvastu", "Buddhabhumi"],
      "Nawalparasi (West)": ["Sunwal", "Pratappur"],
      Palpa: ["Tansen", "Rampur"],
      Arghakhanchi: ["Sandhikharka", "Shitganga"],
      Gulmi: ["Tamghas", "Musikot"],
      Pyuthan: ["Pyuthan", "Gaumukhi"],
      Rolpa: ["Rolpa", "Lungri"],
      "Eastern Rukum": ["Bhume", "Putha Uttarganga"],
      Dang: ["Ghorahi", "Tulsipur", "Rapti"],
      Banke: ["Nepalgunj", "Narainapur"],
      Bardiya: ["Gulariya", "Rajapur"],
    },
    Karnali: {
      "Western Rukum": ["Musikot", "Aathbiskot"],
      Salyan: ["Bangad Kupinde", "Shaarda"],
      Dolpa: ["Dunai", "Jagdulla"],
      Jumla: ["Chandannath", "Tatopani"],
      Kalikot: ["Manma", "Palata"],
      Mugu: ["Gamgadhi", "Mugum Karmarong"],
      Humla: ["Simkot", "Namkha"],
      Jajarkot: ["Bheri", "Barekot"],
      Dailekh: ["Narayan", "Dullu"],
      Surkhet: ["Birendranagar", "Panchpuri", "Bheriganga"],
    },
    Sudurpashchim: {
      Kailali: ["Dhangadhi", "Tikapur", "Godawari"],
      Kanchanpur: ["Bheemdatta", "Shuklaphanta"],
      Dadeldhura: ["Amargadhi", "Parashuram"],
      Baitadi: ["Dasharathchand", "Patan"],
      Darchula: ["Shailyashikhar", "Marma"],
      Achham: ["Mangalsen", "Ramaroshan"],
      Doti: ["Dipayal Silgadhi", "Jorayal"],
      Bajhang: ["Jayaprithvi", "Bungal"],
      Bajura: ["Badimalika", "Budhiganga"],
    },
  };

  const selectedProvince = watch("province");
  const selectedDistrict = watch("district");
  const districts = selectedProvince
    ? Object.keys(LOCATIONS[selectedProvince] || {})
    : [];

  const cities =
    selectedProvince && selectedDistrict
      ? LOCATIONS[selectedProvince]?.[selectedDistrict] || []
      : [];

  useEffect(() => {
    setValue("district", "");
    setValue("city", "");
  }, [selectedProvince, setValue]);

  useEffect(() => {
    setValue("city", "");
  }, [selectedDistrict, setValue]);

  const onSubmit = (data) => {
  console.log(data);
};
const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setPreview(URL.createObjectURL(file));
      setValue("profileImage",file)
    }

   
  };

  const handleImageClicked=()=>{
    if(preview){
      setImageOpen(true);
    }
  };

 

  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 min-h-screen roboto-slab-body">
      {
      imageOpen&&(
        <div onClick={()=>{
          setImageOpen(false);
        }} className="fixed inset-0   bg-black/30 flex items-center justify-center z-50">
          <div     onClick={(e) => e.stopPropagation()}
 className="bg-white  rounded-2xl relative w-90 md:w-110">
            <button 
        onClick={()=>{
          setImageOpen(false);
        }} 
        className="absolute top-2 right-2 text-red-700 font-bold cursor-pointer"
      >
         <X  size={30} className="font-bold"/>
      </button>
       <img src={preview} alt="Preview" className="object-contain  rounded-2xl" />


          </div>
       


        </div>
      )

      }
     
      
      <div className="flex flex-col items-start justify-start bg-white w-90 rounded-xl p-5 m-10 min-h-100 shadow">
        
        <div className="flex flex-col items-center justify-start w-full ">
          <button
            onClick={() => {
              navigate("/donor");
            }}
            className="border h-10 w-10 border-gray-200 shadow rounded-xl bg-gray-100 flex items-center justify-center font-bold mr-auto cursor-pointer hover:bg-gray-50"
          >
            <ArrowLeft />
          </button>
          <h1 className="font-bold text-xl mb-5">Edit Profile</h1>
        </div>


        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
           <div className="flex flex-col items-center mb-6">
 
  <div className="relative">
    <img
    
      src={preview} alt=" "
      onClick={handleImageClicked}
      className="w-32 h-32 rounded-full object-cover border-4 border-gray-600 cursor-pointer"
    />
    
   
    <label className="absolute bottom-0 right-0 bg-red-900 text-white p-2 rounded-full cursor-pointer hover:bg-red-700">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange} 
      />
         <Pencil />
    </label>
  </div>
</div>
            <div className="flex flex-col">
              <label className="font-medium">Name</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg text-sm p-2  relative outline-0 focus:ring-2 focus:ring-red-900 w-full"
                {...register("name")}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Email</label>
              <input
                type="email"
                className="border border-gray-300 rounded-lg text-sm p-2   relative outline-0 focus:ring-2 focus:ring-red-900 w-full"
                {...register("email")}
              />
              <p className="text-red-500 text-xs mt-1">
  {errors.email?.message}
</p>
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Phone Number</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg text-sm p-2   relative outline-0 focus:ring-2 focus:ring-red-900 w-full"
                {...register("phone")}
              />
            </div>

            <div className="flex flex-col gap-1 w-80">
              <label className="font-medium">Gender</label>
              <div className="flex flex-row items-center  gap-5">
                <label className="flex flex-row gap-2">
                  <input
                    type="radio"
                    value="male"
                    className=" border border-gray-400 rounded-md p-2 outline-0 cursor-pointer accent-red-700"
                  
                  {...register("gender")}
                  />
                  Male
                </label>

                <label className="flex flex-row gap-2">
                  <input
                    type="radio"
          
                    value="female"
                    className=" border border-gray-400 rounded-md p-2 outline-0  cursor-pointer accent-red-700"
                   {...register("gender")}
                   />
                  Female
                </label>

                <label className="flex flex-row gap-2">
                  <input
                    type="radio"
               
                    value="other"
                    className=" border border-gray-400 rounded-md p-2 outline-0 cursor-pointer accent-red-700"
                  {...register("gender")}
                  />
                  Other
                </label>
                <div></div>

                <p className="text-xs text-red-500"></p>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Date of Birth</label>
              <input
                type="date"
                className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
              {...register('dob')}
              />
            </div>

            <div className="flex flex-col">
             
      <h1 className="font-medium">Your Location</h1>

      {/* Province */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-400">Province</label>
        <select
          {...register("province")}
          
          className="border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-red-800 w-full"
        >
          <option value="">Select province</option>
          {Object.keys(LOCATIONS).map(p => <option key={p} value={p}>{p}</option>)}
          <option value="Other">Other</option>
        </select>
        
      </div>

      {/* District */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-400">District</label>
        <select
          {...register("district")}
          disabled={!selectedProvince}
          className="border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-red-800 w-full disabled:bg-gray-100"
        >
          <option value="">Select district</option>
          {districts.map(d => <option key={d} value={d}>{d}</option>)}
          {selectedProvince && <option value="Other">Other</option>}

        </select>
       
      </div>

      {/* City */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-400">City / Municipality</label>
        <select
          {...register("city")}
          disabled={!selectedDistrict}
          className="border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-red-800 w-full disabled:bg-gray-100"
        >
          <option value="">Select city</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
          {selectedDistrict && <option value="Other">Other</option>}
        </select>
        
      </div>

      {/* Street Address */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-400">Street Address</label>
        <input
          {...register("streetAddress")}
          type="text"
          placeholder="e.g. Putalisadak, Ward No. 4"
          className="border border-gray-400 rounded-md p-2 outline-0 focus:ring-2 focus:ring-red-800 w-full"
        />
       
      </div>

     
  
            </div>
            <div className="w-full flex items-center justify-center">
              <button type="submit"  className="bg-red-900 text-white p-2 px-10 font-bold rounded-lg mt-4 cursor-pointer hover:bg-red-700">Update Profile</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

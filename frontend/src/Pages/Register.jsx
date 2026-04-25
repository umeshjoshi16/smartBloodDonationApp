import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Droplet,Eye,EyeOff , Hospital, SquarePlus, MoveRight,MoveLeft  } from "lucide-react";
import Logo from "../Components/Logo";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Toaster, toast } from "react-hot-toast";




const QUOTES = {
  default:"You will receive emergency notifications when your blood group is needed nearby and help save lives in critical situations.",
  donor: "You will receive emergency notifications when your blood group is needed nearby and help save lives in critical situations.",
  hospital: "You can request blood instantly, manage patient needs, and connect with nearby donors during emergencies.",
  organization: "You can organize blood donation campaigns, reach potential donors, and support hospitals in saving more lives.",
};


const STEPS=['role','personal','location']

export default function Register(){
  
   const navigate = useNavigate();
  const [view, setView] = useState("role");
  const [activeRole, setActiveRole] = useState(null);
  const [formData, setFormData] = useState({});
 


  const stepIndex = STEPS.indexOf(view);
  const isComplete = (step) => STEPS.indexOf(step) < stepIndex;
  const isCurrent = (step) => step === view;


   const handlePersonalSuccess = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setView("location");
  };
 
  const handleLocationSuccess = (data) => {
    const finalPayload = { ...formData, ...data };
    console.log("Final payload", finalPayload);
   toast.success("Thank you for registering", { duration: 3000, position: "top-center" });
   setTimeout(() => {
    navigate('/login');
  }, 1000);
  
  };
 
 
  const handleBack = () => {
    if (view === "personal") setView("role");
    if (view === "location") setView("personal");
  };
 

  const handleRoleContinue = () => {
    if (!activeRole) return;
     setFormData((prev) => ({ ...prev, role: activeRole }));
    setView("personal");
  };
 
  const stepClass = (step) =>
    isComplete(step)
      ? "bg-green-600"
      : isCurrent(step)
      ? "bg-red-700"
      : "bg-gray-400";
 
  const stepTextClass = (step) =>
    isComplete(step)
      ? "text-green-600"
      : isCurrent(step)
      ? "text-black"
      : "text-gray-400";

   return (
    
    <div className="flex flex-col items-start justify-start roboto-slab-body overflow-hidden">
       <Toaster position="top-right" reverseOrder={false} />
    
      <div className="bg-red-900 h-30 w-full flex flex-col items-start justify-start p-1 px-4 relative overflow-hidden">
        <div className="rounded-full w-40 h-40 bg-white/20 absolute -top-15 -right-6" />
        <div className="rounded-full w-25 h-25 bg-white/20 absolute -bottom-15 -left-6" />
        <Logo />
        <h1 className="text-white text-3xl merriweather-header">Be a Lifesaver,</h1>
        <p className="text-white/50 roboto-slab-body text-sm">
          One registration. One donation. One life saved. It starts here.
        </p>
      </div>
 
      <div className="flex w-full flex-col items-center justify-center px-1">
        <div className="flex flex-col items-center justify-start text-sm my-5 w-full bg-white">
          
          <div className="flex flex-row justify-evenly items-start gap-1 md:gap-20 w-full sm:w-150">
            {[
              { key: "role", label: "Your Role", num: 1 },
              { key: "personal", label: "Personal Information", num: 2 },
              { key: "location", label: "Location", num: 3 },
            ].map(({ key, label, num }) => (
              <div key={key} className="flex flex-row items-center justify-center gap-4 roboto-slab-heading h-20">
                <div className={`flex rounded-full w-6 h-6 items-center justify-center text-white ${stepClass(key)}`}>
                  <h1>{num}</h1>
                </div>
                <h1 className={stepTextClass(key)}>{label}</h1>
              </div>
            ))}
          </div>
          
 
         
          {view === "role" && (
            <div className="flex flex-col items-center w-full  px-4 ">
              <h1 className="roboto-slab-heading text-xl ">I WANT TO JOIN AS*</h1>
 
              <div className="flex flex-row items-start justify-start gap-7 md:gap-20 mt-3">
                {[
                  { role: "donor", Icon: Droplet, label: "Donor" },
                  { role: "hospital", Icon: Hospital, label: "Hospital" },
                  { role: "organization", Icon: SquarePlus, label: "Organization" },
                ].map(({ role, Icon, label }) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setActiveRole(role)}
                    className={`border p-2 rounded-xl w-25 md:w-30 flex flex-col items-center justify-center cursor-pointer roboto-slab-body
                      ${activeRole === role
                        ? "bg-red-900 text-white"
                        : "border-red-900 hover:bg-red-700 hover:text-white"}`}
                  >
                    <Icon />
                    <h1>{label}</h1>
                  </button>
                ))}
              </div>
 
              <div className="border border-blue-500 border-l-3 rounded-xl mt-5 p-2 bg-orange-200 text-black">
                <div className="min-h-15 md:w-140">
                  <h1>
                    {!activeRole
                      ? "Select your role to see how you can contribute to saving lives through blood donation."
                      : QUOTES[activeRole]}
                  </h1>
                </div>
              </div>
 
              <button
                type="button"
                disabled={!activeRole}
                onClick={handleRoleContinue}
                className={`flex gap-1 rounded-xl w-full md:w-150 justify-center p-3 mt-5
  ${!activeRole ? "bg-red-200 cursor-not-allowed" : "bg-red-900 cursor-pointer hover:bg-red-700 text-white"}`}
              >
                Continue <MoveRight />
              </button>

              <div className="flex border-t border-black/30 h-1 w-full  md:w-150  mt-4 "></div>
              <div className="flex flex-row items-center justify-center gap-3 text-lg mt-5">
                <h1>Already have an account?</h1>
                <button
                  type="button"
                  className="text-blue-700 cursor-pointer hover:underline font-medium"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          )}
 
        
          {view === "personal" && (
            <div className="flex flex-col items-start justify-center w-full md:w-140">
              {activeRole === "donor" && (
                <DonorForm onSuccess={handlePersonalSuccess} onBack={handleBack} />
              )}
              {activeRole === "hospital" && (
                <HospitalForm onSuccess={handlePersonalSuccess} onBack={handleBack} />
              )}
              {activeRole === "organization" && (
                <OrgForm onSuccess={handlePersonalSuccess} onBack={handleBack} />
              )}
            </div>
          )}
 
          
          {view === "location" && (
            <div className="flex flex-col items-start justify-center w-full md:w-140">
              <LocationForm onSuccess={handleLocationSuccess} onBack={handleBack} />
            </div>
          )}
        </div>
      </div>
    </div>
  );

}


const DonorForm=({ onSuccess, onBack })=>{
   const donorSchema = yup.object({
  donorName: yup.string().required("Donor name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9+\-()]+$/, "Invalid phone number")
    .required("Phone Number is required"),
  dateOfBirth: yup.date().typeError("Invalid date").required("Date of Birth is required"),
  gender: yup.string().required("Please choose a gender"),
  bloodGroup: yup.string().required("Please choose a blood group"),
});

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(donorSchema),
  });

   const onSubmit = (data) =>{
   onSuccess({ ...data, role: "donor" });
   }

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);



   return(
     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-2 w-full mx-5">
                  <h1 className="font-bold text-xl">Individual Blood Donor</h1>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium ">Name*</label>
                    <input
                      type="text"
                      placeholder="e.g. Ram Sharma"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800" 
                      {...register('donorName')}
                    />
                    <p className="text-xs text-red-500">{errors.donorName?.message}</p>
                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Email*</label>
                    <input
                      type="email"
                      placeholder="e.g. ram@gmail.com"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800" {
                        ...register('email')
                      }
                    />
                    <p className="text-xs text-red-500">{errors.email?.message}</p>
                  </div>

                  <div className="flex  flex-col gap-1 w-80">
                    <label className="font-medium">Password*</label>
                    <input
                       type={showPassword?"text":"password"}
                      placeholder="Enter a strong password"
                      className=" border border-gray-400 relative rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                      {
                        ...register('password')
                      }
                      
                    />
                    <p className="text-xs text-red-500">{errors.password?.message}</p>
                    
                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Confirm Password*</label>
                    <input
                       type={showPassword?"text":"password"}
                      placeholder="Re-enter your password"
                      className=" border border-gray-400 relative rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                      {
                        ...register('confirmPassword')
                      }
                    />
                    <p className="text-xs text-red-500">{errors.confirmPassword?.message}</p>
                    

                    
                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Phone Number*</label>
                    <input
                      type="text"
                      placeholder="e.g. 9848XXXXXX"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                      {
                        ...register('phoneNumber')
                      }
                    />
                    <p className="text-xs text-red-500">{errors.phoneNumber?.message}</p>
                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Date of Birth*</label>
                    <input
                      type="date"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                      {
                        ...register('dateOfBirth')
                      }
                    />
                    <p className="text-xs text-red-500">{errors.dateOfBirth?.message}</p>
                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Gender*</label>
                    <div className="flex flex-row items-center  gap-5">
                      <label className="flex flex-row gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          className=" border border-gray-400 rounded-md p-2 outline-0 cursor-pointer accent-red-700"
                          {...register('gender')}
                        />
                        Male
                      </label>

                      <label className="flex flex-row gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          className=" border border-gray-400 rounded-md p-2 outline-0  cursor-pointer accent-red-700"
                          {...register('gender')}
                        />
                        Female
                      </label>

                      <label className="flex flex-row gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                          className=" border border-gray-400 rounded-md p-2 outline-0 cursor-pointer accent-red-700"
                          {...register('gender')}
                        />
                        Other
                      </label>
                      <div>
                        
                      </div>
                      
                      <p className="text-xs text-red-500">{errors.gender?.message}</p>
                    </div>

                    <div className="flex flex-col gap-1 w-80">
                      <label className="font-medium">Blood Group*</label>
                      <div className="flex flex-wrap items-center  gap-5">
                        <label className="flex flex-row gap-2">
                          <input
                            type="radio"
                            name="blood"
                            value="a+"
                            className=" border border-gray-400 rounded-md p-2 outline-0 cursor-pointer accent-red-700"
                            {...register('bloodGroup')}
                          />
                          A+
                        </label>

                        <label className="flex flex-row gap-2">
                          <input
                            type="radio"
                            name="blood"
                            value="a-"
                            className=" border border-gray-400 rounded-md p-2 outline-0  cursor-pointer accent-red-700"
                            {...register('bloodGroup')}
                          />
                          A-
                        </label>

                        <label className="flex flex-row gap-2">
                          <input
                            type="radio"
                            name="blood"
                            value="b+"
                            className=" border border-gray-400 rounded-md p-2 outline-0 cursor-pointer accent-red-700"
                            {...register('bloodGroup')}
                          />
                          B+
                        </label>

                        <label className="flex flex-row gap-2">
                          <input
                            type="radio"
                            name="blood"
                            value="b-"
                            className=" border border-gray-400 rounded-md p-2 outline-0 cursor-pointer accent-red-700"
                            {...register('bloodGroup')}
                          />
                          B-
                        </label>

                        <label className="flex flex-row gap-2">
                          <input
                            type="radio"
                            name="blood"
                            value="o+"
                            className=" border border-gray-400 rounded-md p-2 outline-0 cursor-pointer accent-red-700"
                            {...register('bloodGroup')}
                          />
                          O+
                        </label>

                        <label className="flex flex-row gap-2">
                          <input
                            type="radio"
                            name="blood"
                            value="o-"
                            className=" border border-gray-400 rounded-md p-2 outline-0 cursor-pointer accent-red-700"
                            {...register('bloodGroup')}
                          />
                          O-
                        </label>

                        <label className="flex flex-row gap-2">
                          <input
                            type="radio"
                            name="blood"
                            value="ab+"
                            className=" border border-gray-400 rounded-md p-2 outline-0 cursor-pointer accent-red-700"
                            {...register('bloodGroup')}
                          />
                          AB+
                        </label>

                        <label className="flex flex-row gap-2">
                          <input
                            type="radio"
                            name="blood"
                            value="ab-"
                            className=" border border-gray-400 rounded-md p-2 outline-0 cursor-pointer accent-red-700"
                            {...register('bloodGroup')}
                          />
                          AB-
                        </label>
                      </div>
                      <p className="text-xs text-red-500">{errors.bloodGroup?.message}</p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center mx-5 gap-10 mt-5 ">
                <button type="button" className="flex flex-row gap-1 border rounded-xl bg-gray-600 text-white hover:bg-gray-500 cursor-pointer w-full  items-center justify-center p-3 px-8" onClick={onBack}>
                  Back
                  <MoveLeft />
                </button>

                <button type="submit"
                  className="flex flex-row gap-1 border rounded-xl bg-red-900 text-white hover:bg-red-700 cursor-pointer w-full  items-center justify-center p-3 px-8"
                  
                >
                  Continue
                  <MoveRight />
                </button>
              </div>
                </form>
    

   )

}

const HospitalForm=({ onSuccess, onBack })=>{
  const hospitalSchema = yup.object({
  hospitalName: yup.string().required("Hospital name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9+\-()]+$/, "Invalid phone number")
    .required("Phone Number is required"),
  registrationNumber: yup.string().required("Registration number is required"),
  contactPerson: yup.string().required("Contact person name is required"),
  contactPhoneNumber: yup
    .string()
    .matches(/^[0-9+\-()]+$/, "Invalid phone number")
    .required("Contact phone number is required"),
});

const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(hospitalSchema),
  });
  


    const onSubmit = (data) => {
    onSuccess({ ...data, role: "hospital" });
    }

   const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);



    return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-2 w-full mx-5">
                  <h1 className="text-xl font-bold">Healthcare Institution</h1>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Hospital Name*</label>
                    <input
                      type="text"
                      placeholder="e.g. Grande International Hospital"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('hospitalName')}
                    />
                    <p className="text-xs text-red-500">{errors.hospitalName?.message}</p>
                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Email*</label>
                    <input
                      type="email"
                      placeholder="e.g. hospital@email.com"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('email')}
                    
                    />
                     <p className="text-xs text-red-500">{errors.email?.message}</p>
                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Password*</label>
                    <input
                      type="password"
                      placeholder="Enter a strong password"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('password')}
                    
                    />
                     <p className="text-xs text-red-500">{errors.password?.message}</p>
                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Confirm Password*</label>
                    <input
                      type="password"
                      placeholder="Re-enter your password"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('confirmPassword')}
                    
                    />
                     <p className="text-xs text-red-500">{errors.confirmPassword?.message}</p>
                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Phone Number*</label>
                    <input
                      type="text"
                      placeholder="e.g. 01-4XXXXXX"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('phoneNumber')}
                    
                    />
                     <p className="text-xs text-red-500">{errors.phoneNumber?.message}</p>
                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Registration Number*</label>
                    <input
                      type="text"
                      placeholder="e.g. REG-12345"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('registrationNumber')}
                    
                    />
                     <p className="text-xs text-red-500">{errors.registrationNumber?.message}</p>
                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Contact Person Name*</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Gyani Sharma"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('contactPerson')}
                   
                   />
                    <p className="text-xs text-red-500">{errors.contactPerson?.message}</p>
                  </div>
                   <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Contact Person Number*</label>
                    <input
                      type="text"
                      placeholder="e.g. 9848XXXXXX" 
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('contactPhoneNumber')}
                    
                    />
                     <p className="text-xs text-red-500">{errors.contactPhoneNumber?.message}</p>
                  </div>
                  <div className="flex flex-row items-center mx-5 gap-10 mt-5 ">
                <button type="button" className="flex flex-row gap-1 border rounded-xl bg-gray-600 text-white hover:bg-gray-500 cursor-pointer w-full  items-center justify-center p-3 px-8" onClick={onBack}>
                  Back
                  <MoveLeft />
                </button>

                <button type="submit"
                  className="flex flex-row gap-1 border rounded-xl bg-red-900 text-white hover:bg-red-700 cursor-pointer w-full  items-center justify-center p-3 px-8"
                  
                >
                  Continue
                  <MoveRight />
                </button>
              </div>
                </form>
  );


}


const OrgForm=({ onSuccess, onBack })=>{
   const organizationSchema = yup.object({
  organizationName: yup.string().required("Organization name is required"),
  organizationType: yup.string().required("Please select a type"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9+\-()]+$/, "Invalid phone number")
    .required("Phone Number is required"),
  registrationNumber: yup.string().required("Registration number is required"),
  contactPerson: yup.string().required("Contact person name is required"),
  contactPhoneNumber: yup
    .string()
    .matches(/^[0-9+\-()]+$/, "Invalid phone number")
    .required("Contact phone number is required"),
});


 const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(organizationSchema),
  });
 
  const onSubmit = (data) => {
    onSuccess({ ...data, role: "organization" });
  }
 const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

 return (
     <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-2 w-full mx-5">
                  <h1 className="text-xl font-bold">Non-Profit/Organization</h1>
                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Organization Name*</label>
                    <input
                      type="text"
                      placeholder="e.g. Red Cross"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('organizationName')}

                    />
                     <p className="text-xs text-red-500">{errors.organizationName?.message}</p>
                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Organization Type*</label>
                    

                    <select className="border p-2 rounded-lg w-full mt-1" {...register('organizationType')}>
                      <option value="">Select Organization Type</option>
                      <option value="ngo">NGO</option>
                      <option value="nonprofit">Non-Profit</option>
                      <option value="club">Club</option>
                      <option value="corporate">Corporate / Company</option>
                      <option value="educational">
                        Educational Institution
                      </option>
                      <option value="government">
                        Government Organization
                      </option>
                      <option value="other">Other</option>
                    


                    </select>
                     <p className="text-xs text-red-500">{errors.organizationType?.message}</p>

                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Email*</label>
                    <input
                      type="email"
                      placeholder="e.g. redcross@gmail.com"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('email')}

                    />
                     <p className="text-xs text-red-500">{errors.email?.message}</p>

                  </div>
                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Password*</label>
                    <input
                      type="password"
                      placeholder="Enter strong password"
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('password')}

                    />
                     <p className="text-xs text-red-500">{errors.password?.message}</p>

                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Confirm Password*</label>
                    <input
                      type="password"
                      placeholder="Enter password again" 
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('confirmPassword')}

                    />
                     <p className="text-xs text-red-500">{errors.confirmPassword?.message}</p>

                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Phone Number*</label>
                    <input
                      type="text"
                      placeholder="e.g. 01-XXXXXXX" 
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('phoneNumber')}

                    />
                     <p className="text-xs text-red-500">{errors.phoneNumber?.message}</p>

                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Registration Number*</label>
                    <input
                      type="text"
                      placeholder="e.g. REG-12345" 
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('registrationNumber')}

                    />
                     <p className="text-xs text-red-500">{errors.registrationNumber?.message}</p>

                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Contact Person Name*</label>
                    <input
                      type="text"
                      placeholder="e.g. Gyani Poudel" 
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('contactPerson')}

                    />
                     <p className="text-xs text-red-500">{errors.contactPerson?.message}</p>

                  </div>

                  <div className="flex flex-col gap-1 w-80">
                    <label className="font-medium">Contact Person Number*</label>
                    <input
                      type="text"
                      placeholder="e.g. 9848XXXXXX" 
                      className=" border border-gray-400 rounded-md p-2 outline-0 focus:ring focus:ring-red-800"
                    {...register('contactPhoneNumber')}

                    />
                     <p className="text-xs text-red-500">{errors.contactPhoneNumber?.message}</p>

                  </div>
                  <div className="flex flex-row items-center mx-5 gap-10 mt-5 ">
                <button type="button" className="flex flex-row gap-1 border rounded-xl bg-gray-600 text-white hover:bg-gray-500 cursor-pointer w-full  items-center justify-center p-3 px-8" onClick={onBack}>
                  Back
                  <MoveLeft />
                </button>

                <button type="submit"
                  className="flex flex-row gap-1 border rounded-xl bg-red-900 text-white hover:bg-red-700 cursor-pointer w-full  items-center justify-center p-3 px-8" 
                >
                  Continue
                  <MoveRight />
                </button>
              </div>


                </form>
  );
}


const LocationForm=({ onSuccess, onBack })=>{
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

const locationSchema = yup.object({
  province: yup.string().required("Province is required"),
  district: yup.string().required("District is required"),
  city: yup.string().required("City / Municipality is required"),
  streetAddress: yup.string().required("Street address is required"),
});
 

 const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(locationSchema),
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

  
 
 
const onSubmit = (data) =>{
onSuccess(data);
}




  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <h1 className="font-bold text-xl mb-4">Your Location</h1>

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

      {/* Buttons */}
      <div className="flex gap-4 mt-5">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-600 text-white p-3 rounded-xl hover:bg-gray-500 cursor-pointer"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 bg-red-900 text-white p-3 rounded-xl hover:bg-red-700 cursor-pointer"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
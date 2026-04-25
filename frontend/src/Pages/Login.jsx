import Logo from "../Components/Logo";
import { Mail, Lock, Eye,EyeOff, Info } from "lucide-react";
import BloodDonating from '../Assets/BloodDonating.png'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

const userSchema=yup.object({
  email:yup.string().email('Invalid email format').required('Enter your email'),
  password:yup.string().required('Enter your password')

})

export default function Login() {

  const{
    register,
    reset,
    handleSubmit,
  formState: { errors }
  }=useForm({
    resolver:yupResolver(userSchema)
  });

  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

const onSubmit=()=>{
  console.log(data);
  reset();
}


  return (
   
   
    <div className="flex flex-col h-screen items-center justify-start  bg-gray-50 overflow-hidden shadow-md ml-auto">
      <div className="bg-red-900 h-60   w-full  md:w-110 flex flex-col items-start justify-start p-5 relative overflow-hidden ">
        <div className="rounded-full w-40 h-40 bg-white/20 absolute -top-15 -right-6 "></div>
        <div className="rounded-full w-25 h-25 bg-white/20 absolute -bottom-15 -left-6 "></div>
        <div className="rounded-full w-6 h-6 bg-white/20 absolute bottom-15 right-6 rotate-30 "></div>
        <div className="rounded-full w-4 h-4 bg-white/15 absolute bottom-10 right-12 rotate-30 "></div>
        <div className="rounded-full w-3 h-3 bg-white/10 absolute bottom-6 right-16 rotate-15"></div>
        <Logo />
        <h1 className="text-white text-3xl  merriweather-header mt-5">
          Welcome Back,
        </h1>
        <p className="text-white/50  text-sm roboto-slab-body ">
          Login in to your account and keep saving lives.
        </p>
      </div>
      <div className="flex items-center h-screen flex-col bg-white  shadow justify-start pt-5  w-full  md:w-110 ">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center roboto-slab-body p-5 gap-3">
          <div className="flex flex-col relative w-90 justify-center">
            <label className="roboto-slab-heading">Email</label>
            <div className="relative w-full">
            <Mail className="absolute left-3 top-1/5 text-gray-400" size={16} />
            <input
              type="email"
              placeholder="your@email.com"
              className="border border-gray-300 rounded-lg  text-sm p-2 pl-12 w-full relative outline-0 focus:ring-2 focus:ring-red-900"
              {...register("email")}
            />
            <p className="text-sm text-red-600 p-1 pl-13">{errors.email?.message}</p>
            </div>
          </div>

          <div className="flex flex-col   w-90">
            <label className="roboto-slab-heading">Password</label>
             <div className="relative w-full">
            <Lock className="absolute left-3 top-1/5  text-gray-400" size={16}/>

            <input
              type={showPassword?"text":"password"}
              placeholder="Your password"
              className="border border-gray-300 rounded-lg text-sm p-2 pl-12  relative outline-0 focus:ring-2 focus:ring-red-900 w-full"
              {...register("password")}
              
            />
              <p className="text-sm text-red-600  p-1 pl-13">{errors.password?.message}</p>
              <div className="absolute right-3 top-1/6 cursor-pointer text-gray-500" onClick={togglePassword}>
             {showPassword?<Eye size={20} />:<EyeOff size={20}/>}


             </div>
              </div>
             
          </div>
          <div className="w-full flex flex-row items-center justify-center  ">
            <button className="w-full bg-red-900 text-white roboto-slab-heading rounded-lg p-2 cursor-pointer hover:bg-red-700">
              Login
            </button>
          </div>

          <div className="flex border-t border-black/30 h-1 w-full "></div>
          <div className="flex flex-row gap-2 text-lg md:text-md">
            <h1>Don't have an account ?</h1>
            <button className="text-blue-700 font-medium cursor-pointer hover:underline" onClick={()=>{
              navigate('/register')
            }}>
              Register for free
            </button>
          </div>
        </form>
      </div>
    </div>
     
  );
}

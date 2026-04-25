import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound(){
  const navigate=useNavigate();

  return(
    <div className="flex items-center justify-center flex-col w-full h-screen roboto-slab-heading">
      
        <h1 className="text-blue-900 text-7xl m-5 ">Oops! 404</h1>
      


         
      <h1 className="text-red-900 text-2xl">Page Not Found!</h1>
      <h1 className="text-gray-500 font-medium">Sorry, the page you are looking for does not exist.</h1>
      <button onClick={()=>{
        navigate('/')
      }} className="flex border rounded-xl p-2 px-4 m-5 gap-1 bg-red-900 text-white cursor-pointer hover:bg-red-700">
        <MoveLeft/>
        Back to Home
        </button>

    </div>
  )
}
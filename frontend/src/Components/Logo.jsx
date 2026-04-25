import { Droplet, HeartPlus } from 'lucide-react';
import LogoImage from '../Assets/Logo.png'
export default function Logo(){


  return(
    <div className='flex flex-row items-center justify-center merriweather-header font-extrabold text-white gap-3 cursor-pointer'>
          < HeartPlus className='fill-white/30 bg-white/40 rounded h-10 w-10 p-1' size={22}/>
          <h1>GiveLife</h1>

        </div>
  )
}

export const  LogoBlack=()=>{


  return(
    <div className='flex flex-row items-center justify-center merriweather-header font-extrabold text-black gap-3 cursor-pointer'>
          < HeartPlus className='fill-white/30 bg-white/40 rounded h-10 w-10 p-1' size={22}/>
          <h1>GiveLife</h1>

        </div>
  )
}
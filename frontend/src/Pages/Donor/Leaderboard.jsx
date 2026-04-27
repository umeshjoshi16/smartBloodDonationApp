import React from "react";
import { Award, Droplet, Heart, Trophy } from "lucide-react";



export default function Leaderboard() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen gap-6 p-4 pb-30 md:pb-5 bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-10">

     

      <h1 className="text-3xl font-semibold text-gray-800 flex flex-row items-center">
        <Award size={40}/> Top Donors
      </h1>

   <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6 mt-6">

  {/* 2nd */}
 <div className="order-2 md:order-1 flex flex-col items-center bg-linear-to-b from-gray-300 to-gray-100 border border-gray-300 rounded-2xl px-6 py-8 w-60 md:w-55 shadow-md relative cursor-pointer hover:scale-105 transform transition-all duration-300 ease-out">

  {/* Badge */}
  <div className="absolute -top-4 bg-gray-500 text-white text-md px-3 py-1 rounded-full shadow border">
    #2 Top Donor
  </div>

  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 border border-gray-300 text-2xl mb-2">
    🥈
  </div>

  <h2 className="font-semibold text-gray-800 text-center text-xl">
    Ram Adhikari
  </h2>

  <p className="text-xs text-gray-600 mt-1">O+ donor</p>

  <div className="mt-3 px-4 py-1.5 bg-white rounded-full text-sm font-bold text-gray-700 shadow-sm">
    16 Donations
  </div>
</div>


  {/* 1st */}
  <div className="order-1 md:order-2 flex flex-col items-center justify-center bg-linear-to-b from-yellow-300 to-yellow-100 border border-yellow-400 rounded-2xl px-6 py-8 w-70 h-70 shadow-lg relative cursor-pointer hover:scale-110 transform transition-all duration-300 ease-out  ">
    
    {/* Crown effect */}
    <div className="absolute -top-4 bg-yellow-400 text-white text-md px-3 py-1 rounded-full shadow border ">
      #1 Top Donor
    </div>

    <div className="w-14 h-14 flex  items-center justify-center rounded-full bg-yellow-200 border border-amber-300 text-2xl mb-2">
      🥇
    </div>

    <h2 className="font-semibold text-gray-900 text-center text-xl">
      Aarav Karki
    </h2>

    <p className="text-xs text-gray-700 mt-1">AB+ donor</p>

    <div className="mt-3 px-4 py-1.5 bg-white rounded-full text-sm font-bold text-yellow-700 shadow-sm">
      21 Donations
    </div>
  </div>


  {/* 3rd */}
 <div className="order-3 flex flex-col items-center bg-linear-to-b from-red-200 to-red-50 border border-red-300 rounded-2xl px-6 py-8 w-50 md:w-55 shadow-md relative cursor-pointer hover:scale-105 transform transition-all duration-300 ease-out">

  {/* Badge */}
  <div className="absolute -top-4 bg-red-500 text-white text-md px-3 py-1 rounded-full shadow border">
    #3 Top Donor
  </div>

  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 border border-red-300 text-2xl mb-2">
    🥉
  </div>

  <h2 className="font-semibold text-gray-800 text-center text-xl">
    Sita Niraula
  </h2>

  <p className="text-xs text-gray-600 mt-1">O+ donor</p>

  <div className="mt-3 px-4 py-1.5 bg-white rounded-full text-sm font-bold text-red-600 shadow-sm">
    12 Donations
  </div>
</div>

</div>

       </div>
       {/*leaderboard*/}
     <div className="mt-10 w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden text-sm">

 
  <div className="bg-red-900 text-white px-6 py-4">
    <h2 className="text-lg font-semibold">Top Donors Leaderboard</h2>
    <p className="text-xs text-white/70 flex text-center gap-1">
      Every donation makes a difference<Heart size={16}/>
    </p>
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full min-w-125 text-left">

     
      <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase">
        <tr>
          <th className="px-6 py-3">Rank</th>
          <th className="px-6 py-3">Donor</th>
          <th className="px-6 py-3">Blood Group</th>
          <th className="px-6 py-3 text-right">Donations</th>
        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y divide-gray-100">

        {/* 4 */}
        <tr className="hover:bg-red-50 transition cursor-pointer">

          <td className="px-6 py-4 font-bold text-red-900">#4</td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-3">

              
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 shrink-0">
                A
              </div>

              <span className="text-gray-800">Aarav Shrestha</span>

            </div>
          </td>

          <td className="px-6 py-4 text-gray-600">O+</td>

          <td className="px-6 py-4 text-right font-semibold text-red-900">
            16
          </td>

        </tr>

        {/* 5 */}
        <tr className="hover:bg-red-50 transition cursor-pointer">

          <td className="px-6 py-4 font-bold text-red-900">#5</td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 shrink-0">
                R
              </div>

              <span className="text-gray-800">Riya Karki</span>

            </div>
          </td>

          <td className="px-6 py-4 text-gray-600">A+</td>

          <td className="px-6 py-4 text-right font-semibold text-red-900">
            15
          </td>

        </tr>

        {/* 6 */}
        <tr className="hover:bg-red-50 transition cursor-pointer">

          <td className="px-6 py-4 font-bold text-red-900">#6</td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 shrink-0">
                S
              </div>

              <span className="text-gray-800">Sujan Thapa</span>

            </div>
          </td>

          <td className="px-6 py-4 text-gray-600">B+</td>

          <td className="px-6 py-4 text-right font-semibold text-red-900">
            14
          </td>

        </tr>

        {/* 7 */}
        <tr className="hover:bg-red-50 transition cursor-pointer">

          <td className="px-6 py-4 font-bold text-red-900">#7</td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 shrink-0">
                M
              </div>

              <span className="text-gray-800">Maya Gurung</span>

            </div>
          </td>

          <td className="px-6 py-4 text-gray-600">O-</td>

          <td className="px-6 py-4 text-right font-semibold text-red-900">
            13
          </td>

        </tr>

        {/* 8 */}
        <tr className="hover:bg-red-50 transition cursor-pointer">

          <td className="px-6 py-4 font-bold text-red-900">#8</td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 shrink-0">
                K
              </div>

              <span className="text-gray-800">Kiran Rai</span>

            </div>
          </td>

          <td className="px-6 py-4 text-gray-600">AB+</td>

          <td className="px-6 py-4 text-right font-semibold text-red-900">
            12
          </td>

        </tr>

        {/* 9 */}
        <tr className="hover:bg-red-50 transition cursor-pointer">

          <td className="px-6 py-4 font-bold text-red-900">#9</td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 shrink-0">
                N
              </div>

              <span className="text-gray-800">Nisha Lama</span>

            </div>
          </td>

          <td className="px-6 py-4 text-gray-600">A-</td>

          <td className="px-6 py-4 text-right font-semibold text-red-900">
            11
          </td>

        </tr>

        {/* 10 */}
        <tr className="hover:bg-red-50 transition cursor-pointer">

          <td className="px-6 py-4 font-bold text-red-900">#10</td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 shrink-0">
                D
              </div>

              <span className="text-gray-800">Dipesh Adhikari</span>

            </div>
          </td>

          <td className="px-6 py-4 text-gray-600">O+</td>

          <td className="px-6 py-4 text-right font-semibold text-red-900">
            10
          </td>

        </tr>

      </tbody>
    </table>
  </div>
</div>

       {/*banner*/}

<div className="mt-8 bg-red-900 text-white rounded-2xl p-6 shadow-lg text-center">

  <h2 className="text-xl font-semibold text-center flex">
  <Droplet fill="white"/> Your donation can save lives
  </h2>

  <p className="text-sm text-white/80 mt-2">
    One blood donation can save up to 3 lives. Be the hero someone needs today.
  </p>

  <div className="mt-4 flex flex-col md:flex-row gap-3 justify-center">
    
    <button className="bg-white text-red-900 px-6 py-2 rounded-lg font-medium hover:scale-105 transition cursor-pointer">
      Find Donation Camps
    </button>

    <button className="border border-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-red-900 transition cursor-pointer">
      Learn Eligibility
    </button>

  </div>

</div>


    </div>
  );
}
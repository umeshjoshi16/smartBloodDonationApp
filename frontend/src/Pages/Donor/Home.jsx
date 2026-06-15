import { useState,useContext,useEffect } from "react";
import { Bell, CircleCheckBig, Phone, Calendar, Clock, MapPin, CircleAlert, Heart, UserRoundPlus, ChevronRight, Scale, Trophy, GitBranch, Activity, X, Droplets, FlaskConical, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function Home() {

  
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { setUser,user } = useContext(AuthContext);

 
useEffect(() => {
  const fetchProfile = async () => {
    try {
     const res= await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/getprofile`, {
     withCredentials: true,
  });
   setUser(res.data.user); 
    
    console.log(res.data); 
    } catch (err) {
      console.log(err);
    }
  };

  fetchProfile();
}, []);

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* navbar */}
      <div className="bg-white h-15 relative border-b border-gray-300 flex items-center shadow">
        <div className="px-5">
          <h1 className="roboto-slab-heading text-lg">Good morning,{user?.donorName} 👋</h1>
        </div>
        <div className="p-2 ml-auto flex flex-row gap-4">
          <button
            className="p-2 hover:rounded-full hover:cursor-pointer hover:bg-gray-100 text-gray-600"
            onClick={() => setNotificationOpen((prev) => !prev)}
          >
            <Bell className="text-gray-600 fill-gray-600" />
          </button>
        </div>

         {notificationOpen && (
          <div
            onClick={() => setNotificationOpen(false)}
            className="fixed inset-0  bg-black/20 flex items-start justify-end z-50 p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-68 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden mt-12 min-h-80"
            >
              <div className="flex items-center px-4 py-3 border-b border-gray-100 bg-gray-50">
                <h1 className="font-medium text-md">Notifications</h1>
                <X className="ml-auto cursor-pointer text-gray-400 hover:text-gray-800 transition" size={25} onClick={() => setNotificationOpen(false)} />
              </div>
              <div className="px-4 py-6 text-gray-400 text-sm text-center">
                <Bell size={28} className="mx-auto mb-2 text-gray-300" />
                No new notifications
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">
        <div className="flex flex-col w-full mb-20">

          {/* data +eligiblity */}
          <div className="flex flex-col items-center justify-center gap-4">
  <div className="flex justify-evenly w-90 px-4 py-4 bg-white shadow-md border border-gray-200 rounded-2xl mt-5">
    <div className="flex flex-col text-center border-r pr-3 flex-1">
      <h1 className="font-bold text-2xl text-red-900">7</h1>
      <h1 className="text-xs text-gray-500">Donations</h1>
    </div>
    <div className="flex flex-col text-center border-r px-3 flex-1">
      <h1 className="font-bold text-2xl text-red-900">21</h1>
      <h1 className="text-xs text-gray-500">Lives Saved</h1>
    </div>
    <div className="flex flex-col text-center border-r px-3 flex-1">
      <h1 className="font-bold text-2xl text-red-900">3</h1>
      <h1 className="text-xs text-gray-500">Referrals</h1>
    </div>
    <div className="flex flex-col text-center pl-3 flex-1">
      <h1 className="font-bold text-2xl text-red-900">#4</h1>
      <h1 className="text-xs text-gray-500">Your Rank</h1>
    </div>
  </div>

  <div className="flex items-center justify-center gap-2 px-4 py-4 bg-green-100 text-green-800 rounded-xl shadow-sm w-80 ">
    <CircleCheckBig size={20} className="shrink-0" />
    <h1 className="text-sm font-medium">You are eligible to donate blood</h1>
  </div>
</div>



          

         

          {/* health checking tools */}
<div className=" mt-6">
  <div className="flex items-center justify-between mb-3">
    <h2 className="font-semibold text-gray-800">Health Tools</h2>
    <button
      onClick={() => navigate("/health-tools")}
      className="text-red-900 text-xs font-medium hover:underline cursor-pointer flex items-center gap-0.5"
    >
      See all <ChevronRight size={13} />
    </button>
  </div>

  <div className="flex justify-between md:justify-start flex-wrap gap-3">
  {[
    { icon: Scale,        label: "BMI",            path: "/donor/health-tools/bmi" },
    { icon: Activity,     label: "Body Fat",        path: "/donor/health-tools/bodyfat" },
    { icon: Heart,        label: "Blood Pressure",  path: "/donor/health-tools/bp" },
    { icon: Droplets,     label: "Compatibility",   path: "/donor/health-tools/compatibility" },
    { icon: CalendarDays, label: "Period Tracker",  path: "/donor/health-tools/period" },
    { icon: FlaskConical, label: "Blood Volume",    path: "/donor/health-tools/bloodvolume" },
  ].map(({ icon: Icon, label, path }) => (
    <button
      key={label}
      onClick={() => navigate(path)}
      className="flex flex-col items-center justify-center gap-2 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-red-200 transition cursor-pointer w-22 h-22"
    >
      <Icon size={22} className="text-red-900" />
      <p className="text-xs font-medium text-gray-700 text-center leading-tight px-2">{label}</p>
    </button>
  ))}
</div>

  
  <p className="text-xs text-gray-400 text-center mt-3">
    Click on a tool to open | See all for full list
  </p>
</div>


          {/* HEALTH TIP */}
          <div className="my-5 p-4 bg-yellow-50 rounded-xl border border-yellow-200 shadow-sm">
            <div className="flex flex-row w-full">
              <h1 className="font-medium mb-1">Health Tip</h1>
              <button
                className="ml-auto text-red-900 text-sm cursor-pointer hover:underline"
                onClick={() => navigate("/health-tips")}
              >
                Explore all
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Drink 2–3 extra glasses of water today. Staying hydrated improves
              donation quality and recovery speed.
            </p>
          </div>

          {/* emergency requests */}
          <div className="flex flex-col my-5 border-t border-gray-300 pt-4">
            <div className="flex items-center w-full mb-3">
              <h1 className="font-semibold text-lg">Active Blood Requests</h1>
              <button
                className="ml-auto text-red-900 text-sm hover:underline cursor-pointer"
                onClick={() => navigate("/donor/emergency")}
              >
                See all
              </button>
            </div>
            <div className="flex flex-wrap gap-5 "> 

             {/* Card1 */}
          <div className="bg-white border border-gray-200 rounded-2xl  w-80 shadow-sm hover:shadow-md transition">
            <div className="h-3 bg-red-900 rounded-t-2xl"></div>

            {/* Top */}
            <div className="p-5">
            <div className="flex items-start">
              <div>
                <h1 className="font-semibold">Bir Hospital, Kathmandu</h1>
                <p className="text-xs text-gray-500">Posted 12 min ago</p>
              </div>
               
             

              <div className="ml-auto bg-red-100 text-red-900 px-3 py-1 rounded-xl text-sm flex items-center gap-1">
                
                <span className="font-bold text-lg">A+</span>
                <span>needed</span>
              </div>
              
             

            </div>
             {/* Urgency */}
    <span className="mt-2 inline-flex items-center gap-1 text-xs text-red-800 border border-red-200 bg-red-50 rounded-lg px-2 py-1">
      <CircleAlert size={11} className="text-red-600" />
      Needed within 2 hrs
    </span>

            {/* Patient Info */}
            <div className="mt-3 text-sm space-y-1">
              <p>
                Patient: <span className="text-gray-600">Ramesh Karki</span>
              </p>

              <div className="flex items-center gap-2 text-gray-500">
                <Phone size={16} />
                <span>9865759663</span>
              </div>
            </div>

            {/* Units */}

            <span className="text-red-900  py-1 rounded-xl text-sm font-medium ">
              3 units required
            </span>


            {/* Description */}
            <p className="text-sm text-gray-500 mt-3">
              Urgently needed for post-surgical patient within 2–3 hours.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-4 w-full">
              <button  onClick={()=>{
              setCanDonate(true);
            }} className="flex flex-row gap-1 items-center bg-green-100 text-green-800 border border-green-300 py-2 rounded-lg text-sm hover:bg-green-200 transition cursor-pointer px-3">
                <Heart size={16}/>I can donate
              </button>

              <button onClick={()=>{
                setRefer(true);
              }} className="flex flex-row items-center justify-center gap-1  px-3 w-35 bg-gray-100 text-gray-800 border border-gray-300 py-2 rounded-lg text-sm  cursor-pointer hover:bg-gray-200 transition">
                <UserRoundPlus size={16}/>Refer
              </button>
            </div>
            </div>
          </div>


          {/* Card2 */}
            
            <div className="bg-white border border-gray-200 rounded-2xl  w-80 shadow-sm hover:shadow-md transition">
            <div className="h-3 bg-red-900 rounded-t-2xl"></div>

            {/* Top */}
            <div className="p-5">
            <div className="flex items-start">
              <div>
                <h1 className="font-semibold">Bir Hospital, Kathmandu</h1>
                <p className="text-xs text-gray-500">Posted 12 min ago</p>
              </div>
               
             

              <div className="ml-auto bg-red-100 text-red-900 px-3 py-1 rounded-xl text-sm flex items-center gap-1">
                
                <span className="font-bold text-lg">A+</span>
                <span>needed</span>
              </div>
              
             

            </div>
             {/* Urgency */}
    <span className="mt-2 inline-flex items-center gap-1 text-xs text-red-800 border border-red-200 bg-red-50 rounded-lg px-2 py-1">
      <CircleAlert size={11} className="text-red-600" />
      Needed within 2 hrs
    </span>

            {/* Patient Info */}
            <div className="mt-3 text-sm space-y-1">
              <p>
                Patient: <span className="text-gray-600">Ramesh Karki</span>
              </p>

              <div className="flex items-center gap-2 text-gray-500">
                <Phone size={16} />
                <span>9865759663</span>
              </div>
            </div>

            {/* Units */}

            <span className="text-red-900  py-1 rounded-xl text-sm font-medium ">
              3 units required
            </span>


            {/* Description */}
            <p className="text-sm text-gray-500 mt-3">
              Urgently needed for post-surgical patient within 2–3 hours.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-4 w-full">
              <button  onClick={()=>{
              setCanDonate(true);
            }} className="flex flex-row gap-1 items-center bg-green-100 text-green-800 border border-green-300 py-2 rounded-lg text-sm hover:bg-green-200 transition cursor-pointer px-3">
                <Heart size={16}/>I can donate
              </button>

              <button onClick={()=>{
                setRefer(true);
              }} className="flex flex-row items-center justify-center gap-1  px-3 w-35 bg-gray-100 text-gray-800 border border-gray-300 py-2 rounded-lg text-sm  cursor-pointer hover:bg-gray-200 transition">
                <UserRoundPlus size={16}/>Refer
              </button>
            </div>
            </div>
          </div>
          </div>
          </div>
  
  {/*camps */}
          <div className="flex flex-col my-5 border-t border-gray-300 pt-4">
            <div className="flex items-center">
              <h1 className="font-semibold text-lg">Upcoming Camps</h1>
              <button
                className="ml-auto text-red-900 text-sm hover:underline cursor-pointer"
                onClick={() => navigate("/donor/camps")}
              >
                See all
              </button>
            </div>

            <div className="flex flex-wrap gap-5 mt-3 mb-5">
                       {/*camp1*/}

              
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
                       {/*camp2*/}
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

   {/* referal */}
          <div className=" p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-xl shrink-0">
                <GitBranch size={18} className="text-red-900" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Refer a Donor</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  You've referred <strong>3 people</strong> so far. Know someone with a rare blood group? Refer them and earn points.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/donor/emergency")}
              className="mt-3 ml-12 w-50 py-2 rounded-lg bg-red-900 text-white text-sm hover:bg-red-800 transition cursor-pointer"
            >
              Refer Someone Now
            </button>
          </div>


          {/* leaderboard */}
          <div className="flex flex-col my-5 border-t border-gray-300 pt-4">
            <div className="flex items-center w-full mb-3">
              <h1 className="font-semibold text-lg">Leaderboard</h1>
              <button
                className="ml-auto text-red-900 text-sm hover:underline cursor-pointer"
                onClick={() => navigate("/donor/leaderboard")}
              >
                See all
              </button>
            </div>

            {/* Your rank highlight */}
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-xl mb-3">
              <Trophy size={18} className="text-red-900 shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-900">You are ranked <strong>#4</strong> this month</p>
                <p className="text-xs text-red-700">3 more donations to reach #3</p>
              </div>
            </div>

            {/* Top 3 */}
            <div className="flex flex-col gap-2">
              {[
                { rank: 1, emoji: "🥇", name: "Aarav Karki", blood: "AB+", donations: 21 },
                { rank: 2, emoji: "🥈", name: "Ram Adhikari", blood: "O+", donations: 16 },
                { rank: 3, emoji: "🥉", name: "Sita Niraula", blood: "O+", donations: 12 },
              ].map((d) => (
                <div key={d.rank} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5">
                  <span className="text-lg">{d.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{d.name}</p>
                    <p className="text-xs text-gray-500">{d.blood} donor</p>
                  </div>
                  <span className="text-sm font-bold text-red-900">{d.donations} donations</span>
                </div>
              ))}
            </div>
          </div>

         

          

        </div>
      </div>
    </div>
  );
}
import { useState, useContext, useEffect } from "react";
import { 
  Bell, 
  CircleCheckBig, 
  Phone, 
  Calendar, 
  Clock, 
  MapPin, 
  CircleAlert, 
  Heart, 
  PlusCircle, 
  ChevronRight, 
  X, 
  User,
  Mail,
  Eye,
  Droplets, 
  CalendarDays, 
  Users, 
  Activity, 
  Building,
  UserCheck,
  Send,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [healthTip, setHealthTip] = useState("");
  const [tipSuccess, setTipSuccess] = useState(false);
  const { setUser, user } = useContext(AuthContext);

  // High-level operational aggregate stats as requested
  const stats = {
    campsHeld: user?.campsCount || 3,
    emergencyRequestsCount: user?.emergencyCount || 4,
    registeredDonorsCount: user?.totalDonorsParticipated || 40,
  };

  // Mock database data representing blood inventory units currently active in bank
  const bloodInventory = [
    { group: "A+", units: 14, status: "Stable", color: "bg-green-100 text-green-800" },
    { group: "A-", units: 2, status: "Critical", color: "bg-red-100 text-red-800" },
    { group: "B+", units: 19, status: "Stable", color: "bg-green-100 text-green-800" },
    { group: "B-", units: 4, status: "Low", color: "bg-orange-100 text-orange-800" },
    { group: "O+", units: 22, status: "Stable", color: "bg-green-100 text-green-800" },
    { group: "O-", units: 1, status: "Critical", color: "bg-red-100 text-red-800" },
    { group: "AB+", units: 8, status: "Stable", color: "bg-green-100 text-green-800" },
    { group: "AB-", units: 0, status: "Empty", color: "bg-red-200 text-red-950 font-black animate-pulse" },
  ];

  // Specific local donors who previously donated at this institution or signed up for its camps
  const hospitalDonorsList = [
    { name: "Ram Sharma", bloodType: "B+", phone: "1234567890", email: "ram@gmail.com", status: "Not Eligible", lastDonated: "2026-05-10" },
    { name: "Sita Thapa", bloodType: "O+", phone: "9841234567", email: "sita@gmail.com", status: "Eligible", lastDonated: "2026-02-14" },
    { name: "Anil Joshi", bloodType: "A+", phone: "9818765432", email: "anil@gmail.com", status: "Eligible", lastDonated: "2026-01-20" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/getprofile`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);

  const handleBroadcastTip = (e) => {
    e.preventDefault();
    if (!healthTip.trim()) return;
    // Implementation for pushing targeted notification arrays out to donors goes here
    setTipSuccess(true);
    setTimeout(() => {
      setTipSuccess(false);
      setHealthTip("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 mb-20 md:mb-10">
      
      {/* Top Navbar Header Component */}
      <div className="bg-white h-15 relative border-b border-gray-300 flex items-center shadow-sm">
        <div className="px-5">
          <h1 className="roboto-slab-heading text-lg font-bold text-gray-800">
            Welcome back, {user?.hospitalName || "---"} 👋
          </h1>
        </div>
        <div className="p-2 ml-auto flex flex-row gap-4">
          <button
            className="p-2 hover:rounded-full hover:cursor-pointer hover:bg-gray-100 text-gray-600 relative"
            onClick={() => setNotificationOpen((prev) => !prev)}
          >
            <Bell size={22} className="text-gray-600 fill-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
        </div>

        {/* Local Notification Overlay Portal */}
        {notificationOpen && (
          <div onClick={() => setNotificationOpen(false)} className="fixed inset-0 bg-black/60 flex items-start justify-end z-50 p-4">
            <div onClick={(e) => e.stopPropagation()} className="w-68 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden mt-12 min-h-80">
              <div className="flex items-center px-4 py-3 border-b border-gray-100 bg-gray-50">
                <h1 className="font-medium text-md">Live Notifications</h1>
                <X className="ml-auto cursor-pointer text-gray-400 hover:text-gray-800 transition" size={22} onClick={() => setNotificationOpen(false)} />
              </div>
              <div className="px-4 py-3 text-xs border-b border-gray-100 text-gray-700 bg-red-50/50">
                <p className="font-semibold text-red-900">New Response Log</p>
                <p className="text-gray-500">A local donor checked into your active system portal for Keshar Yadav.</p>
              </div>
              <div className="px-4 py-6 text-gray-400 text-sm text-center">No older logs found</div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        
        
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex justify-evenly w-full md:w-130 px-4 py-4 bg-white shadow-sm border border-gray-200 rounded-2xl">
            <div className="flex flex-col text-center border-r pr-3 flex-1">
              <h1 className="font-black text-3xl text-red-900">{stats.campsHeld}</h1>
              <h1 className="text-[13px] font-medium text-gray-500">Camps Held</h1>
            </div>
            <div className="flex flex-col text-center border-r px-3 flex-1">
              <h1 className="font-black text-3xl text-red-900">{stats.emergencyRequestsCount}</h1>
              <h1 className="text-[13px] font-medium text-gray-500">Emergency Requests</h1>
            </div>
            <div className="flex flex-col text-center px-3 flex-1">
              <h1 className="font-black text-3xl text-red-900">{stats.registeredDonorsCount}</h1>
              <h1 className="text-[13px] font-medium text-gray-500">Registered Donors</h1>
            </div>
          </div>
        </div>
<div className="flex flex-wrap justify-between gap-6">
       {/*Live Active Emergency Request  */}
<div className="flex flex-col">
  <div className="flex items-center mb-3">
    <h2 className="font-medium text-gray-800 text-[15px] flex items-center gap-1.5">
      <CircleAlert className="text-red-900 animate-pulse" size={18} /> Active Emergency Request
    </h2>
    <button onClick={() => navigate("/hospital/emergency")} className=" text-red-900 text-[12px] font-medium hover:underline flex items-center gap-0.5 cursor-pointer">
      See More <ChevronRight size={14} />
    </button>
  </div>

  <div
    className="bg-white border border-gray-200 rounded-2xl w-full md:w-80 shadow-sm hover:shadow-md transition"
  >
    <div className="h-3 bg-red-900 rounded-t-2xl" />

    <div className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-gray-800">Keshar Yadav</h2>
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
            <Clock size={11} /> 3 hrs ago
          </p>
        </div>
        <div className="bg-red-100 text-red-900 px-3 py-1 rounded-xl text-sm flex items-center gap-1">
          <span className="font-bold text-base">O+</span>
          <span className="text-xs">needed</span>
        </div>
      </div>

      <div className="w-full flex flex-row items-center mt-2">
        {/* Urgency */}
        <span className="inline-flex items-center gap-1 text-xs border rounded-lg px-2 py-1 bg-red-50 text-red-900 border-red-200 font-semibold">
          <CircleAlert size={11} />
          Within 24 hrs
        </span>

        <span className="ml-auto border rounded-xl text-sm h-fit p-1 px-3 bg-red-100 text-red-900 border-red-200">
          Active
        </span>
      </div>

      {/* Info */}
      <div className="mt-3 text-sm space-y-1 text-gray-700">
        <p>Patient: <span className="text-gray-600">Keshar Yadav</span></p>
        <p className="flex items-center gap-1 text-gray-500"><Phone size={13} /> 9865749327</p>
        <p>Reason: <span className="text-gray-600">Surgery</span></p>
      </div>

      {/* Units */}
      <p className="text-red-900 text-sm font-medium mt-2">
        2 units required
      </p>

      {/* Description */}
      <p className="text-xs text-gray-500 mt-2 bg-gray-50 border border-gray-200 p-2 rounded-xl">
        "Blood needed for the surgery for the patient within 24 to 30 hrs."
      </p>

      {/* Accepted donors button */}
      <button
        onClick={() => setDonorModal({ _id: "default_req", patientName: "Keshar Yadav" })}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-green-200 border border-green-500 rounded-xl py-2 text-sm text-gray-700 hover:bg-green-100 hover:border-green-200 hover:text-green-900 cursor-pointer transition"
      >
        <UserCheck size={15} />
        <h1>3 people responded</h1>
      </button>

      
     
    </div>
  </div>
</div>

        {/*Upcoming Institutional Blood Camp */}
<div className="flex flex-col ">
  <div className="flex items-center mb-3">
    <h2 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
      <CalendarDays className="text-gray-700" size={18} /> Upcoming Scheduled Camp
    </h2>
    <button onClick={() => navigate("/hospital/camp")} className="ml-auto text-red-900 text-xs font-medium hover:underline flex items-center gap-0.5 cursor-pointer">
      See More <ChevronRight size={14} />
    </button>
  </div>

  <div
    className="bg-white border border-gray-200 rounded-2xl w-full md:w-80 shadow-sm hover:shadow-md transition"
  >
    <div className="h-3 bg-red-900 rounded-t-2xl" />

    <div className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-gray-800 text-base">Camp11</h2>
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
            <Clock size={12} /> 4 hours ago
          </p>
        </div>

        <span className="border rounded-xl text-xs px-3 py-1 font-medium bg-blue-100 text-blue-700 border-blue-200">
          Upcoming
        </span>
      </div>

      {/* Location */}
      <div className="mt-3 text-sm text-gray-600 flex items-start gap-2">
        <MapPin size={16} className="mt-0.5 text-gray-400" />
        <span>
          hhh, Waling
        </span>
      </div>

      {/* Contact Metadata */}
      <div className="mt-3 space-y-2 text-sm text-gray-700 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
        <div className="flex items-center gap-2">
          <User size={15} className="text-gray-400" />
          <span className="font-medium text-gray-800">Coordinator Name</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={15} className="text-gray-400" />
          <span>0987654321</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={15} className="text-gray-400" />
          <span className="truncate max-w-50">contact@gmail.com</span>
        </div>
      </div>

      {/* Expected Donors */}
      <div className="mt-3 text-sm flex items-center gap-2">
        <Droplets size={16} className="text-red-900 fill-red-50" />
        <span>
          Expected Donors:{" "}
          <span className="font-bold text-red-900">
            120
          </span>
        </span>
      </div>

      {/* Operational Dates */}
      <div className="mt-3 text-xs text-gray-500 space-y-1 font-mono">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-gray-400" />
          <span>Start: 6/20/2026, 10:00:00 AM</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-gray-400" />
          <span>End: 6/20/2026, 5:00:00 PM</span>
        </div>
      </div>

      {/* Additional Message Context */}
      <div className="mt-3 p-2 rounded-lg bg-amber-50/60 border border-amber-100 text-xs text-gray-600 italic">
        "this is additiona message."
      </div>

      {/* Interface Action Control Utilities */}
      <button 
        onClick={() => {
          setSelectedCampId("default_camp");
          setDetails(true); 
        }} 
        className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2 text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer font-medium"
      >
        <UserCheck size={16} /> 24 people Responded
      </button>

     
    </div>
  </div>
</div>

</div>

        {/* Live Local Blood Storage Inventory Grid */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Droplets className="text-red-800 fill-red-100" size={20} />
              <h3 className="font-bold text-gray-800 text-sm">Blood Bank Inventory Level</h3>
            </div>
            <span className="text-[11px] text-gray-400 font-mono">Last Synchronized: Real-time</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {bloodInventory.map((item) => (
              <div key={item.group} className="border border-gray-200 p-3 rounded-xl flex flex-col justify-between bg-gray-50/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-black text-gray-800">{item.group}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-md font-bold uppercase ${item.color}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Available: <span className="font-bold text-gray-800 text-sm">{item.units}</span> Bag{item.units !== 1 && "s"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Hospital Private Associated Donor List */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
            <div>
              <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                <Building size={16} className="text-gray-500" /> Associated Hospital Donor Roster
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Donors localized within your active city precinct domain</p>
            </div>
            <button onClick={() => navigate("/hospital/donors")} className="text-xs font-semibold text-red-900 hover:underline">
              Manage Roster ({hospitalDonorsList.length})
            </button>
          </div>
          
          <div className="divide-y divide-gray-100 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-100/60 text-gray-500 font-semibold border-b border-gray-200">
                  <th className="p-3">Donor Profile Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Contact Metrics</th>
                  <th className="p-3">Last Donation Stamp</th>
                  <th className="p-3 text-right">System Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {hospitalDonorsList.map((donor, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition">
                    <td className="p-3 font-bold text-gray-800 flex items-center gap-2">
                      <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center font-mono text-gray-600 text-[10px]">
                        {donor.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      {donor.name}
                    </td>
                    <td className="p-3 font-black text-red-900 text-sm">{donor.bloodType}</td>
                    <td className="p-3 text-gray-500">
                      <div>{donor.phone}</div>
                      <div className="text-[10px] text-gray-400">{donor.email}</div>
                    </td>
                    <td className="p-3 font-mono text-gray-500">{donor.lastDonated}</td>
                    <td className="p-3 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                        donor.status === "Eligible" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                      }`}>
                        {donor.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Health Tips Smart Notification Broadcaster */}
        <div className="bg-linear-to-br from-red-900 to-red-950 border border-red-900 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
            <Sparkles size={160} />
          </div>
          <div className="max-w-xl">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Sparkles size={18} className="text-amber-400 animate-pulse" /> Donor Outreach & Engagement Hub
            </h3>
            <p className="text-xs text-red-200 mt-1">
              Broadcast curated health directives, hydration advice, or emergency mobilization cues straight to the notification feeds of all active localized application users.
            </p>
            
            <form onSubmit={handleBroadcastTip} className="mt-4 flex gap-2 relative z-10">
              <input
                type="text"
                value={healthTip}
                onChange={(e) => setHealthTip(e.target.value)}
                placeholder="e.g., Maintain steady iron intake and drink 500ml water immediately before arrival..."
                className="grow bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                className="bg-white text-red-950 font-bold px-4 py-2 rounded-xl text-xs hover:bg-gray-100 transition shadow flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Send size={12} /> Push Alert
              </button>
            </form>

            {tipSuccess && (
              <p className="text-[11px] text-emerald-300 font-bold mt-2 flex items-center gap-1 animate-fadeIn">
                <CircleCheckBig size={12} /> Health advisory notification successfully broadcasted to live donor feeds.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {Heart,Calendar,AlertCircle,Users,MapPin,Shield,Bell,Settings,Building,Edit2,Save,X} from "lucide-react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";


export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  
 
  const [isEditing, setIsEditing] = useState(false);
  const [logout, setLogout] = useState(false);


 

  
  const stats = {
    campsOrganized: user?.campsCount ?? "\u2014",
    emergencyRequests: user?.emergencyCount ?? "\u2014",
    totalDonorsParticipated: user?.totalDonorsParticipated ?? "\u2014",
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    
    setUser((prev) => ({ ...prev, ...formData }));
    setIsEditing(false);
    
   
  };

  const getInitials = (name) => {
    if (!name) return "H";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };




  return (
    <div className="flex flex-col items-center justify-start gap-5 mb-30 md:mb-10 w-full min-h-screen bg-gray-50 p-4">
      
      {/* Hospital Header Banner */}
      <div className="flex flex-wrap items-center justify-between w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-5 gap-5 mt-5 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center rounded-full bg-red-100 w-20 h-20 shadow-inner shrink-0">
            <h1 className="text-red-900 font-bold text-xl">{getInitials(user?.user.hospitalName)}</h1>
          </div>
          <div>
            <h1 className="font-bold text-red-900 text-xl">{user?.user.hospitalName}</h1>
            <h1 className="text-gray-500 text-sm flex items-center gap-1 mt-1">
              <Building size={14} /> Reg No: {user?.user.registrationNumber}
            </h1>
            <h1 className="text-gray-500 text-sm flex items-center gap-1">
              <MapPin size={14} /> {user?.user.city}, {user?.user.district}
            </h1>
          </div>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 p-2 px-4 border rounded-lg border-gray-200 bg-gray-50 text-gray-800 cursor-pointer hover:bg-gray-200 text-sm font-medium transition-all"
          >
            <Edit2 size={14} /> Edit Profile
          </button>
        )}
      </div>

      {/* Main Content Split: Displays Edit Form OR Stats View */}
      {isEditing ? (
        <form onSubmit={handleSaveChanges} className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center border-b pb-3 mb-2">
            <h2 className="text-lg font-semibold text-gray-800">Modify Institutional Information</h2>
            <button 
              type="button" 
              onClick={() => { setUser({ ...user }); setIsEditing(false); }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Hospital Name</label>
              <input type="text" name="hospitalName" value={user?.user.hospitalName} onChange={handleInputChange} className="w-full border p-2 rounded-lg text-sm bg-gray-50 focus:bg-white outline-red-900" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Registration Number</label>
              <input type="text" name="registrationNumber" value={user?.user.registrationNumber} onChange={handleInputChange} className="w-full border p-2 rounded-lg text-sm bg-gray-50 focus:bg-white outline-red-900" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Contact Person</label>
              <input type="text" name="contactPerson" value={user?.user.contactPerson} onChange={handleInputChange} className="w-full border p-2 rounded-lg text-sm bg-gray-50 focus:bg-white outline-red-900" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Phone Number</label>
              <input type="text" name="phoneNumber" value={user?.user.phoneNumber} onChange={handleInputChange} className="w-full border p-2 rounded-lg text-sm bg-gray-50 focus:bg-white outline-red-900" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Email</label>
              <input type="email" name="email" value={user?.user.email} onChange={handleInputChange} className="w-full border p-2 rounded-lg text-sm bg-gray-50 focus:bg-white outline-red-900" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Province</label>
              <input type="text" name="province" value={user?.user.province} onChange={handleInputChange} className="w-full border p-2 rounded-lg text-sm bg-gray-50 focus:bg-white outline-red-900" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">District</label>
              <input type="text" name="district" value={user?.user.district} onChange={handleInputChange} className="w-full border p-2 rounded-lg text-sm bg-gray-50 focus:bg-white outline-red-900" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">City</label>
              <input type="text" name="city" value={user?.user.city} onChange={handleInputChange} className="w-full border p-2 rounded-lg text-sm bg-gray-50 focus:bg-white outline-red-900" required />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-600 block mb-1">Street Address</label>
              <input type="text" name="streetAddress" value={user?.user.streetAddress} onChange={handleInputChange} className="w-full border p-2 rounded-lg text-sm bg-gray-50 focus:bg-white outline-red-900" required />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-4 pt-3 border-t">
            <button
              type="button"
              onClick={() => { setUser({ ...user }); setIsEditing(false); }}
              className="p-2 px-4 border rounded-xl text-gray-700 bg-white hover:bg-gray-100 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 p-2 px-5 rounded-xl bg-red-900 text-white font-semibold shadow hover:bg-red-800 text-sm"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Metrics Displays */}
          <div className="w-full max-w-2xl grid grid-cols-3 gap-3 border rounded-xl p-4 border-gray-200 bg-white shadow-sm">
            <div className="p-2 bg-white rounded-xl border border-gray-100 flex items-center flex-col shadow-sm text-center">
              <Calendar className="text-red-700 mb-1" size={20} />
              <span className="text-2xl font-bold text-red-900">{stats.campsOrganized}</span>
              <h1 className="text-[11px] font-medium text-gray-500 uppercase tracking-tight">Camps Held</h1>
            </div>
            <div className="p-2 bg-white rounded-xl border border-gray-100 flex items-center flex-col shadow-sm text-center">
              <AlertCircle className="text-orange-600 mb-1" size={20} />
              <span className="text-2xl font-bold text-red-900">{stats.emergencyRequests}</span>
              <h1 className="text-[11px] font-medium text-gray-500 uppercase tracking-tight">Emergencies</h1>
            </div>
            <div className="p-2 bg-white rounded-xl border border-gray-100 flex items-center flex-col shadow-sm text-center">
              <Users className="text-blue-700 mb-1" size={20} />
              <span className="text-2xl font-bold text-red-900">{stats.totalDonorsParticipated}</span>
              <h1 className="text-[11px] font-medium text-gray-500 uppercase tracking-tight">Donors Engaged</h1>
            </div>
          </div>

          {/* Hospital Specifications View */}
          <div className="flex flex-col bg-white border border-gray-200 rounded-2xl p-5 shadow-sm w-full max-w-2xl">
            <h2 className="text-md font-semibold mb-4 text-gray-800 border-b pb-2 border-gray-100">Hospital Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500">Contact Person</p>
                <p className="font-medium text-sm text-gray-800">{user?.user.contactPerson}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="font-medium text-sm text-gray-800 break-all">{user?.user.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="font-medium text-sm text-gray-800">{user?.user.phoneNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Province</p>
                <p className="font-medium text-sm text-gray-800">{user?.user.province}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Street Address</p>
                <p className="font-medium text-sm text-gray-800">{user?.user.streetAddress}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Account Type</p>
                <p className="font-medium text-sm text-red-900 capitalize">{user?.role || "Hospital"}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Settings / Action Area */}
      <div className="flex flex-col bg-white border border-gray-200 rounded-2xl p-5 shadow-sm w-full max-w-2xl">
        <div className="flex flex-row w-full text-md mb-3 border-b pb-2 border-gray-100">
          <h1 className="font-medium flex items-center gap-2"><Settings size={18}/> Hospital Management Settings</h1>
        </div>
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-3 p-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50 text-left">
            <Bell size={16} className="text-gray-500"/> Notification preferences (Emergency Broadcast alerts)
          </button>
          <button className="flex items-center gap-3 p-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50 text-left">
            <Shield size={16} className="text-gray-500"/> Institutional verification & Medical license documents
          </button>
        </div>
      </div>

      {/* Logout Action Button */}
      <button
        onClick={() => setLogout(true)}
        className="p-2 px-10 rounded-xl bg-red-900 text-white font-bold shadow-md cursor-pointer hover:bg-red-700 transition-all mb-10"
      >
        Logout Account
      </button>

      {/* Logout Dialog Modal */}
      {logout && (
        <div onClick={() => setLogout(false)} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl p-6 w-80 text-center shadow-lg">
            <h1 className="text-lg font-semibold mb-4 text-gray-800">Are you sure you want to logout?</h1>
            <div className="flex justify-center gap-4">
              <button onClick={() => navigate("/login")} className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-semibold">
                Yes, Logout
              </button>
              <button onClick={() => setLogout(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm font-semibold">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
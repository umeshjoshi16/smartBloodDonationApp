import { useState } from "react";
import { CircleAlert,XIcon,Copy, MessageCircle,Droplet, Heart, Phone, UserRoundPlus,Check} from "lucide-react";



export default function Emergency(){

  const [canDonate,setCanDonate]=useState(false);
  const[refer,setRefer]=useState(false);
  const [copied, setCopied] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
  `Namaste! A+ blood is urgently needed for Ramesh Karki at Bir Hospital, Kathmandu. 3 units required within 2 hours. Please contact: 9865759663. Respond here: http://192.168.1.66:6500/donor/emergency/jsjydgcd33yedg`
);
  const [healthStatus,setHealthStatus]=useState(false);

  const shareLink = `http://192.168.1.66:6500/donor/emergency/hewfd3y373`;

const handleCopy = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareLink);
  } else {
  
    const el = document.createElement("textarea");
    el.value = shareLink;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
  setCopied(true);
  setTimeout(() => setCopied(false), 10000);
};
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen ">
      <div className="flex flex-col gap-3 md:m-5 m-1 mb-20 ">
        <div className="flex items-center w-full mb-2">
          <h1 className="font-semibold text-lg">Emergency Blood Requests</h1>
        </div>
        <div className="flex flex-row items-start justify-start gap-5 border-b border-gray-300 p-2">
          <button className="border px-7 p-1.5 rounded-xl border-gray-200 font-medium bg-white cursor-pointer hover:bg-gray-200">
            All
          </button>
          <button className="border px-7 p-1.5 rounded-xl border-gray-200 font-medium bg-white cursor-pointer hover:bg-gray-200">
            Responded
          </button>
        </div>
        {
          canDonate&&(
            <div onClick={()=>{
              setCanDonate(false);
            }} className="fixed z-50 inset-0 bg-black/30 flex items-center justify-center overflow-hidden">
             <div  onClick={(e)=>{
      e.stopPropagation();
    }} className="rounded-xl flex flex-col w-full md:w-120 bg-white overflow-y-auto mt-6 md:mt-0">

      <div className="bg-red-900 flex flex-row items-center justify-self-stretch p-1 text-white w-full px-5 rounded-t-xl gap-5 h-15 ">
        <div className=" rounded-xl p-2 bg-white/30">
        <Droplet/>
        </div>

        <div className="flex flex-col items-start justify-center  ">
          <h1>Emergency Request</h1>
          


        </div>
        <button onClick={()=>{
              setCanDonate(false);
            }}  className="ml-auto  rounded-xl p-2 hover:bg-red-700 cursor-pointer">
      <XIcon/>
      </button>

      </div>

      <div className="flex flex-wrap gap-x-5  items-center justify-start w-full  p-2 px-5 text-sm ">
        <h1 className="text-yellow-500 font-medium ">
          
      ! Your profile information has been auto-filled. Please confirm before submitting.</h1>

         {/* name*/}
        <div className="flex flex-col w-55">
        <label className="text-sm font-medium text-gray-700 mb-1">Full Name*</label>
        <input
          type="text"
          placeholder="Enter your full name"
          defaultValue={'Umesh Joshi'}
          className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring "
        />
      </div>

       {/*phone number*/}
        <div className="flex flex-col w-55">
        <label className="text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
        <input
          type="text"
          placeholder="Enter your phone number"
          defaultValue={'98XXXXXXXX'}
          className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring "
        />
      </div>

       {/*blood*/}
        <div className="flex flex-col w-55">
        <label className="text-sm font-medium text-gray-700 mb-1">Blood Group*</label>
        <input
          type="text"
          placeholder="Enter your blood group"
          defaultValue={'O+'}
          className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring "
        />
      </div>

       {/*email*/}
        <div className="flex flex-col w-55">
        <label className="text-sm font-medium text-gray-700 mb-1">Email*</label>
        <input
          type="email"
          placeholder="Enter your email"
          defaultValue={'umesh@gmail.com'}
          className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring "
        />
      </div>

       {/*arrival time*/}
        <div className="flex flex-col w-55">
        <label className="text-sm font-medium text-gray-700 mb-1">How soon can you arrive?*</label>
        <input
          type="text"
          placeholder="Enter your arrival time"
        
          className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring-red-900 focus:ring "
        />
      </div>

       {/* Confirmation Checkbox */}
        <div className="flex items-start gap-3 my-3  border border-gray-200 w-full rounded-lg p-2 px-2">
          <input
            type="checkbox"
            checked={healthStatus}
             onChange={(e) => setHealthStatus(true)}
            className="w-4 h-4 mt-1 accent-red-700 cursor-pointer"
          />

          <label className="text-gray-700  cursor-pointer">
             I am healthy and can donate blood.
          </label>
        </div>

         {/* Button */}
        <div className="flex flex-row item-center justify-center my-5 m-1 gap-10 text-base">
    <button onClick={()=>{
      setCanDonate(false);
    }}  className="text-white bg-gray-700 p-2 rounded-lg px-7 cursor-pointer hover:bg-gray-500 ">Cancel</button>
    <button 
    disabled={!healthStatus}
    className={`px-7 py-2 rounded-lg text-white transition ${healthStatus
      ? "bg-red-900 hover:bg-red-700 cursor-pointer"
      : "bg-gray-400 cursor-not-allowed"
  }`}>Submit</button>
</div>
      

      </div>

      

        

      </div>
      
      </div>

            
          )
        }

        {
  refer && (
    <div
      onClick={() => setRefer(false)}
      className="fixed z-50 inset-0 bg-black/30 flex items-center justify-center overflow-hidden"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-xl flex flex-col w-full  md:w-120 bg-white overflow-y-auto mt-6 md:mt-0"
      >
        {/* Header */}
        <div className="bg-red-900 flex flex-row items-center p-1 text-white w-full px-5 rounded-t-xl gap-5 h-15">
          <div className="rounded-xl p-2 bg-white/30">
            <UserRoundPlus />
          </div>
          <div className="flex flex-col items-start justify-center">
            <h1>Refer Someone</h1>
          </div>
          <button
            onClick={() => setRefer(false)}
            className="ml-auto rounded-xl p-2 hover:bg-red-700 cursor-pointer"
          >
            <XIcon />
          </button>
        </div>

        
        <div className="flex flex-col gap-4 p-5 text-sm">

          {/* request data */}
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-3">
            <Droplet size={16} className="text-red-700 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-red-900">A+ blood needed · Bir Hospital, Kathmandu</p>
              <p className="text-red-700 text-xs mt-0.5">Ramesh Karki · within 2 hrs · 3 units required</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Their phone number*</label>
            <input
              type="tel"
              placeholder="98XXXXXXXX"
               value={phone}
                onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring focus:ring-red-900"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Message to send</label>
            <textarea
              rows={4}
              value={message}
  onChange={(e) => setMessage(e.target.value)}
            
              className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-0 focus:ring focus:ring-red-900 resize-none text-sm leading-relaxed"
            />
          </div>

          {/* Sharelink */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Or share the link directly</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareLink}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-500 outline-0 text-sm"
              />

             <button
  onClick={handleCopy}
  className={`flex items-center gap-1 px-3 py-2 border rounded-lg cursor-pointer text-sm transition ${
  copied
    ? "bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
    : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
}`}>{copied ? (<><Check size={14} className="text-green-600" /> Copied</>
  ) : (
    <>
      <Copy size={14} /> Copy
    </>
  )}
</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-center justify-between md:justify-center md:gap-5 mt-2 text-sm">
            <button
              onClick={() => setRefer(false)}
              className="text-white bg-gray-700 p-2 rounded-lg px-7 cursor-pointer hover:bg-gray-500"
            >
              Cancel
            </button>
           
              <button onClick={() => window.open(`sms:${phone}?body=${encodeURIComponent(message)}`)} className="flex items-center  px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500 cursor-pointer transition">
                <MessageCircle size={16} /> SMS
              </button>

              <button onClick={() => window.open(`https://wa.me/977${phone}?text=${encodeURIComponent(message)}`)} className="flex items-center  px-5 py-2 rounded-lg text-white bg-green-600 hover:bg-green-500 cursor-pointer transition">
                <MessageCircle size={16} /> WhatsApp
              </button>
            
          </div>

        </div>
      </div>
    </div>
  )
}

        <div className="flex flex-wrap gap-5">
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
    </div>
  );
  
}
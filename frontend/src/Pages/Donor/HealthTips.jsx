import { useState } from "react";
import { ChevronDown,  ChevronLeft,ChevronUp, Droplet, Heart, Apple, Sun, Snowflake, BookOpen, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const tips = [
  {
    category: "Before Donation",
    icon: Apple,
    items: [
      {
        title: "Eat iron-rich foods the night before",
        body: "Have lentils, spinach, beans, or red meat the evening before your donation. Iron-rich blood makes you a better donor and reduces dizziness.",
      },
      {
        title: "Drink plenty of water",
        body: "Drink at least 500ml of water 2 hours before donating. Well-hydrated blood flows faster and makes the donation process smoother.",
      },
      {
        title: "Avoid alcohol for 24 hours",
        body: "Alcohol dehydrates your body and thins your blood. Avoid it at least 24 hours before donation to ensure your blood is safe and healthy.",
      },
      {
        title: "Skip fatty foods before donation",
        body: "Fatty meals cause lipemia — fat particles in blood — which can make your donation unusable for certain patients. Eat light on donation day.",
      },
      {
        title: "Sleep at least 7 hours",
        body: "A well-rested body handles blood loss better. Poor sleep raises cortisol which can affect your blood pressure and heart rate at screening.",
      },
      {
        title: "Avoid heavy exercise",
        body: "Skip intense workouts on donation day. Exercise raises your heart rate and blood pressure, which may disqualify you at screening.",
      },
    ],
  },
  {
    category: "After Donation",
    icon: Heart,
    items: [
      {
        title: "Eat iron-rich foods immediately",
        body: "Your body loses iron with every donation. Eat lentils, chickpeas, meat, or leafy greens within a few hours to start replenishing.",
      },
      {
        title: "Stay seated for 10–15 minutes",
        body: "Don't rush to stand up after donating. Sit quietly and let your body adjust. Dizziness is common if you stand too quickly.",
      },
      {
        title: "Keep the bandage on for 4 hours",
        body: "The puncture site needs time to fully clot. Removing the bandage too early can cause bruising or minor bleeding.",
      },
      {
        title: "Avoid heavy lifting for 24 hours",
        body: "Your arm muscle is recovering from the needle. Heavy lifting or strenuous activity can cause the site to bruise or reopen.",
      },
      {
        title: "Drink extra fluids",
        body: "Drink 4–6 extra glasses of water or juice over the next 24 hours. This helps your body replace plasma volume quickly.",
      },
      {
        title: "If you feel dizzy, lie down",
        body: "Dizziness after donation is normal. Lie flat, raise your legs above heart level, and breathe slowly. It passes within minutes.",
      },
    ],
  },
  {
    category: "General Blood Health",
    icon: Droplet,
    items: [
      {
        title: "Foods that improve blood quality",
        body: "Pomegranate, beetroot, spinach, and dates are known to boost hemoglobin. Include them regularly to maintain donation eligibility.",
      },
      {
        title: "How smoking affects your blood",
        body: "Smoking reduces oxygen in your blood and increases carbon monoxide levels. Frequent smokers often have lower hemoglobin, making them ineligible.",
      },
      {
        title: "Signs of iron deficiency",
        body: "Fatigue, pale skin, shortness of breath, and frequent headaches are warning signs. Low iron is the #1 reason donors get deferred in Nepal.",
      },
      {
        title: "Why stress affects donation",
        body: "High stress raises cortisol and blood pressure. Chronic stress can make you temporarily ineligible. Practice deep breathing before your appointment.",
      },
      {
        title: "Hydration and blood viscosity",
        body: "Dehydrated blood is thicker and harder to draw. Donors who drink enough water have shorter donation times and fewer complications.",
      },
    ],
  },
  {
    category: "Donation Facts",
    icon: BookOpen,
    items: [
      {
        title: "One donation saves up to 3 lives",
        body: "Your donated blood is separated into red cells, plasma, and platelets — each going to a different patient in need.",
      },
      {
        title: "You can donate every 90 days",
        body: "Whole blood donors must wait 90 days (3 months) between donations. Your body fully replenishes red blood cells within 4–6 weeks.",
      },
      {
        title: "O− is the universal donor",
        body: "O negative blood can be given to anyone in an emergency, regardless of blood type. It is critically needed in trauma and newborn care.",
      },
      {
        title: "AB+ is the universal plasma donor",
        body: "AB positive donors can donate plasma to any patient. Plasma carries clotting factors and proteins vital for surgery patients.",
      },
      {
        title: "Blood banks run low in summer",
        body: "Donation rates drop in Nepal during exam seasons and summer heat. These are the most critical times to donate.",
      },
      {
        title: "Minimum hemoglobin to donate",
        body: "Men need at least 13.5 g/dL and women need 12.5 g/dL of hemoglobin to donate. Eat iron-rich foods regularly to stay eligible.",
      },
    ],
  },
  {
    category: "Seasonal Tips",
    icon: Sun,
    items: [
      {
        title: "Summer: stay cool after donation",
        body: "In hot weather, blood pressure can drop faster after donation. Rest in a cool place, drink cold water, and avoid direct sunlight immediately after.",
      },
      {
        title: "Summer: blood banks run critically low",
        body: "Festivals, exams, and heat reduce donation rates in summer. This is when hospitals need you most — consider scheduling a summer donation.",
      },
      {
        title: "Winter: warm up before donating",
        body: "Cold weather constricts veins, making blood draw harder. Warm your arm with a heat pack or warm water before arriving at the donation center.",
      },
      {
        title: "Monsoon: watch for infections",
        body: "Monsoon brings waterborne illnesses. If you had fever, vomiting, or diarrhea recently, wait at least 2 weeks before donating.",
      },
      {
        title: "Festival seasons: plan ahead",
        body: "During Dashain and Tihar, blood banks in Nepal face severe shortages. Schedule your donation a week before festivals begin.",
      },
    ],
  },
  {
    category: "Women's Health",
    icon: Snowflake,
    items: [
      {
        title: "Do not donate during menstruation",
        body: "Donating during your period adds stress to your body and increases the risk of anemia. Wait until your cycle ends before donating.",
      },
      {
        title: "Iron needs are higher for women",
        body: "Women lose iron monthly through menstruation. Supplement with iron-rich foods consistently to stay above the 12.5 g/dL donation threshold.",
      },
      {
        title: "Pregnancy and breastfeeding",
        body: "Do not donate blood during pregnancy or for 6 months after delivery. Breastfeeding mothers should also wait until they have fully weaned.",
      },
      {
        title: "Best time to donate in your cycle",
        body: "The best window is 5–10 days after your period ends. Your hemoglobin is usually at its highest and your body handles donation best.",
      },
    ],
  },
];

export default function HealthTips() {
  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = useState(null);
  const [openTip, setOpenTip] = useState(null);

  const toggleCategory = (cat) => {
    setOpenCategory(openCategory === cat ? null : cat);
    setOpenTip(null);
  };

  const toggleTip = (tip) => {
    setOpenTip(openTip === tip ? null : tip);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden pb-24 roboto-slab-body">

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 px-5 py-4 w-full sticky top-0 z-40 shadow-sm flex flex-row items-center ">
        <div>
        <h1 className="font-bold text-gray-800 text-xl">Health Tips</h1>
        <p className="text-xs text-gray-400 mt-0.5 ">Everything you need to know about healthy donation</p>

        </div>
        <button onClick={()=>{
          navigate('/donor');
        }} className="ml-auto text-gray-500 hover:text-black hover:font-bold cursor-pointer rounded-xl hover:bg-red-100 p-2">
          <ChevronLeft />
        

        </button>
        

        
      </div>

      {/* INTRO BANNER */}
      <div className="px-5 pt-5">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 w-full md:w-200">
          <Droplet size={18} className="text-red-900 shrink-0 mt-0.5 " />
          <div>
            <p className="text-md font-semibold text-red-900">Why health tips matter</p>
            <p className="text-sm text-red-400 mt-1 leading-relaxed">
              Healthy donors give better blood. These tips help you stay eligible, donate safely, and recover faster.
            </p>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="px-5 mt-5 flex flex-col gap-3 w-full md:w-200">
        {tips.map(({ category, icon: Icon, color, iconColor, items }) => (
          <div key={category} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category)}
              className="w-full  flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center border border-blue-400 shrink-0 bg-blue-50 ">
                <Icon size={15} className="text-blue-900" />
              </div>
              <p className="text-sm font-medium text-gray-800 flex-1 text-left">{category}</p>
              <span className="text-xs text-gray-400 mr-2">{items.length} tips</span>
              {openCategory === category
                ? <ChevronUp size={16} className="text-gray-400 shrink-0" />
                : <ChevronDown size={16} className="text-gray-400 shrink-0" />
              }
            </button>

            {/* Tips inside category */}
            {openCategory === category && (
              <div className="border-t border-gray-100 divide-y divide-gray-100">
                {items.map(({ title, body }) => (
                  <div key={title}>
                    <button
                      onClick={() => toggleTip(title)}
                      className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition text-left"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-red-900 shrink-0 ml-1"></div>
                      <p className="text-sm text-gray-700 flex-1">{title}</p>
                      {openTip === title
                        ? <ChevronUp size={14} className="text-gray-300 shrink-0" />
                        : <ChevronDown size={14} className="text-gray-300 shrink-0" />
                      }
                    </button>

                    {openTip === title && (
                      <div className="px-4 pb-3">
                        <p className="text-xs text-gray-500 leading-relaxed pl-4 border-l-2 border-red-200">
                          {body}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}
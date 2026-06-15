import { useState } from "react";

export default function HealthTools() {
 
  const [hgb, setHgb] = useState("");
  const [weight, setWeight] = useState("");

  const [height, setHeight] = useState("");
  const [bodyWeight, setBodyWeight] = useState("");

  const [bpSys, setBpSys] = useState("");
  const [bpDia, setBpDia] = useState("");
  const [heartRate, setHeartRate] = useState("");

  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);


  const getEligibility = () => {
    if (!hgb || !weight) return "";
    if (hgb >= 12.5 && weight >= 50) return "Eligible 🟢";
    return "Not Eligible 🔴";
  };

  const bmi = () => {
    if (!height || !bodyWeight) return "";
    const h = height / 100;
    return (bodyWeight / (h * h)).toFixed(2);
  };

  const bmiCategory = () => {
    const val = bmi();
    if (!val) return "";
    if (val < 18.5) return "Underweight";
    if (val < 25) return "Normal";
    if (val < 30) return "Overweight";
    return "Obese";
  };

  const bodyFat = () => {
    if (!bmi()) return "";
    return (1.2 * bmi() + 0.23 * 25 - 5.4).toFixed(2);
  };

  const leanBodyMass = () => {
    if (!bodyWeight || !bmi()) return "";
    return (bodyWeight * (1 - bodyFat() / 100)).toFixed(2);
  };

  const bpStatus = () => {
    if (!bpSys || !bpDia) return "";
    if (bpSys < 120 && bpDia < 80) return "Normal 🟢";
    if (bpSys < 140) return "Elevated 🟡";
    return "High 🔴";
  };

  const hrZone = () => {
    if (!heartRate) return "";
    if (heartRate < 60) return "Low";
    if (heartRate <= 100) return "Normal";
    return "High";
  };

  const nextPeriod = () => {
    if (!lastPeriod) return "";
    const d = new Date(lastPeriod);
    d.setDate(d.getDate() + Number(cycleLength));
    return d.toDateString();
  };

  
  const Card = ({ title, children }) => (
    <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-50">
      <h2 className="text-lg font-bold text-red-900 mb-4">{title}</h2>
      {children}
    </div>
  );

  const Input = (props) => (
    <input
      {...props}
      className="w-full mb-3 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
    />
  );


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-red-900 mb-6">
         Health Tools Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

       
        <Card title="🩸 Donation Readiness">
          <Input
            placeholder="Hemoglobin (g/dL)"
            value={hgb}
            onChange={(e) => setHgb(e.target.value)}
          />
          <Input
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <p className="font-semibold text-red-800">{getEligibility()}</p>
        </Card>

        
        <Card title="📊 Body Metrics">
          <Input
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <Input
            placeholder="Weight (kg)"
            value={bodyWeight}
            onChange={(e) => setBodyWeight(e.target.value)}
          />

          <p>BMI: <b>{bmi()}</b></p>
          <p>Category: <b>{bmiCategory()}</b></p>
          <p>Body Fat: <b>{bodyFat()}</b>%</p>
          <p>Lean Mass: <b>{leanBodyMass()}</b> kg</p>
        </Card>

       
        <Card title="❤️ Vitals">
          <Input
            placeholder="Systolic BP"
            value={bpSys}
            onChange={(e) => setBpSys(e.target.value)}
          />
          <Input
            placeholder="Diastolic BP"
            value={bpDia}
            onChange={(e) => setBpDia(e.target.value)}
          />
          <p>BP Status: <b>{bpStatus()}</b></p>

          <Input
            placeholder="Heart Rate"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
          />
          <p>Heart Rate: <b>{hrZone()}</b></p>
        </Card>

       
        <Card title="🌸 Women Health">
          <Input
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
          />
          <Input
            placeholder="Cycle length (days)"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
          />
          <p>Next Period: <b>{nextPeriod()}</b></p>
          <p className="text-red-800 font-medium">
            💧 Drink 2.5–3L water daily
          </p>
        </Card>

      </div>
    </div>
  );
}
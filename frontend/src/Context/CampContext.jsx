import { createContext,useState } from "react";

export const CampContext=createContext();

export function CampProvider({children}){
  const[emergencyData,setEmergencyData]=useState(null);
  const[campData,setCampData]=useState(null);

return(
   <CampContext.Provider
      value={{
        emergencyData,
        campData,
        setEmergencyData,
        setCampData
      }}
    >
      {children}
    </CampContext.Provider>
);
}


import { createContext,useState } from "react";

export const AuthContext=createContext();

export function AuthProvider({children}){
  const[user,setUser]=useState(null);
  const[authenticated,setAuthenticated]=useState(false);

return(
   <AuthContext.Provider
      value={{
        user,
        setUser,
        authenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
);
}


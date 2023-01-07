import React, { createContext, useEffect, useState } from "react";
import { storageService } from "../auth/storageService";

export interface userAuth {
  userId: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  token: string | null;
  picture: string | null;
}
// export interface authType {
//   auth: boolean;
//   jwt: string | null;
// }
export interface authContextType {
  auth: userAuth;
  setAuth: (value: userAuth) => void;
  onLogin: (auth: userAuth) => void;
  clearAuth: () => void;
}

export const AuthContext = createContext<authContextType | null>(null);

const initialState = {
  userId: "",
  email: "",
  firstName: "",
  lastName: "",
  token: "",
  picture: "",
}

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [auth, setAuth] = useState<userAuth>(initialState as userAuth);


  const onLogin = (auth: userAuth) => {
    if (!auth.userId) return
    storageService.setData(auth)
    // setAuth(prev => ({...prev, auth}))
    setAuth(auth)
  }

  const clearAuth = () => {
    setAuth(initialState)
    storageService.removeData()
  }

  useEffect(() => {
    const data = storageService.getData()
    if (!Boolean(auth?.token) && data?.token) {
      setAuth(data)
    }
  }, [auth])
  
  return (
    <AuthContext.Provider value={{auth, setAuth, onLogin, clearAuth}}>
      {children}
    </AuthContext.Provider>);
};

import React, { useContext, useState, createContext } from 'react';

export const AuthContext = createContext();

export default function Authprovider({ children }) {

  // ✅ FIXED KEY
  const initialAuthUser = localStorage.getItem("user");

  const [authUser, setAuthUser] = useState(
    initialAuthUser ? JSON.parse(initialAuthUser) : null
  );

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
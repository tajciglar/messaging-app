import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Define the context and types
interface AuthContextType {
  isLoggedIn: boolean;
  logIn: (token: string) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false); 
  }, []); 

  const logIn = (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

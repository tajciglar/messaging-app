import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
  isLoggedIn: boolean;
  logIn: (token: string) => void;
  logOut: () => void;
  user: string | null;
}

interface TokenPayload {
  id: number;
  name: string;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); 
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setUser(decoded.name);
        const { exp } = decoded;

        if (exp && Date.now() >= exp * 1000) {
          if (isLoggedIn) {
            logOut();
            alert("Session expired. Please log in again.");
          }
          return;
        }

        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        logOut(); 
      }
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
}, [isLoggedIn]);

  const logIn = (token: string) => {
    const decodedToken = jwtDecode<TokenPayload>(token);
    setUser(decodedToken.name);
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
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut, user }}>
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

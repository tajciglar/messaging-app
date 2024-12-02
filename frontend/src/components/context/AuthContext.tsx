import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: number;
  name: string;
  exp: number;
}

interface AuthContextType {
  isLoggedIn: boolean;
  logIn: (token: string) => void;
  logOut: () => void;
  user: { id: number; name: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
          logOut();
          alert("Session expired. Please log in again.");
        } else {
          setUser({ id: decoded.id, name: decoded.name });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logOut();
      }
    }
    setLoading(false);
  }, []);

  const logIn = (token: string) => {
    try {
      const decodedToken = jwtDecode<TokenPayload>(token);
      setUser({ id: decodedToken.id, name: decodedToken.name });
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Replace with your loading spinner/UI
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

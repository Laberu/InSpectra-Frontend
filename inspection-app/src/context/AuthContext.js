"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accesstoken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true); // NEW: loading state

  useEffect(() => {
    const storedToken = localStorage.getItem("accesstoken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedToken !== "undefined") {
      setAccessToken(storedToken);
    }

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("user");
      }
    }

    setLoading(false); // NEW: done loading
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setAccessToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accesstoken", token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accesstoken");
  };

  return (
    <AuthContext.Provider value={{ user, accesstoken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

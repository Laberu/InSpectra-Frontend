// src/context/AuthContext.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accesstoken, setAccessToken] = useState(null);

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
    <AuthContext.Provider value={{ user, accesstoken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

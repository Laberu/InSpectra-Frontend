// src/context/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for token on load to persist the session
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/me', { method: 'GET', credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (res.ok) {
      const data = await res.json();
      setUser({ email });
      router.push('/');
    } else {
      alert("Invalid login credentials");
    }
  };

  const logout = () => {
    document.cookie = 'token=; Max-Age=0'; // Clear the cookie
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// src/AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [storedFarmer, setStoredFarmer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read farmer login from localStorage once on mount
    const saved = localStorage.getItem("farmer");
    if (saved) {
      setStoredFarmer(JSON.parse(saved));
    } else {
      setStoredFarmer(null);
    }
    setLoading(false); // finished loading auth info
  }, []);

  // login function: save to localStorage and update state
  const login = (farmerData) => {
    localStorage.setItem("farmer", JSON.stringify(farmerData));
    setStoredFarmer(farmerData);
  };

  // logout function: remove from localStorage and reset state
  const logout = () => {
    localStorage.removeItem("farmer");
    setStoredFarmer(null);
  };

  return (
    <AuthContext.Provider value={{ storedFarmer, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

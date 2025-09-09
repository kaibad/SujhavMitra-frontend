import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { API_BASE } from "../services/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user/token from localStorage safely
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserStr = localStorage.getItem("user");
    let storedUser = null;

    try {
      if (storedUserStr && storedUserStr !== "undefined") {
        storedUser = JSON.parse(storedUserStr);
      }
    } catch (err) {
      console.warn("Failed to parse stored user:", err);
      storedUser = null;
    }

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, password }),
      });

      const dataText = await response.text(); // read as text first
      let data;
      try {
        data = dataText ? JSON.parse(dataText) : {};
      } catch {
        data = {};
      }

      if (response.ok && data.token) {
        // Decode JWT to get user info (if backend sends payload)
        let userData = null;
        try {
          const tokenPayload = JSON.parse(atob(data.token.split(".")[1]));
          userData = tokenPayload.payload || null;
        } catch {
          userData = null;
        }

        setToken(data.token);
        setUser(userData);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        return { success: true };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (err) {
      console.error("Login network error:", err);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  // SIGNUP
  const signup = async (userData) => {
    try {
      const response = await fetch(`${API_BASE}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(userData),
      });

      const dataText = await response.text();
      let data;
      try {
        data = dataText ? JSON.parse(dataText) : {};
      } catch {
        data = {};
      }

      return response.ok
        ? { success: true, message: data.message || "Signup successful" }
        : { success: false, message: data.error || "Signup failed" };
    } catch (err) {
      console.error("Signup network error:", err);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

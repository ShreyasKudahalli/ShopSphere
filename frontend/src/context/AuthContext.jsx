import { useState, useEffect, createContext } from "react";
import api from "../api/axios";


export const AuthContext = createContext();
export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("access")) {
            myinfo();
        }
    }, []);

    async function myinfo() {
        try {
            const response = await api.get("accounts/me/",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                }
            });
            setUser(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function login(email, password) {
        try{
            const response = await api.post("accounts/login/", {
                email,
                password,
            });
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            await myinfo();
        }
        catch(error) {
            console.log(error.response.data);
            throw error
        }
    }

    async function signup(email, password, username) {

        try {
            const response = await api.post("accounts/register/", {
                email,
                password,
                username,
            });

            console.log(response.data);

        } catch (error) {
            if (error.response) {
                // Django returned a validation error (400, etc.)
                throw error.response.data;
            } else {
                // Backend not running / network error
                throw new Error("Registration failed. Please try again.");
            }
        }
    }
    
    async function logout() {
    const refreshToken = localStorage.getItem("refresh");

    try {
      // Send refresh token to backend to blacklist it
      if (refreshToken) {
        await api.post(
          "accounts/logout/",
          { refresh: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      // Even if backend fails, we still clear local tokens
    } finally {
      // Always clear local tokens and user state
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setUser(null);
    }
  }

    return (
        <AuthContext.Provider value={{ signup, login, myinfo, user, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
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
            console.log(error.response.data);
        }
    }

    return (
        <AuthContext.Provider value={{ signup, login, myinfo, user }}>
            {children}
        </AuthContext.Provider>
    )
}
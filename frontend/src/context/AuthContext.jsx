import { createContext,useContext,useEffect,useState } from "react";
import axios from "../config/axios"

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
       const checkAuth = async () => {
            try {
                const res = await axios.get("/api/auth/me");
                setUser(res.data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

  const signup = (data) => axios.post("/api/auth/signup", data);

   const login = async (data) => {
    const res = await axios.post("/api/auth/login", data);
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth=()=>useContext(AuthContext);

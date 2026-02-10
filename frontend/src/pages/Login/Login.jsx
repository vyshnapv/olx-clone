import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css"

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const { login } = useAuth();
    const navigate=useNavigate()

    const handleLogin=async()=>{
       if (!email || !password) {
         alert("Enter email and password");
         return;
       }
        try{
           await login({ email, password });
           navigate("/")
        }catch(err){
           alert("Invalid email or password")
        }
    }
    return(
        <div className="login-wrapper">
          <div className="login-box">
            <img
              src="https://statics.olx.in/external/base/img/loginEntryPointPost.webp"
              alt="OLX"
            />

            <h3>Welcome to OLX</h3>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
     
             <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
             />

             <div className="login-option" onClick={handleLogin}>
              Login
             </div>

             <p onClick={() => navigate("/signup")}>
                New to OLX? Create an account
             </p>
          </div>
        </div>
    )
}

export default Login;
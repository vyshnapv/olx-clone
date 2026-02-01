import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css"

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const navigate=useNavigate()

    const handleLogin=async()=>{
        try{
           await signInWithEmailAndPassword(auth,email,password)
           navigate("/")
        }catch(err){
           alert(err.message)
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
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
     
             <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
             />

             <div className="login-option" onClick={handleLogin}>
              Login
             </div>

             <p
               style={{ marginTop: "12px", cursor: "pointer", fontSize: "14px" }}
               onClick={() => navigate("/signup")}
             >
               New to OLX? Create an account
             </p>

          </div>
        </div>
    )
}

export default Login;
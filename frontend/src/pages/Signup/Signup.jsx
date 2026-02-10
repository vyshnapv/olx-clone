import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Signup.css";

const Signup = () => {
  const { signup } = useAuth(); 
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await signup({
        name: username,
        email,
        password,
      });

      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message || "Signup failed. Try again."
      );
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <img
          src="https://statics.olx.in/external/base/img/loginEntryPointPost.webp"
          alt="OLX"
        />

        <h3>Create your OLX account</h3>

         <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
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

        <div className="login-option" onClick={handleSignup}>
          Sign Up
        </div>

        <p onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default Signup;

//login.jsx
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
       if (!email || !password) {
         alert("Enter email and password");
         return;
       }
        try{
           await signInWithEmailAndPassword(auth,email,password)
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

//signup.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword,updateProfile  } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      const res=await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName: username,
      });

      navigate("/");

    } catch (err) {
      alert(err.message);
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

//App.jsx
import { Routes,Route } from "react-router-dom";
import Header from "./components/Header/Header"
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import PostAd from "./pages/PostAd/PostAd";
import MyAds from "./pages/MyAds/MyAds";
import Signup from "./pages/Signup/Signup";

const App=()=>{
  return(
    <>
     <Header/>
       <div style={{paddingTop:"68px"}}>
          <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/login" element={<Login/>}/>
             <Route path="/signup" element={<Signup />} />
             <Route path="/product/:id" element={<ProductDetail/>}/>

             <Route 
                path="/post-ad" 
                element={
                 <ProtectedRoute>
                    <PostAd/>
                 </ProtectedRoute>
                }/>

             <Route 
                path="/my-ads" 
                element={
                 <ProtectedRoute>
                    <MyAds/>
                 </ProtectedRoute>
                }/>
          </Routes>
       </div>
    </>
  )
}

export default App;

//firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

//.env
VITE_CLOUDINARY_CLOUD_NAME=dwwfvh49i
VITE_CLOUDINARY_UPLOAD_PRESET=olx_unsigned_upload
VITE_API_URL=http://localhost:5000

VITE_FIREBASE_API_KEY=AIzaSyAEIJDAJnrdSCvYaX2SM-n8nwc_JArae9s
VITE_FIREBASE_AUTH_DOMAIN=olx-clone-9ab7f.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=olx-clone-9ab7f
VITE_FIREBASE_STORAGE_BUCKET=olx-clone-9ab7f.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=525708417964
VITE_FIREBASE_APP_ID=1:525708417964:web:76d56ed73a8ebafd2ab809
VITE_FIREBASE_MEASUREMENT_ID=G-8Y4BV58BLK

//AuthContext.jsx
import { createContext,useContext,useEffect,useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged,signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const unsub=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false)
        })
        return ()=>unsub();
    },[])

    const logout = async () => {
      await signOut(auth);
      navigate("/login");
    };

    return(
        <AuthContext.Provider value={{user,logout}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext);

//api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default API_BASE_URL;

//Header.jsx
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";
import olxLogo from "../../assets/OLX_New_Logo.png"
import "./Header.css"

const Header=()=>{
    const {user,logout}=useAuth();
    const navigate=useNavigate()

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return(
       <header className="olx-header">
          <div className="header-left">
            <img 
              src={olxLogo}
              alt="OLX" 
              className="olx-logo"
              onClick={()=>navigate("/")}
            />

            <div className="location-box">
               <span> 📍 </span>
               <input placeholder="India" />
            </div>
          </div>

          <div className="header-center">
             <input placeholder="Find Cars, Mobile Phones and more..." />
             <button>🔍</button>
          </div>

          <div className="header-right">
             {user ? (
                <>
                  <span className="username">
                    {user.displayName || user.email}
                  </span>
                  <span className="logout" onClick={logout}>Logout</span>
                </>
             ):(
                <span
                  className="login-text"
                  onClick={()=>navigate("/login")}
                >
                   Login 
                </span>
             )
             }

             <button
              className="sell-btn"
              onClick={()=>navigate("/post-ad")}
             >
              <span>+</span>SELL
             </button>
          </div>
       </header>
    )
}

export default Header;

//Home.jsx
import {useState,useEffect} from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { useSearchParams } from "react-router-dom";
import Categories from "../Categories/Categories";
import ProductCard from "../../components/productCard/ProductCard";
import "./Home.css"

const Home=()=>{
    const [products,setProducts]=useState([]);
    const [loading, setLoading] = useState(true); 
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

     useEffect(() => {
        axios
            .get(`${API_BASE_URL}/api/products`)
            .then((res) => {
                let filteredProducts = res.data;
                
                if (category) {
                    filteredProducts = res.data.filter(
                        (product) => product.category === category
                    );
                }
                
                setProducts(filteredProducts);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [category]);


    return(
        <>
          <Categories />
            <div className="home-container">
                <h2>
                    {category ? `${category}` : "Fresh recommendations"}
                </h2>
                {loading && <p>Loading ads...</p>}
                {!loading && products.length === 0 && (
                    <p>No products found in this category.</p>
                )}
                {!loading && products.length > 0 && (
                    <div className="product-grid">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Home;

//.env in backend
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/olx-clone

CLOUDINARY_CLOUD_NAME=dwwfvh49i
CLOUDINARY_API_KEY=932839436544411
CLOUDINARY_API_SECRET=NCyXD6kz_N5HwWmuQ0awwBUPsbE

//server.js
const express=require("express");
const cors=require("cors")
const mongoose=require("mongoose")
require("dotenv").config();

const productRoutes=require("./routes/productRoutes")

const app=express();

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>console.log("Mongo error:", err))

app.use("/api/products",productRoutes)

app.get("/",(req,res)=>{
    res.send("OLX Backend Running")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

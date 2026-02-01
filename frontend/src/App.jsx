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
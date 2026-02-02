import {useEffect,useState} from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyAds=()=>{
    const {user}=useAuth();
    const [ads,setAds]=useState([]);
    const navigate=useNavigate();

    const fetchAds=()=>{
        axios  
          .get(`http://localhost:5000/api/products/user/${user.uid}`)
          .then((res)=>setAds(res.data));
    };

    useEffect(()=>{
        fetchAds();
    },[])

    const deleteAd=async(id)=>{
        await axios.delete(`http://localhost:5000/api/products/${id}`)
        fetchAds();
    }

    return(
        <div style={{padding:"24px"}}>
          <h2>My Ads</h2>

          {ads.map((ad)=>(
           <div
             key={ad._id}
             style={{
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                padding: "12px",
                marginBottom: "12px",
             }}
           >
            <span>{ad.title}</span>
            <button onClick={() => navigate("/post-ad", { state: ad })}>
              Edit
            </button>
            <button onClick={() => deleteAd(ad._id)}>Delete</button>
            </div>
          ))}
        </div>
    )
}

export default MyAds;
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import {useAuth} from "../../context/AuthContext"
import { useLocation,useNavigate  } from "react-router-dom";
import "./PostAd.css"

const PostAd=()=>{
    const {user}=useAuth();
    const { state } = useLocation();
    const navigate=useNavigate()

    const [formData, setFormData] = useState({
      title: state?.title || "",
      price: state?.price || "",
      category: state?.category || "",
      description: state?.description || "",
      location: state?.location || "",
    });

    const [image,setImage]=useState(null);

    const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async () => {
      try {
        if (!state && !image) {
            alert("Please select an image");
            return;
        }

        if (!formData.title || !formData.price) {
            alert("Please fill in all required fields");
            return;
        }

        let imageUrl = state?.image;

        if (image) {
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

          const cloudRes = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            data
          );

          imageUrl = cloudRes.data.secure_url;
        }

        if (state) {
          await axios.put(
            `${API_BASE_URL}/api/products/${state._id}`,
            { ...formData, image: imageUrl }
          );
        } else {
          await axios.post(`${API_BASE_URL}/api/products`, {
            ...formData,
            image: imageUrl,
            userId: user.uid,
          });
        }

        alert("Ad saved successfully");
        navigate("/my-ads");
      } catch (error) {
        alert("Error saving ad: " + error.message);
      }
  };

    return(
        <div className="post-ad">
           <h2>Post Your Ad</h2>

           <input name="title" placeholder="Title" value={formData.title} onChange={handleChange}/>
           <input name="price" placeholder="Price" value={formData.price} onChange={handleChange}/>
           <input name="category" placeholder="Category" value={formData.category} onChange={handleChange}/>
           <input name="location" placeholder="Location" value={formData.location} onChange={handleChange}/>
           <textarea
             name="description"
             placeholder="Description"
             value={formData.description}
             onChange={handleChange}
           />

           <input type="file" onChange={(e)=>setImage(e.target.files[0])} />

           <button onClick={handleSubmit}>Post Ad</button>
        </div>
    )
}

export default PostAd;


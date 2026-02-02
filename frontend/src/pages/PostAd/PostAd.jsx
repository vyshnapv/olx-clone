import { useState } from "react";
import axios from "axios"
import {useAuth} from "../../context/AuthContext"
import { useLocation } from "react-router-dom";
import "./PostAd.css"

const PostAd=()=>{
    const {user}=useAuth();
    const { state } = useLocation();

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
          `http://localhost:5000/api/products/${state._id}`,
           { ...formData, image: imageUrl }
        );
      } else {
        await axios.post("http://localhost:5000/api/products", {
           ...formData,
           image: imageUrl,
           userId: user.uid,
        });
      }

     alert("Ad saved successfully");
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
             onChange={handleChange}
           />

           <input type="file" onChange={(e)=>setImage(e.target.files[0])} />

           <button onClick={handleSubmit}>Post Ad</button>
        </div>
    )
}

export default PostAd;


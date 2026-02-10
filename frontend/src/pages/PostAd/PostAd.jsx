import { useState,useEffect } from "react";
import axios from "../../config/axios";
import { useNavigate ,useLocation} from "react-router-dom";
import "./PostAd.css";

const PostAd = () => {
  const navigate = useNavigate();
  const location=useLocation()
  const editData=location.state;

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    location: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview,setImagePreview]=useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        price: editData.price || "",
        category: editData.category || "",
        description: editData.description || "",
        location: editData.location || "",
      });
      setImagePreview(editData.image);
    }
  }, [editData]);

  useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (imagePreview && imagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreview);
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.title || !formData.price || !formData.category) {
        alert("Please fill all required fields");
        return;
      }

      if (!image && !editData) {
        alert("Please select an image");
        return;
      }

      setLoading(true);

      const data = new FormData();
      Object.keys(formData).forEach((key) =>
        data.append(key, formData[key])
      );

      if (image) {
        data.append("image", image);
      }

     if (editData) {
        await axios.put(`/api/products/${editData._id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Ad updated successfully");
      } else {
        await axios.post("/api/products", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Ad posted successfully");
      }

      navigate("/my-ads");
    } catch (error) {
      alert(error.response?.data?.message || "Error saving ad");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-ad-wrapper">
      <div className="post-ad">
        <h2>{editData ? "Edit Your Ad" : "Post Your Ad"}</h2>

        <div className="form-group">
          <label>Title *</label>
          <input
            name="title"
            placeholder="Product Name..."
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price (₹) *</label>
          <input
            name="price"
            type="number"
            placeholder="Price..."
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
             <option value="" disabled hidden>
               Select Category
             </option>
             <option value="Cars">Cars</option>
             <option value="Motorcycles">Motorcycles</option>
             <option value="Mobile Phones">Mobile Phones</option>
             <option value="For Sale: Houses & Apartments">
               For Sale: Houses & Apartments
             </option>
             <option value="Commercial Vehicles">Commercial Vehicles</option>
             <option value="For Rent: Houses & Apartments">
              For Rent: Houses & Apartments
             </option>
            </select>
        </div>

        <div className="form-group">
          <label>Location *</label>
          <input
            name="location"
            placeholder="Place..."
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe your item..."
            value={formData.description}
            onChange={handleChange}
            rows="5"
          />
        </div>

        <div className="form-group">
          <label>Image {!editData && "*"}</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className="submit-btn"
        >
          {loading ? "Saving..." : editData ? "Update Ad" : "Post Ad"}
        </button>

        <button 
          onClick={() => navigate("/my-ads")} 
          className="cancel-btn"
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PostAd;
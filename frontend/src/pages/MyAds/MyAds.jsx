import { useEffect, useState } from "react";
import axios from "../../config/axios"; // ✅ Use configured axios
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./MyAds.css";

const MyAds = () => {
  const { user } = useAuth();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/products/my-ads"); // ✅ Simplified
        setAds(res.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
        alert("Error loading your ads");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAds();
    }
  }, [user]);

  const deleteAd = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;

    try {
      await axios.delete(`/api/products/${id}`); // ✅ Simplified
      setAds((prev) => prev.filter((ad) => ad._id !== id));
    } catch (error) {
      alert("Error deleting ad");
    }
  };

  if (loading) {
    return (
      <div className="my-ads-container">
        <p>Loading your ads...</p>
      </div>
    );
  }

  return(
    <div className="my-ads-wrapper">
      <div className="my-ads-container">
        <h2>My Ads</h2>

        {ads.length === 0 ? (
          <div className="empty-state">
            <p>You haven't posted any ads yet.</p>
            <button onClick={() => navigate("/post-ad")}>
              Post Your First Ad
            </button>
          </div>
        ) : (
          ads.map((ad) => (
            <div key={ad._id} className="ad-item">
              <img src={ad.image} alt={ad.title} />

              <div className="ad-info">
                <h3>{ad.title}</h3>
                <p className="price">₹ {ad.price?.toLocaleString("en-IN")}</p>
                <p className="category">{ad.category}</p>
                {ad.location && (
                  <p className="location">📍 {ad.location}</p>
                )}
              </div>

              <div className="ad-actions">
                <button
                  className="edit-btn"
                  onClick={() => navigate("/post-ad", { state: ad })}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteAd(ad._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAds;
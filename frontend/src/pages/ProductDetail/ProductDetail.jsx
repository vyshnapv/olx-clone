import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import "./ProductDetail.css";

const ProductDetail=()=>{
   const { id } = useParams();     
   const [product, setProduct] = useState(null);
   const [loading, setLoading] = useState(true);

    useEffect(() => {
      axios.
        get(`${API_BASE_URL}/api/products/${id}`)
        .then((res) => {
          setProduct(res.data);
          setLoading(false);
        })
         .catch(() => {
          console.error("Error fetching product:", err);
          setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="detail-container"><h2>Loading...</h2></div>;
    if (!product) return <div className="detail-container"><h2>Product not found</h2></div>;

    return(
         <div className="detail-wrapper">
            <div className="detail-container">
                <div className="detail-left">
                    <img src={product.image} alt={product.title} />
                </div>

                <div className="detail-right">
                    <div className="detail-info">
                        <h2>₹ {product.price?.toLocaleString()}</h2>
                        <h3>{product.title}</h3>
                        <p className="category">{product.category}</p>
                        <p className="location">📍 {product.location}</p>
                    </div>

                    <div className="detail-description">
                        <h4>Description</h4>
                        <p>{product.description || "No description provided"}</p>
                    </div>

                    <div className="seller-info">
                        <h4>Seller Information</h4>
                        <p>Contact seller for more details</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  ProductDetail;
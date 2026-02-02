import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ProductCard.css";

const ProductCard=({product})=>{
   const navigate=useNavigate();
   const [imageError, setImageError] = useState(false);

   return(
     <div
       className="product-card"
        onClick={() => navigate(`/product/${product._id}`, { state: product })}
     >
       <img
          src={imageError ? "https://via.placeholder.com/240x160?text=No+Image" : product.image}
          alt={product.title}
          onError={() => setImageError(true)}
       />
       <div className="card-body">
          <h3>₹ {product.price?.toLocaleString()}</h3>
          <p>{product.title}</p>
          <span>{product.location || "Location not specified"}</span>
       </div>
     </div>
   )
}

export default ProductCard;
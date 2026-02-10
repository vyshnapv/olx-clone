import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ProductCard.css";

const ProductCard=({product})=>{
   const navigate=useNavigate();
   const [imageError, setImageError] = useState(false);

   const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

   return(
       <div
         className="product-card"
         onClick={handleClick}
         style={{ cursor: 'pointer' }}
       >
       <img
         src={
           imageError || !product.image
             ? "https://via.placeholder.com/240x160?text=No+Image"
             : product.image
         }
         alt={product.title}
         onError={() => setImageError(true)}
         loading="lazy"
       />
       <div className="card-body">
         <h3 className="price">
           ₹ {product.price ? product.price.toLocaleString("en-IN") : "N/A"}
         </h3>

         <p className="title">{product.title}</p>

         <span className="location">
           {product.location || "Location not specified"}
         </span>
       </div>
     </div>
   )
}

export default ProductCard;
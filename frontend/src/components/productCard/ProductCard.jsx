import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard=({product})=>{
   const navigate=useNavigate();
   return(
     <div
       className="product-card"
        onClick={() => navigate(`/product/${product._id}`, { state: product })}
     >
       <img src={product.image} alt={product.title}/>
       <div className="card-body">
          <h3>₹ {product.price}</h3>
          <p>{product.title}</p>
          <span>{product.location}</span>
       </div>
     </div>
   )
}

export default ProductCard;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetail.css";

const ProductDetail=()=>{
   const { id } = useParams();     
   const [product, setProduct] = useState(null);
   const [loading, setLoading] = useState(true);

    useEffect(() => {
      axios
        .get(`http://localhost:5000/api/products/${id}`)
        .then((res) => {
          setProduct(res.data);
          setLoading(false);
        })
         .catch(() => {
           setLoading(false);
        });
    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (!product) return <h2>Product not found</h2>;

    return(
        <div className="detail-container">
            <img src={product.image} alt={product.title} />
            
            <div className="detail-info">
               <h2>₹ {product.price}</h2>
               <p>{product.title}</p>
               <span>{product.location}</span>
            </div>
        </div>
    )
}

export default  ProductDetail;
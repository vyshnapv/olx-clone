import React from "react";
import { useLocation } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail=()=>{
    const {state}=useLocation();

    if(!state){
        return <h2>Product not  found</h2>
    }
    return(
        <div className="detail-container">
            <img src={state.image} alt={state.title} />
            
            <div className="detail-info">
               <h2>₹ {state.price}</h2>
               <p>{state.title}</p>
               <span>{state.location}</span>
            </div>
        </div>
    )
}

export default  ProductDetail;
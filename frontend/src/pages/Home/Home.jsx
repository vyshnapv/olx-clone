import {useState,useEffect} from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { useSearchParams } from "react-router-dom";
import Categories from "../Categories/Categories";
import ProductCard from "../../components/productCard/ProductCard";
import "./Home.css"

const Home=()=>{
    const [products,setProducts]=useState([]);
    const [loading, setLoading] = useState(true); 
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

     useEffect(() => {
        axios
            .get(`${API_BASE_URL}/api/products`)
            .then((res) => {
                let filteredProducts = res.data;
                
                if (category) {
                    filteredProducts = res.data.filter(
                        (product) => product.category === category
                    );
                }
                
                setProducts(filteredProducts);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [category]);


    return(
        <>
          <Categories />
            <div className="home-container">
                <h2>
                    {category ? `${category}` : "Fresh recommendations"}
                </h2>
                {loading && <p>Loading ads...</p>}
                {!loading && products.length === 0 && (
                    <p>No products found in this category.</p>
                )}
                {!loading && products.length > 0 && (
                    <div className="product-grid">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Home;
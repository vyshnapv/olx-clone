import {useState,useEffect} from "react";
import axios from "axios";
import Categories from "./Categories";
import ProductCard from "../../components/productCard/ProductCard";
import "./Home.css"

const Home=()=>{
    const [products,setProducts]=useState([]);
     const [loading, setLoading] = useState(true); 

     useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false); // 👈 AFTER DATA COMES
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // 👈 EVEN IF ERROR
      });
  }, []);


    return(
        <>
          <Categories/>
          <div className="home-container">
            <h2>Fresh recommendations</h2>
               {loading && <p>Loading ads...</p>}
            {!loading && (
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
import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { useSearchParams } from "react-router-dom";
import Categories from "../Categories/Categories";
import ProductCard from "../../components/productCard/ProductCard";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 9; // ✅ 3 rows × 3 columns

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  // ✅ Reset page when category/search changes
  useEffect(() => {
    setPage(1);
  }, [category, search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await axios.get("/api/products", {
          params: {
            category,
            search,
            page,
            limit,
          },
        });

        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search, page]);

  return (
    <div>
      <Categories />

      <div className="home-container">
        <h2>
          {search
            ? `Search results for "${search}"`
            : category
            ? category
            : "Fresh recommendations"}
        </h2>

        {loading && <p className="loading">Loading ads...</p>}

        {!loading && products.length === 0 && (
          <p className="no-products">No products found.</p>
        )}

        {!loading && products.length > 0 && (
          <>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Prev
              </button>

              <span>Page {page}</span>

              <button
                disabled={products.length < limit}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

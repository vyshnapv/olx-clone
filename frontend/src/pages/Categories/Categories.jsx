import { useNavigate ,useSearchParams } from "react-router-dom";
import "./Categories.css";

const categories = [
  "Cars",
  "Motorcycles",
  "Mobile Phones",
  "For Sale: Houses & Apartments",
  "Scooters",
  "Commercial Vehicles",
  "For Rent: Houses & Apartments"
];

const Categories = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const activeCategory = searchParams.get("category");

    const handleCategoryClick = (category) => {
        navigate(`/?category=${encodeURIComponent(category)}`);
    };

    const handleAllCategories = () => {
    navigate("/");
  };

    return (
        <div className="categories">
            <span className={!activeCategory ? "active" : ""} onClick={handleAllCategories}>All Categories</span>
            {categories.map((cat, index) => (
                <span 
                  key={index} 
                  className={activeCategory === cat ? "active" : ""}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </span>
            ))}
        </div>
    );
};

export default Categories;
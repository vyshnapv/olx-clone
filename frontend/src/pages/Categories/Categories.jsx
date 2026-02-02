import { useNavigate } from "react-router-dom";
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

    const handleCategoryClick = (category) => {
        navigate(`/?category=${encodeURIComponent(category)}`);
    };

    return (
        <div className="categories">
            <span onClick={() => navigate("/")}>All Categories</span>
            {categories.map((cat, index) => (
                <span key={index} onClick={() => handleCategoryClick(cat)}>
                    {cat}
                </span>
            ))}
        </div>
    );
};

export default Categories;
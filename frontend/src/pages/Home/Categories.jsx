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

const Categories=()=>{
    return(
        <div className="categories">
          {categories.map((cat,index)=>(
            <span key={index}>{cat}</span>
          ))}
        </div>
    )
}

export default Categories;
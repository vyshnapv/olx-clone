import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import olxLogo from "../../assets/OLX_New_Logo.png";
import "./Header.css";

const Header=()=>{
    const {user,logout}=useAuth();
    const navigate=useNavigate()
    const [searchParams] = useSearchParams();

    const [searchText, setSearchText] = useState(
      searchParams.get("search") || ""
    );

    const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed");
      alert("Logout failed. Please try again.");
    }
  };

  const  handleSearch = () => {
        if (searchText.trim()) {
            navigate(`/?search=${encodeURIComponent(searchText.trim())}`);
        } else {
            navigate("/");
        }
    };

    return(
       <header className="olx-header">
          <div className="header-left">
            <img 
              src={olxLogo}
              alt="OLX" 
              className="olx-logo"
              onClick={()=>navigate("/")}
              style={{ cursor: 'pointer' }}
            />

            <div className="location-box">
               <span> 📍 </span>
               <input placeholder="India" readOnly/>
            </div>
          </div>

          <div className="header-center">
           <input
             placeholder="Find Cars, Mobile Phones and more..."
             value={searchText}
             onChange={(e) => setSearchText(e.target.value)}
             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
           />
           <button onClick={handleSearch}>🔍</button>
          </div>

          <div className="header-right">
             {user ? (
                <>
                  <span className="username">
                    {user.name || user.email}
                  </span>
                  <span className="my-ads-link" onClick={() => navigate("/my-ads")}>
                    My Ads
                  </span>
                  <span className="logout" onClick={handleLogout}>Logout</span>
                </>
             ):(
                <span
                  className="login-text"
                  onClick={()=>navigate("/login")}
                >
                   Login 
                </span>
             )
             }

             <button
              className="sell-btn"
              onClick={()=>navigate("/post-ad")}
             >
              <span>+</span>SELL
             </button>
          </div>
       </header>
    )
}

export default Header;
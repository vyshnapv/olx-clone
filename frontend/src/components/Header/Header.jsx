import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";
import olxLogo from "../../assets/OLX_New_Logo.png"
import "./Header.css"

const Header=()=>{
    const {user,logout}=useAuth();
    const navigate=useNavigate()

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return(
       <header className="olx-header">
          <div className="header-left">
            <img 
              src={olxLogo}
              alt="OLX" 
              className="olx-logo"
              onClick={()=>navigate("/")}
            />

            <div className="location-box">
               <span> 📍 </span>
               <input placeholder="India" />
            </div>
          </div>

          <div className="header-center">
             <input placeholder="Find Cars, Mobile Phones and more..." />
             <button>🔍</button>
          </div>

          <div className="header-right">
             {user ? (
                <>
                  <span className="username">
                    {user.displayName || user.email}
                  </span>
                  <span className="logout" onClick={logout}>Logout</span>
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
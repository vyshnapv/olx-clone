import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "./Header.css"

const Header=()=>{
    const {user,logout}=useAuth();
    const navigate=useNavigate()

    return(
       <header className="olx-header">
          <div className="header-left">
            <img 
              src="https://statics.olx.in/external/base/img/olxLogo/olx-logo.png" 
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
                  <span onClick={()=>navigate("/my-ads")}>
                    {user.email}
                  </span>
                  <span onClick={logout}>Logout</span>
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
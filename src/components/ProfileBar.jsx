import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/authProvider";

function ProfileBar() {
  const { auth, setAuth, cartQty, setTrigger } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:8080/user/logout", { method: "POST" });
    setAuth("");
    setTrigger(false);
    document.cookie = "accessToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "refreshToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    navigate("/");
  };

  return (
    <div className="login_container">
      <div className="login_cart_container">
        <div className="cart_info">
          {auth.username && cartQty > 0 && (
            <Link to="/cart">
              <h4>
                <FontAwesomeIcon icon={faCartShopping} />
                {cartQty} {cartQty === 1 ? "item" : "items"}
              </h4>
            </Link>
          )}
        </div>
        <div className="login_info">
          {auth.username && <h4>{auth?.username}</h4>}
          {auth.username && <button onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </div>
  );
}

export default ProfileBar;

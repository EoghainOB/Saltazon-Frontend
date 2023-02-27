import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authProvider";

function ProfileBar() {
  const { auth, setAuth, cartQty } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:8080/user/logout", { method: "POST" });
    setAuth("");
    navigate("/");
  };

  return (
    <div className="login_container">
      <div className="login_info">
        {auth.username && <h4>Cart {cartQty}</h4>}
        {auth.username && <h4>Logged in as {auth?.username}</h4>}
        {auth.username && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
}

export default ProfileBar;

import { useContext } from "react";
import AuthContext from "../context/authProvider";

function ProfileBar() {
  const { auth } = useContext(AuthContext);
  return (
    <div className="login_container">
      <div className="login_info">
        {auth.username && <h4>Logged in as {auth?.username}</h4>}
      </div>
    </div>
  );
}

export default ProfileBar;

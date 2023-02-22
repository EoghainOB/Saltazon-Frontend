import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authProvider";

function NavBar() {
  const { auth } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul>
        {!auth.username && (
          <li>
            <Link to={"/login"} className={"nav_button"}>
              Login
            </Link>
          </li>
        )}
        {!auth.username && (
          <li>
            <Link to={"/create-new-user"} className={"nav_button"}>
              Create new user
            </Link>
          </li>
        )}
        {auth.username && (
          <li>
            <Link to={"/"} className={"nav_button"}>
              All Products
            </Link>
          </li>
        )}
        {auth.username && (
          <li>
            <Link to={"/cart"} className={"nav_button"}>
              Go to cart
            </Link>
          </li>
        )}
        {auth.role === "super-admin" ||
          (auth.role === "admin" && (
            <li>
              <Link to={"/admin"} className={"nav_button"}>
                Go to admin
              </Link>
            </li>
          ))}
        {auth.role === "super-admin" && (
          <li>
            <Link to={"/admin/super"} className={"nav_button"}>
              Go to SuperAdmin
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;

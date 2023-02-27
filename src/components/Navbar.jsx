import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authProvider";

function NavBar() {
  const { auth, setSearchTerm, setFilter } = useContext(AuthContext);

  const clearFilter = (e) => {
    setSearchTerm("");
    setFilter("");
  };

  return (
    <nav className="navbar">
      <ul>
        {!auth.username && (
          <li>
            <Link to="/login" className="nav_button">
              Login
            </Link>
          </li>
        )}
        {!auth.username && (
          <li>
            <Link to="/create-new-user" className="nav_button">
              Create new user
            </Link>
          </li>
        )}
        {auth.username && (
          <li>
            <Link to="/" className="nav_button" onClick={clearFilter}>
              All Products
            </Link>
          </li>
        )}
        {auth.username && (
          <li>
            <Link to="/cart" className="nav_button">
              Go to cart
            </Link>
          </li>
        )}
        {auth.role === "admin" && (
          <li>
            <Link to="/admin" className="nav_button">
              Admin
            </Link>
          </li>
        )}
        {auth.role === "super-admin" && (
          <li>
            <Link to="/admin/super" className="nav_button">
              SuperAdmin
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;

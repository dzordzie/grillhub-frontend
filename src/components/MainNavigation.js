import { Link, NavLink, useNavigate } from "react-router-dom";
import "./MainNavigation.css";

function MainNavigation() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  function logOut() {
    localStorage.clear();
    navigate("/", { replace: true });
  }

  if (token === null) {
    return (
      <nav className="main-nav">
        <NavLink to="/login">LogIn</NavLink>
      </nav>
    );
  }

  if (role === "USER") {
    return (
      <nav className="main-nav">
        <NavLink to="/profile">Profile</NavLink>
        <Link to="/" onClick={logOut}>
          ✕
        </Link>
      </nav>
    );
  }
}
export default MainNavigation;

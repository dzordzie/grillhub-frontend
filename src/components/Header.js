import { Link } from "react-router-dom";
import "./Header.css";
import SearchBar from "./SearchBar";
import MainNavigation from "./MainNavigation";
import logo from "../assets/logo2.png";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="home" />
      </Link>
      <SearchBar />
      <MainNavigation />
    </header>
  );
}
export default Header;

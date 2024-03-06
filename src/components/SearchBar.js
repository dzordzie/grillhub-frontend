import magnify from "../assets/magnify.svg";

function SearchBar() {
  return (
    <form action="" className="search-form">
      <button className="search-button" type="submit">
        <img src={magnify} alt="search" />
      </button>
      <input type="text" name="search-bar" className="search-input" />
    </form>
  );
}
export default SearchBar;
